// server/routes/reelRoutes.js
const express = require("express");
const router = express.Router();
const Reel = require("../models/Reel");

// ✅ If Node < 18 keep this. If Node 18+, you can remove node-fetch and use global fetch.
const fetch = require("node-fetch");
const cheerio = require("cheerio");

/** ---------------------------
 * Helpers
 * -------------------------- */

const normalizeUrl = (input = "") => {
  const s = String(input || "").trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("www.")) return `https://${s}`;
  return s;
};

// supports /reel/ /reels/ /p/ /tv/ and extracts code
const parseInstagram = (url = "") => {
  const s = String(url || "");
  const m = s.match(/\/(reel|reels|p|tv)\/([^\/?#&]+)/i);
  if (!m) return null;

  const rawType = m[1].toLowerCase();
  const type = rawType === "reels" ? "reel" : rawType;
  return { type, code: m[2] };
};

const buildEmbedUrl = (url = "") => {
  const parsed = parseInstagram(url);
  if (!parsed) return "";
  return `https://www.instagram.com/${parsed.type}/${parsed.code}/embed/?hidecaption=1`;
};

const extractFromHtml = (html) => {
  const $ = cheerio.load(html);
  const ogImg = $('meta[property="og:image"]').attr("content");
  const twImg = $('meta[name="twitter:image"]').attr("content");
  const canonical = $('link[rel="canonical"]').attr("href");
  return {
    thumbnailUrl: ogImg || twImg || "",
    canonicalUrl: canonical || "",
  };
};

// resolve share links -> canonical + thumbnail
async function resolveInstagramMeta(inputUrl) {
  const target = normalizeUrl(inputUrl);
  if (!target) throw new Error("Invalid url");

  const r = await fetch(target, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!r.ok) throw new Error(`Instagram fetch failed (${r.status})`);

  const html = await r.text();
  const meta = extractFromHtml(html);

  const finalUrl = meta.canonicalUrl || r.url || target;

  return {
    canonicalUrl: finalUrl,
    embedUrl: buildEmbedUrl(finalUrl),
    thumbnailUrl: meta.thumbnailUrl || "",
  };
}

/** ---------------------------
 * Routes
 * -------------------------- */

// ✅ Get 4 featured reels (public)
router.get("/", async (req, res) => {
  try {
    const reels = await Reel.find({ featured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(4);

    res.json({ success: true, data: reels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Admin get all
router.get("/admin/all", async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Create reel (admin pastes ONLY reelUrl)
router.post("/", async (req, res) => {
  try {
    const { reelUrl, title, username, featured, isActive, embedUrl: manualEmbedUrl } = req.body;

    if (!reelUrl || !title || !username) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: reelUrl, title, username",
      });
    }

    let canonicalUrl = normalizeUrl(reelUrl);
    let embedUrl = manualEmbedUrl || buildEmbedUrl(canonicalUrl);
    let thumbnailUrl = "";

    // try to resolve canonical + thumbnail (works if IG allows)
    try {
      const meta = await resolveInstagramMeta(reelUrl);
      canonicalUrl = meta.canonicalUrl || canonicalUrl;
      embedUrl = meta.embedUrl || embedUrl;
      thumbnailUrl = meta.thumbnailUrl || "";
    } catch (e) {
      // resolve might fail, still store reel url + embed
    }

    const reel = new Reel({
      reelUrl: canonicalUrl,
      embedUrl,
      thumbnailUrl, // optional
      title,
      username,
      featured: featured !== undefined ? featured : true,
      isActive: isActive !== undefined ? isActive : true,
    });

    await reel.save();
    res.status(201).json({ success: true, data: reel, message: "Reel created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Update reel
router.put("/:id", async (req, res) => {
  try {
    const { reelUrl, title, username, featured, isActive, thumbnailUrl, embedUrl: manualEmbedUrl } = req.body;

    const existing = await Reel.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Reel not found" });

    let nextReelUrl = existing.reelUrl;
    let nextEmbedUrl = manualEmbedUrl || existing.embedUrl;
    let nextThumb = existing.thumbnailUrl;

    if (reelUrl && normalizeUrl(reelUrl) !== normalizeUrl(existing.reelUrl)) {
      const base = normalizeUrl(reelUrl);
      nextReelUrl = base;
      nextEmbedUrl = buildEmbedUrl(base);

      try {
        const meta = await resolveInstagramMeta(reelUrl);
        nextReelUrl = meta.canonicalUrl || nextReelUrl;
        nextEmbedUrl = meta.embedUrl || nextEmbedUrl;
        nextThumb = meta.thumbnailUrl || nextThumb;
      } catch (e) { }
    }

    if (typeof thumbnailUrl === "string") nextThumb = thumbnailUrl;

    const updated = await Reel.findByIdAndUpdate(
      req.params.id,
      {
        reelUrl: nextReelUrl,
        embedUrl: nextEmbedUrl,
        thumbnailUrl: nextThumb,
        title: title !== undefined ? title : existing.title,
        username: username !== undefined ? username : existing.username,
        featured: featured !== undefined ? featured : existing.featured,
        isActive: isActive !== undefined ? isActive : existing.isActive,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    res.json({ success: true, data: updated, message: "Reel updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Delete
router.delete("/:id", async (req, res) => {
  try {
    const reel = await Reel.findByIdAndDelete(req.params.id);
    if (!reel) return res.status(404).json({ success: false, message: "Reel not found" });
    res.json({ success: true, data: reel, message: "Reel deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

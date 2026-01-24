import React, { useMemo, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
  FiExternalLink,
} from "react-icons/fi";

/**
 * InstagramEmbedGrid
 * - Pass Instagram Reel/Post links
 * - Shows PLAYABLE preview using Instagram official embed
 * - Supports /reel/ and /p/ links
 */

/** Remove tracking params, fix duplicated pasted URLs, ensure trailing slash */
function cleanIgUrl(url = "") {
  const u = (url || "").trim();
  const noQuery = u.split("?")[0];

  // If someone pasted the url twice in one string, keep only first part
  const first = noQuery.indexOf("https://www.instagram.com/");
  if (first !== -1) {
    const second = noQuery.indexOf("https://www.instagram.com/", first + 1);
    if (second !== -1) return ensureSlash(noQuery.slice(0, second));
  }

  return ensureSlash(noQuery);
}

function ensureSlash(url) {
  if (!url) return "";
  return url.endsWith("/") ? url : `${url}/`;
}

function getIgTypeAndId(url = "") {
  const clean = cleanIgUrl(url);

  const reelMatch =
    clean.match(/instagram\.com\/reel\/([^/]+)/i) ||
    clean.match(/instagram\.com\/reels\/([^/]+)/i);
  if (reelMatch) return { type: "reel", id: reelMatch[1], clean };

  const postMatch = clean.match(/instagram\.com\/p\/([^/]+)/i);
  if (postMatch) return { type: "post", id: postMatch[1], clean };

  return { type: "unknown", id: null, clean };
}

function embedUrl(type, id) {
  if (!id) return "";
  return type === "reel"
    ? `https://www.instagram.com/reel/${id}/embed`
    : `https://www.instagram.com/p/${id}/embed`;
}

function InstagramEmbedCard({ item, brandColor = "#D9F70D" }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d] shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-2">
      {/* Hover glow */}
      {/* <div
        className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(closest-side, ${brandColor}35, transparent 60%)`,
        }}
      /> */}

      {/* Header */}
     

      {/* ✅ Playable Preview via Instagram Embed */}
      <div className="relative">
        <div className="relative w-full overflow-hidden bg-black">
          <div className={item.type === "reel" ? "aspect-[9/16]" : "aspect-square"}>
            {item.embed ? (
              <iframe
                title={`Instagram ${item.type} ${item.id}`}
                src={item.embed}
                className="h-full w-full"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white/60">
                Invalid Instagram link
              </div>
            )}
          </div>

          {/* badge */}
          {/* <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            {item.type === "reel" ? "Reels" : item.type === "post" ? "Post" : "Link"}
          </div> */}

          {/* View link */}
          {/* <a
            href={item.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition hover:bg-black/70"
          >
            <FiExternalLink />
            View
          </a> */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      {/* Actions */}
      <div className="relative flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked((v) => !v)}
            className="transition-transform hover:scale-110"
            aria-label="Like"
          >
            <FiHeart
              size={22}
              className={liked ? "text-red-500" : "text-white/85 hover:text-white"}
            />
          </button>

          <button
            className="transition-transform hover:scale-110 text-white/85 hover:text-white"
            aria-label="Comment"
          >
            <FiMessageCircle size={22} />
          </button>

          <button
            className="transition-transform hover:scale-110 text-white/85 hover:text-white"
            aria-label="Share"
          >
            <FiSend size={21} />
          </button>
        </div>

        <button
          className="transition-transform hover:scale-110 text-white/85 hover:text-white"
          aria-label="Save"
        >
          <FiBookmark size={21} />
        </button>
      </div>

      {/* Meta */}
      {/* Tags */}
<div className="relative px-4 pb-5">
  {item.tags?.length ? (
    <div className="flex flex-wrap gap-2">
      {item.tags.slice(0, 6).map((tag, idx) => (
        <a
          key={idx}
          href={`https://www.instagram.com/explore/tags/${tag.replace("#", "")}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          {tag.startsWith("#") ? tag : `#${tag}`}
        </a>
      ))}
    </div>
  ) : (
    <p className="text-xs text-white/45"  style={{ color: brandColor }}>#instagram #reels #socialmedia</p>
  )}

  {/* Small CTA */}
  {/* <div className="mt-3 flex items-center justify-between">
    <span className="text-xs text-white/45">
      {item.type === "reel" ? "Reel preview" : "Post preview"}
    </span>

    <a
      href={item.postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-semibold"
      style={{ color: brandColor }}
    >
      View on Instagram
    </a>
  </div> */}
</div>


      {/* bottom brand line */}
      {/* <div
        className="h-[2px] w-full opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`,
        }}
      /> */}
    </article>
  );
}

export default function InstagramEmbedGrid({
  title = "Instagram",
  links = [],
  brandColor = "#D9F70D",
  username = "Digtel",
  followUrl = "https://www.instagram.com/digtel.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  avatar = "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=120&q=80",
  timeLabel = "Recent",
  location = "Dubai, UAE",
}) {
  const items = useMemo(() => {
    return (links || []).slice(0, 4).map((raw) => {
      const { type, id, clean } = getIgTypeAndId(raw);
      return {
        username,
        time: timeLabel,
        location,
        avatar,
        postUrl: clean,
        type,
        id,
        embed: embedUrl(type, id),
      };
    });
  }, [links, username, timeLabel, location, avatar]);

  if (!links?.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-black py-16">
      {/* subtle background brand glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: brandColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-44 right-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: brandColor }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-white/55">
             Discover how we help brands stand out and grow through creative, results-driven social media marketing across the UAE.
            </p>
          </div>

          <a
            href={followUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
            style={{ backgroundColor: brandColor }}
          >
            Follow Us <FiExternalLink />
          </a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <InstagramEmbedCard key={it.postUrl} item={it} brandColor={brandColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

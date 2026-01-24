import React, { useMemo, useRef, useCallback } from "react";

/**
 * ColorBrushText
 * - Splits text into characters
 * - On pointer move, the character under cursor (and optional neighbors) get painted
 * - On mouse leave, resets back to baseColor
 *
 * FIX:
 * - Prevent mid-word line breaks by wrapping each word in nowrap spans.
 * - Keeps the SAME animation/painting behavior.
 */
export default function ColorBrushText({
  text,
  palette = ["#37C6D9", "#007399", "#016389", "#0B2C73"],
  baseColor = "rgba(255,255,255,0.75)",
  className = "",
  neighbor = 1, // 0 = only hovered char, 1 = +/-1 neighbors, etc.
}) {
  const spansRef = useRef([]);

  // Keep a flat char array so your pointer + neighbor logic stays identical
  const chars = useMemo(() => Array.from(text || ""), [text]);

  // NEW: tokens (words + spaces) to render without mid-word breaks
  const tokens = useMemo(() => (text || "").split(/(\s+)/), [text]);

  // NEW: map tokenIndex -> starting char index in the flat chars array
  const tokenStart = useMemo(() => {
    let cursor = 0;
    const map = new Map();
    tokens.forEach((tok, tokenIdx) => {
      map.set(tokenIdx, cursor);
      cursor += tok.length; // spaces included, matches chars[] indexing
    });
    return map;
  }, [tokens]);

  const paintIndex = useCallback(
    (i) => {
      const el = spansRef.current[i];
      if (!el) return;

      // paint
      const c = palette[i % palette.length];
      el.style.color = c;
      el.style.transition = "color 220ms cubic-bezier(.22,1,.36,1)";

      // mark as painted (so we can reset easily)
      el.dataset.painted = "1";
    },
    [palette]
  );

  const onPointerMove = useCallback(
    (e) => {
      const target = e.target?.closest?.("[data-char-idx]");
      if (!target) return;

      const idx = Number(target.getAttribute("data-char-idx"));
      if (Number.isNaN(idx)) return;

      // paint hovered + neighbors for a nicer “brush” feel
      for (let k = -neighbor; k <= neighbor; k++) {
        const j = idx + k;
        if (j >= 0 && j < chars.length) paintIndex(j);
      }
    },
    [chars.length, neighbor, paintIndex]
  );

  const resetAll = useCallback(() => {
    for (let i = 0; i < spansRef.current.length; i++) {
      const el = spansRef.current[i];
      if (!el) continue;
      if (el.dataset.painted === "1") {
        el.style.color = baseColor;
        el.dataset.painted = "0";
      }
    }
  }, [baseColor]);

  return (
    <span
      className={className}
      onPointerMove={onPointerMove}
      onMouseLeave={resetAll}
      onTouchEnd={resetAll}
      style={{
        color: baseColor,
        // optional safety – doesn’t change animation
        wordBreak: "normal",
        overflowWrap: "normal",
        whiteSpace: "normal",
      }}
    >
      {tokens.map((tok, tokenIdx) => {
        const startIdx = tokenStart.get(tokenIdx) ?? 0;

        // Render spaces as normal text so wrapping happens only at spaces
        if (/^\s+$/.test(tok)) {
          // Keep spaces from collapsing
          return (
            <span key={`s-${tokenIdx}`}>
              {tok.replace(/ /g, "\u00A0")}
            </span>
          );
        }

        // Wrap each WORD so it never breaks mid-word
        return (
          <span
            key={`w-${tokenIdx}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {Array.from(tok).map((ch, i) => {
              const globalIdx = startIdx + i;

              return (
                <span
                  key={globalIdx}
                  data-char-idx={globalIdx}
                  ref={(el) => (spansRef.current[globalIdx] = el)}
                  style={{
                    display: "inline-block",
                    willChange: "color",
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

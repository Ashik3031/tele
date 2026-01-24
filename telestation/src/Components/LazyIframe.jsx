import { useEffect, useRef, useState } from "react";

function LazyIframe({ src, className, style, ...rest }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "250px" } // start loading before it appears
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {ready ? (
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full pointer-events-none"
          frameBorder="0"
          scrolling="no"
          allow="encrypted-media; clipboard-write"
          allowFullScreen
          loading="lazy"
          {...rest}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
    </div>
  );
}

export default LazyIframe;
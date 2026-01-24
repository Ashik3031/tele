import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = { label: string; to: string };
const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
   { label: "Our Story", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Careers", to: "/career" },
  { label: "Contact US", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // Absolute & transparent so it overlays your hero
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent mt-6">
      <div className="relative w-full">
        <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center ">
            <div className="relative w-[180px] sm:w-[220px] md:w-[260px]">
              <img
                src="/logo.png"   // use a white/light logo for dark hero
                alt="Pulse Management"
                className="
      w-[clamp(140px,22vw,260px)]
      h-auto
      object-contain
      select-none
    "
    draggable={false}
              />
            </div>
          </Link>

          {/* Hamburger (transparent button) */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Open menu"
            className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-transparent   hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col items-center gap-[5px] sm:gap-[6px] md:gap-[7px]">
              <span className="block rounded bg-[#6EF1F7] h-[3px] sm:h-[4px] w-6 sm:w-7 md:w-8" />
              <span className="block rounded bg-[#6EF1F7] h-[3px] sm:h-[4px] w-6 sm:w-7 md:w-8" />
              <span className="block rounded bg-[#6EF1F7] h-[3px] sm:h-[4px] w-6 sm:w-7 md:w-8" />
            </div>
          </button>
        </div>
      </div>

      {/* Dim overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating glass panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-modal="true"
            initial={{ x: 40, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={panelRef}
            className="fixed right-6 top-8 z-50 w-[86vw] max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/80 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
            <div className="flex justify-center">
              <img src="/logo.png" alt="Pulse" className="w-[clamp(120px,40vw,180px)] h-auto object-contain"  draggable={false}/>
            </div>

            <nav className="mt-4 space-y-3">
              {NAV_ITEMS.map(item => {
                const active = pathname === item.to;
                return (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block">
                    <div className="relative">
                      {active && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-[28px] bg-white/50"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <div
                        className={
                          "relative z-10 flex items-center justify-center rounded-[28px] px-6 py-3 text-2xl font-medium " +
                          (active ? "text-white" : "text-zinc-100/90 hover:text-white")
                        }
                      >
                        {item.label}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex items-center justify-center gap-4">
              <IconWrap label="Instagram" href="https://www.instagram.com/tsplcorp?igsh=MWs2cXFwaHV0cWVydg==">
                <InstagramIcon />
              </IconWrap>
              {/* <IconWrap label="WhatsApp" href="#">
                <WhatsAppIcon />
              </IconWrap> */}
              <IconWrap label="Email" href="mailto:hr@tspl-corp.com">
                <MailIcon />
              </IconWrap>
              <IconWrap label="Facebook" href="https://www.linkedin.com/company/tspl-corp/">
               <LinkedInIcon/>
              </IconWrap>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconWrap({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) {
  const isExternal =
    href.startsWith("http") || href.startsWith("https") || href.startsWith("mailto:");

  return (
    <a
      aria-label={label}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm ring-1 ring-inset ring-white/5 transition hover:bg-white/10"
    >
      {children}
    </a>
  );
}


function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.75" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white">
      <path d="M20.5 11.5a8.5 8.5 0 1 1-15.69 4.27L3 21l5.41-1.76A8.5 8.5 0 1 1 20.5 11.5z" />
      <path d="M8.5 9.5c.5 2 2.5 4 4.5 4.5M13 14c1 .5 2 0 2.5-.5.5-.5.5-1 0-1.5l-1-1" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 17v-6M7 8v.01M12 17v-4.5a2 2 0 1 1 4 0V17" />
    </svg>
  );
}

function FacebookIcon () {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-white"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4H14V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  )
}

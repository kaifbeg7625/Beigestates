"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  {
    href: "/listings",
    label: "Listings",
    submenu: [
      { href: "/listings?type=Flat", label: "Flats" },
      { href: "/listings?type=Villa", label: "Villas" },
      { href: "/listings?type=Plot", label: "Plots" },
      { href: "/listings?type=Rent", label: "For Rent" },
      { href: "/listings?type=Interior", label: "Interiors" },
    ],
  },
  {
    href: "/about",
    label: "About",
    submenu: [
      { href: "/about#process", label: "How It Works" },
      { href: "/about#services", label: "Our Services" },
      { href: "/about#trust", label: "Trust & Verification" },
      { href: "/about#faq", label: "FAQ" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blueprint py-3 relative z-50">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Beig Estates"
            width={160}
            height={142}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-7 text-[13px] font-mono tracking-wide">
          {links.map((l) => (
            <div key={l.href} className="relative group">
              <Link href={l.href} className="text-paper/75 hover:text-brass-bright py-2 flex items-center gap-1">
                {l.label}
                {l.submenu && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>

              {l.submenu && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
                  <div className="bg-paper rounded shadow-xl border border-ink/10 py-2 min-w-[180px]">
                    {l.submenu.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2.5 text-ink text-[13px] font-mono hover:bg-brass/10 hover:text-brass transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="sm:hidden text-paper p-1"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-blueprint border-t border-white/10 px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          {links.map((l) => (
            <div key={l.href} className="mb-1">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-paper/85 font-mono text-sm tracking-wide"
              >
                {l.label}
              </Link>
              {l.submenu && (
                <div className="pl-4 border-l border-white/10 ml-1 flex flex-col">
                  {l.submenu.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="py-1.5 text-paper/60 font-mono text-[13px]"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

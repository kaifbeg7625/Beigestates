"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#listings", label: "Listings" },
  { href: "/#trust", label: "Verification" },
  { href: "/#contact", label: "Contact" },
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
            <a key={l.href} href={l.href} className="text-paper/75 hover:text-brass-bright">
              {l.label}
            </a>
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
        <div className="sm:hidden absolute top-full left-0 right-0 bg-blueprint border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-paper/85 font-mono text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

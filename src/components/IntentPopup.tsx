"use client";

import { useState, useEffect } from "react";

const options = [
  { label: "I want to Buy", service: "Buy Property", emoji: "🏠" },
  { label: "I want to Sell", service: "Sell Property", emoji: "🔑" },
  { label: "I want to Rent", service: "Rent Property (Looking to Rent)", emoji: "📋" },
  { label: "I want to List for Rent", service: "List Property for Rent", emoji: "🏢" },
];

export default function IntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Uses sessionStorage only (browser memory, cleared when the tab closes).
    // Nothing is sent to a server and no tracking cookie is set, so no
    // cookie-consent banner is required for this.
    const alreadyShown = sessionStorage.getItem("beig_intent_shown");
    if (!alreadyShown) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("beig_intent_shown", "true");
    setVisible(false);
  }

  function choose(service: string) {
    sessionStorage.setItem("beig_intent_shown", "true");
    sessionStorage.setItem("beig_intent_service", service);
    setVisible(false);
    // Scroll to the enquiry form after a brief delay so it's visible
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-[2px] px-4 pb-4 sm:pb-4"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-paper rounded-lg border border-ink/10 shadow-2xl p-6 relative animate-[fadeIn_0.2s_ease-out]"
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <p className="font-mono text-[11px] uppercase tracking-wide text-brass mb-2">
          Quick question
        </p>
        <h3 className="font-serif font-semibold text-xl mb-5">
          What brings you here today?
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.service}
              onClick={() => choose(opt.service)}
              className="text-left p-4 rounded border border-ink/15 hover:border-brass hover:bg-brass/5 transition-colors"
            >
              <div className="text-xl mb-1.5">{opt.emoji}</div>
              <div className="text-sm font-medium">{opt.label}</div>
            </button>
          ))}
        </div>

        <button
          onClick={dismiss}
          className="w-full mt-4 text-xs text-ink-soft font-mono uppercase tracking-wide py-2"
        >
          Just browsing, skip this
        </button>
      </div>
    </div>
  );
}

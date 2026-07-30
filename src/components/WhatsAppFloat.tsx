"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "917497937625";
const MESSAGE = encodeURIComponent(
  "Hi, I'm looking for help with a property requirement through Beig Estates. Can we discuss?"
);

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.39 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.61-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.38c.26-.29.56-.36.75-.36.19 0 .38 0 .54.01.17.01.41-.06.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z"/>
      </svg>
    </a>
  );
}

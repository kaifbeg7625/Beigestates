import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blueprint-deep py-8 text-center mt-auto">
      <p className="font-mono text-[11px] tracking-wide text-paper/40 mb-3">
        BEIG ESTATES · LUCKNOW · REAL ESTATE &amp; PROPERTY ADVISORY
      </p>
      <div className="flex items-center justify-center gap-4 font-mono text-[11px] text-paper/40">
        <Link href="/privacy-policy" className="hover:text-paper/70">
          Privacy Policy
        </Link>
        <span>·</span>
        <Link href="/terms" className="hover:text-paper/70">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[85vh] flex items-end overflow-hidden">
      <Image
        src="/hero.webp"
        alt="Modern residential towers and tree-lined road in Lucknow"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blueprint-deep via-blueprint-deep/55 to-blueprint-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-blueprint-deep/95 via-blueprint-deep/45 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-28 pb-16 w-full">
        <div
          className="font-mono text-[11px] tracking-[0.24em] uppercase text-brass-bright flex items-center gap-2 mb-6 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="w-10 h-px bg-brass-bright" />
          Real Estate &amp; Property Advisory — Lucknow
        </div>

        <h1
          className="font-serif font-semibold text-[36px] sm:text-[56px] leading-[1.1] tracking-tight text-paper max-w-3xl mb-6 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Find a home,{" "}
          <em className="italic text-brass-bright">not just a listing.</em>
        </h1>

        <p
          className="text-[16px] sm:text-[19px] text-paper/75 max-w-xl leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Beig Estates helps you find the right property, negotiate the right
          price, and close without the runaround — flats, plots, and
          everything in between.
        </p>

        <div
          className="flex gap-4 flex-wrap animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[13px] tracking-wide uppercase rounded bg-brass text-blueprint-deep font-medium hover:bg-brass-bright hover:shadow-[0_0_30px_rgba(226,168,92,0.4)] transition-all"
          >
            Share Your Requirement →
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[13px] tracking-wide uppercase rounded border border-paper/30 text-paper hover:border-brass-bright hover:text-brass-bright transition-colors"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

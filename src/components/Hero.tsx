import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden">
      <Image
        src="/hero.webp"
        alt="Modern residential towers and tree-lined road in Lucknow"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blueprint-deep via-blueprint-deep/60 to-blueprint-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blueprint-deep/95 via-blueprint-deep/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 pb-20 pt-32 w-full">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brass-bright flex items-center gap-2 mb-6">
          <span className="w-8 h-px bg-brass-bright" />
          Real Estate &amp; Property Advisory — Lucknow
        </div>
        <h1 className="font-serif font-semibold text-[38px] sm:text-[56px] leading-[1.1] text-paper max-w-3xl mb-6">
          Buying, renting, or selling property?{" "}
          <em className="italic text-brass-bright">
            Do it with someone who&apos;s actually on your side.
          </em>
        </h1>
        <p className="text-[17px] sm:text-[19px] text-paper/75 max-w-xl leading-relaxed mb-10">
          Beig Estates helps you find the right property, negotiate the right
          price, and close without the runaround — flats, plots, and
          everything in between.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono text-[13px] tracking-wide uppercase rounded bg-brass text-blueprint-deep font-medium hover:bg-brass-bright transition-colors"
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

        <div className="flex gap-12 mt-16 pt-8 border-t border-dashed border-paper/20 flex-wrap">
          <Stat num="Flats" label="Residential" />
          <Stat num="Plots" label="Land & Sites" />
          <Stat num="Lucknow" label="Currently Serving" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-paper/50">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="w-px h-8 bg-paper/40" />
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl font-semibold text-brass-bright">{num}</div>
      <div className="font-mono text-[11px] uppercase tracking-wide text-paper/60 mt-1">
        {label}
      </div>
    </div>
  );
}

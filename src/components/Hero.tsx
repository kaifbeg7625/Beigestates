export default function Hero() {
  return (
    <section className="relative pt-24 pb-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.webp')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blueprint-deep via-blueprint/90 to-blueprint/60" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-brass-bright flex items-center gap-2 mb-5">
          <span className="w-5 h-px bg-brass-bright" />
          Real Estate &amp; Property Advisory — Lucknow
        </div>
        <h1 className="font-serif font-semibold text-[46px] leading-[1.15] text-paper max-w-2xl mb-5">
          Buying, renting, or selling property?{" "}
          <em className="italic text-brass-bright">
            Do it with someone who&apos;s actually on your side.
          </em>
        </h1>
        <p className="text-[17px] text-paper/70 max-w-xl leading-relaxed mb-9">
          Beig Estates helps you find the right property, negotiate the right
          price, and close without the runaround — flats, plots, and
          everything in between.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded bg-brass text-blueprint-deep font-medium hover:bg-brass-bright transition-colors"
          >
            Share Your Requirement →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded border border-paper/30 text-paper hover:border-brass-bright hover:text-brass-bright transition-colors"
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

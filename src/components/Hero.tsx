import Image from "next/image";

const quickLinks = [
  { label: "Flats", type: "Flat", icon: "🏢" },
  { label: "Villas", type: "Villa", icon: "🏡" },
  { label: "Plots", type: "Plot", icon: "📐" },
  { label: "Interiors", type: "Interior", icon: "🛋️" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden pb-24 sm:pb-0">
      <Image
        src="/hero.webp"
        alt="Modern residential towers and tree-lined road in Lucknow"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blueprint-deep via-blueprint-deep/55 to-blueprint-deep/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-blueprint-deep/95 via-blueprint-deep/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,29,43,0.5)_100%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-28 pb-16 w-full">
        <div
          className="font-mono text-[11px] tracking-[0.24em] uppercase text-brass-bright flex items-center gap-2 mb-7 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="w-10 h-px bg-brass-bright" />
          Real Estate &amp; Property Advisory — Lucknow
        </div>

        <h1
          className="font-serif font-semibold text-[40px] sm:text-[64px] leading-[1.06] tracking-tight text-paper max-w-3xl mb-7 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Find a home,{" "}
          <em className="italic text-brass-bright">not just a listing.</em>
        </h1>

        <p
          className="text-[17px] sm:text-[20px] text-paper/75 max-w-xl leading-relaxed mb-11 animate-fade-up"
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

      {/* Floating quick-explore card — overlaps the bottom edge of the hero */}
      <div
        className="absolute left-0 right-0 bottom-0 translate-y-1/2 sm:translate-y-1/2 z-20 px-6 animate-fade-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="max-w-5xl mx-auto bg-paper/95 backdrop-blur-md rounded-lg shadow-2xl border border-ink/5 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              What are you looking for?
            </p>
            <a
              href="/listings"
              className="font-mono text-[11px] uppercase tracking-wide text-brass hover:text-brass-bright"
            >
              View all listings →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((l) => (
              <a
                key={l.type}
                href={`/listings?type=${encodeURIComponent(l.type)}`}
                className="flex items-center gap-3 p-3.5 rounded border border-ink/10 bg-white hover:border-brass hover:shadow-md transition-all group"
              >
                <span className="text-xl">{l.icon}</span>
                <span className="text-sm font-semibold group-hover:text-brass transition-colors">
                  {l.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

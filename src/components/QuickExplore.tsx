const quickLinks = [
  { label: "Flats", type: "Flat", icon: "🏢" },
  { label: "Villas", type: "Villa", icon: "🏡" },
  { label: "Plots", type: "Plot", icon: "📐" },
  { label: "For Rent", type: "Rent", icon: "🔑" },
  { label: "Interiors", type: "Interior", icon: "🛋️" },
];

export default function QuickExplore() {
  return (
    <section className="bg-white py-8 border-b border-ink/8">
      <div className="max-w-5xl mx-auto px-6">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickLinks.map((l) => (
            <a
              key={l.type}
              href={`/listings?type=${encodeURIComponent(l.type)}`}
              className="flex items-center gap-3 p-3.5 rounded border border-ink/10 bg-paper hover:border-brass hover:shadow-md transition-all group"
            >
              <span className="text-xl">{l.icon}</span>
              <span className="text-sm font-semibold group-hover:text-brass transition-colors">
                {l.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

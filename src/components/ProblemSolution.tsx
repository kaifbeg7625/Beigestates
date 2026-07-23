export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>The Problem</SectionLabel>
        <h2 className="font-serif font-semibold text-3xl mb-4 max-w-xl">
          Most property searches waste your time before they waste your money.
        </h2>
        <p className="text-ink-soft max-w-xl leading-relaxed mb-12">
          Random agents, unresponsive dealers, and listings that are already
          sold — sound familiar? We keep one dedicated point of contact so
          every enquiry gets a real, prioritized response.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded p-7 border border-ink/10 border-l-4 border-l-[#B5533C]">
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-soft mb-4">
              Typical Property Search
            </h3>
            <ul className="space-y-2.5">
              {[
                "Enquiry goes to 5-10 agents at once",
                "No one takes ownership of your requirement",
                "Listings are outdated or already sold",
                "You spend hours chasing callbacks",
              ].map((item) => (
                <li key={item} className="text-sm pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-[#B5533C] font-bold">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded p-7 border border-ink/10 border-l-4 border-l-brass">
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-soft mb-4">
              Beig Estates
            </h3>
            <ul className="space-y-2.5">
              {[
                "One dedicated point of contact — no runaround",
                "Your requirement is prioritized, not lost in a queue",
                "Verified, current listings only",
                "Clear terms discussed upfront, nothing hidden",
              ].map((item) => (
                <li key={item} className="text-sm pl-5 relative leading-relaxed">
                  <span className="absolute left-0 text-brass font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-3 flex items-center gap-2">
      <span className="w-[18px] h-px bg-brass" />
      {children}
    </div>
  );
}

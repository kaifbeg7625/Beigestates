import { SectionLabel } from "./ProblemSolution";

const services = [
  {
    icon: "🏠",
    title: "Buying Assistance",
    desc: "From shortlisting to site visits to closing — we help you buy the right flat, villa, or plot with confidence.",
  },
  {
    icon: "🔑",
    title: "Selling & Listing",
    desc: "List your property with us and reach genuinely interested buyers, with support through negotiation and paperwork.",
  },
  {
    icon: "📋",
    title: "Rental Services",
    desc: "Whether you're looking to rent or list a property for rent, we match tenants and owners without the usual runaround.",
  },
  {
    icon: "🛋️",
    title: "Interior Coordination",
    desc: "Need interior work done on a new or existing property? We help connect and coordinate the right people for it.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-paper">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>Our Services</SectionLabel>
        <h2 className="font-serif font-semibold text-3xl mb-4 max-w-xl">
          What we help you with.
        </h2>
        <p className="text-ink-soft max-w-xl leading-relaxed mb-12">
          Whether you&apos;re buying, selling, renting, or getting a space
          fitted out — here&apos;s where we come in.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded p-6 border border-ink/10">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-[16px] font-semibold mb-2">{s.title}</h3>
              <p className="text-[13px] text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

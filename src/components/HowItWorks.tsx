import { SectionLabel } from "./ProblemSolution";

const steps = [
  {
    num: "01",
    title: "Share Requirement",
    desc: "Tell us what you're looking for — property, plot, or interior work, your city, and budget.",
  },
  {
    num: "02",
    title: "We Shortlist",
    desc: "We match you with the right listings and set up a visit or consultation.",
  },
  {
    num: "03",
    title: "We Get to Work",
    desc: "We handle negotiations, paperwork, and coordination end to end.",
  },
  {
    num: "04",
    title: "Deal Closes",
    desc: "You close on your terms — clear and straightforward throughout.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>Process</SectionLabel>
        <h2 className="font-serif font-semibold text-3xl mb-4 max-w-xl">
          From enquiry to closed deal — in four steps.
        </h2>
        <p className="text-ink-soft max-w-xl leading-relaxed mb-12">
          A clear, simple process from the moment you reach out to the day
          your deal closes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="bg-paper rounded p-6 border border-ink/10">
              <div className="font-serif text-2xl font-semibold text-brass mb-3.5">
                {s.num}
              </div>
              <h4 className="text-[15px] font-semibold mb-2">{s.title}</h4>
              <p className="text-[13px] text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

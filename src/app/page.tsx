import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickExplore from "@/components/QuickExplore";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntentPopup from "@/components/IntentPopup";
import Link from "next/link";

export const revalidate = 60;

const highlights = [
  {
    title: "One Dedicated Contact",
    desc: "You deal directly with us throughout — no handoffs between multiple agents.",
  },
  {
    title: "Verified Listings",
    desc: "Every property listed is genuine and currently available.",
  },
  {
    title: "Clear, Upfront Terms",
    desc: "No hidden charges, no runaround — just a straightforward process.",
  },
];

export default function Home() {
  return (
    <>
      <IntentPopup />
      <Navbar />
      <main id="main-content">
        <Hero />
        <QuickExplore />
        <Story />

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid sm:grid-cols-3 gap-8 mb-14">
              {highlights.map((h) => (
                <div key={h.title}>
                  <h3 className="text-[15px] font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-brass rounded-full inline-block shrink-0" />
                    {h.title}
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded bg-ink text-paper hover:bg-blueprint-deep transition-colors"
              >
                Browse Listings →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded border border-ink/25 hover:border-brass hover:text-brass transition-colors"
              >
                Share Your Requirement →
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}

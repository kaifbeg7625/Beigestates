import { SectionLabel } from "./ProblemSolution";
import EnquiryForm from "./EnquiryForm";

const WHATSAPP_NUMBER = "917497937625";
const WHATSAPP_NUMBER_2 = "919026785261";
const EMAIL = "kaifbegmirza7497@gmail.com";
const WA_MESSAGE = encodeURIComponent(
  "Hi, I'm looking for help with a property requirement through Beig Estates. Can we discuss?"
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-paper">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <SectionLabel>Get Started</SectionLabel>
        </div>
        <h2 className="font-serif font-semibold text-3xl mb-4">
          Ready to find the right property?
        </h2>
        <p className="text-ink-soft leading-relaxed mb-10">
          Share your requirement below, message us on WhatsApp, or call
          directly — whichever&apos;s easiest for you.
        </p>

        <div className="text-left bg-white rounded p-8 border border-ink/10 mb-8">
          <EnquiryForm />
        </div>

        <div className="flex gap-4 flex-wrap justify-center mb-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded bg-brass text-blueprint-deep font-medium hover:bg-brass-bright transition-colors"
          >
            Message Us on WhatsApp →
          </a>
          <a
            href={`mailto:${EMAIL}?subject=Property%20Requirement`}
            className="inline-flex items-center gap-2 px-7 py-4 font-mono text-[13px] tracking-wide uppercase rounded border border-ink/25 text-ink hover:border-brass hover:text-brass transition-colors"
          >
            Email Us →
          </a>
        </div>

        <p className="text-[13px] text-ink-soft font-mono">
          Or call directly:{" "}
          <a href="tel:+917497937625" className="text-ink font-semibold">
            +91 74979 37625
          </a>{" "}
          ·{" "}
          <a href="tel:+919026785261" className="text-ink font-semibold">
            +91 90267 85261
          </a>{" "}
          ·{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER_2}?text=${WA_MESSAGE}`}
            target="_blank"
            className="text-brass font-semibold"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}

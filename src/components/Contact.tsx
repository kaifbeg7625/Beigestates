import { SectionLabel } from "./ProblemSolution";
import EnquiryForm from "./EnquiryForm";
import { SITE, waLink } from "@/lib/site";
import { IconPhone, IconWhatsApp, IconMail, IconPin } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-paper">
      <div className="container-page">
        <div className="max-w-2xl mb-14">
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="font-extrabold text-3xl sm:text-4xl leading-tight mb-5">
            Tell us what you&apos;re looking for.
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Fill in the form and we&apos;ll come back to you, or skip it and
            call — whichever&apos;s easier.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="surface-raised rounded-lg p-7 sm:p-9">
            <EnquiryForm />
          </div>

          <div className="space-y-4">
            <a
              href={waLink(SITE.phones[0].wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-md bg-brass text-blueprint-deep font-semibold shadow-e2 transition-all duration-300 hover:bg-brass-bright hover:-translate-y-1 hover:shadow-brass"
            >
              <IconWhatsApp className="w-6 h-6 shrink-0" />
              <span className="flex-1">Message us on WhatsApp</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <div className="surface rounded-lg divide-y divide-ink/8">
              {SITE.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="group flex items-center gap-4 p-5 transition-colors hover:bg-paper/70"
                >
                  <IconPhone className="w-5 h-5 text-brass shrink-0" />
                  <span className="font-semibold transition-colors group-hover:text-brass">
                    {p.display}
                  </span>
                </a>
              ))}
              <a
                href={`mailto:${SITE.email}?subject=Property%20Requirement`}
                className="group flex items-center gap-4 p-5 transition-colors hover:bg-paper/70"
              >
                <IconMail className="w-5 h-5 text-brass shrink-0" />
                <span className="text-sm break-all transition-colors group-hover:text-brass">
                  {SITE.email}
                </span>
              </a>
            </div>

            <div className="rounded-md overflow-hidden surface">
              <div className="flex items-start gap-4 p-5">
                <IconPin className="w-5 h-5 text-brass shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">{SITE.address.line}</p>
                  <p className="text-sm text-ink-soft mb-2.5">
                    {SITE.address.city}, {SITE.address.state}
                  </p>
                  <a
                    href={SITE.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brass hover:text-brass-bright transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
              <iframe
                src={SITE.mapsEmbed}
                width="100%"
                height="230"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Beig Estates location — ${SITE.address.line}, ${SITE.address.city}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

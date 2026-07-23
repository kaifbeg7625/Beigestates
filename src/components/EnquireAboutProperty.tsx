"use client";

const WHATSAPP_NUMBER = "917497937625";
const EMAIL = "kaifbegmirza7497@gmail.com";

export default function EnquireAboutProperty({
  propertyTitle,
  propertyType,
}: {
  propertyTitle: string;
  propertyType: string;
}) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in "${propertyTitle}" listed on Beig Estates. Could you share more details?`
  );

  function goToForm() {
    const service =
      propertyType === "Plot" ? "Buy Plot" : "Buy Property";
    sessionStorage.setItem("beig_intent_service", service);
    sessionStorage.setItem(
      "beig_intent_notes",
      `Interested in: ${propertyTitle}`
    );
    window.location.href = "/#contact";
  }

  return (
    <div className="bg-white rounded border border-ink/10 p-6 sticky top-6">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-4">
        Interested in this property?
      </p>

      <button
        onClick={goToForm}
        className="w-full mb-3 py-3.5 rounded bg-ink text-paper font-mono text-[13px] uppercase tracking-wide hover:bg-blueprint-deep transition-colors"
      >
        Request Full Details
      </button>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
        target="_blank"
        className="w-full mb-3 py-3.5 rounded bg-brass text-blueprint-deep font-mono text-[13px] uppercase tracking-wide hover:bg-brass-bright transition-colors flex items-center justify-center"
      >
        WhatsApp Us →
      </a>

      <a
        href={`mailto:${EMAIL}?subject=Enquiry: ${propertyTitle}`}
        className="w-full py-3.5 rounded border border-ink/25 font-mono text-[13px] uppercase tracking-wide hover:border-brass hover:text-brass transition-colors flex items-center justify-center"
      >
        Email Us →
      </a>
    </div>
  );
}

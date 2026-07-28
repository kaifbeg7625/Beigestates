import Image from "next/image";

export default function Story() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-blueprint-deep">
      <Image
        src="/hero.webp"
        alt="Lucknow street with modern residential towers"
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blueprint-deep via-blueprint-deep/85 to-blueprint-deep" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brass-bright flex items-center justify-center gap-2 mb-6">
          <span className="w-8 h-px bg-brass-bright" />
          Our Approach
          <span className="w-8 h-px bg-brass-bright" />
        </div>
        <h2 className="font-serif font-semibold text-[30px] sm:text-[40px] leading-[1.25] text-paper mb-8">
          A city of real people, real deals, and one person you can actually call.
        </h2>
        <p className="text-[16px] sm:text-[18px] text-paper/70 leading-relaxed">
          Lucknow is full of good properties and good deals — what&apos;s
          missing is someone accountable to walk you through it. No blasting
          your number to ten agents. No listings that vanished last month. No
          disappearing after you&apos;ve paid a token. Just one dedicated
          point of contact, from the first enquiry to the day you hold the
          keys — or hand them over.
        </p>
      </div>
    </section>
  );
}

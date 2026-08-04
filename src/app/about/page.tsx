import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "How Beig Estates works, and why clients trust us for property advisory in Lucknow.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title: "About Beig Estates",
    description: "How Beig Estates works, and why clients trust us for property advisory in Lucknow.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-3 flex items-center gap-2">
            <span className="w-[18px] h-px bg-brass" />
            About
          </div>
          <h1 className="font-serif font-semibold text-3xl">
            About Beig Estates
          </h1>
        </div>
        <ProblemSolution />
        <Services />
        <HowItWorks />
        <Trust />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

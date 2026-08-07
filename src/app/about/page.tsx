import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
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
        <PageHeader
          title="About Beig Estates"
          crumbs={[{ label: "About" }]}
        />
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

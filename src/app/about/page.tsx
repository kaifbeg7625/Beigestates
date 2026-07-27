import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "How Beig Estates works, and why clients trust us for property advisory in Lucknow.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <ProblemSolution />
      <HowItWorks />
      <Trust />
      <FAQ />
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import Trust from "@/components/Trust";
import Listings from "@/components/Listings";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntentPopup from "@/components/IntentPopup";

export default function Home() {
  return (
    <>
      <IntentPopup />
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Listings />
      <Trust />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

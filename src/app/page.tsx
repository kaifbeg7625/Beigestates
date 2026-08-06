import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickExplore from "@/components/QuickExplore";
import FeaturedListings from "@/components/FeaturedListings";
import Localities from "@/components/Localities";
import WhyUs from "@/components/WhyUs";
import Story from "@/components/Story";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

// Order is deliberate: show properties before making claims. The page used to
// go hero → copy → copy → form without a single listing on it, which is the
// first thing anyone actually scrolls for.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <QuickExplore />
        <FeaturedListings />
        <Localities />
        <WhyUs />
        <Story />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

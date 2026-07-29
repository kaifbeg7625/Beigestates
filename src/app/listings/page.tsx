import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Listings from "@/components/Listings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Browse current flats, plots, and villas available through Beig Estates in Lucknow.",
  alternates: {
    canonical: "/listings",
  },
  openGraph: {
    url: "/listings",
    title: "Property Listings | Beig Estates",
    description: "Browse current flats, plots, and villas available through Beig Estates in Lucknow.",
  },
};

export const revalidate = 60;

export default function ListingsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-2">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-3 flex items-center gap-2">
            <span className="w-[18px] h-px bg-brass" />
            Listings
          </div>
          <h1 className="font-serif font-semibold text-3xl">
            Property Listings in Lucknow
          </h1>
        </div>
        <Listings />
      </main>
      <Footer />
    </>
  );
}

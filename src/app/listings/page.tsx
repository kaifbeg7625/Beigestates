import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Listings from "@/components/Listings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Browse current flats, plots, and villas available through Beig Estates in Lucknow.",
};

export const revalidate = 60;

export default function ListingsPage() {
  return (
    <>
      <Navbar />
      <Listings />
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Share your property requirement with Beig Estates — WhatsApp, call, email, or the form below.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
}

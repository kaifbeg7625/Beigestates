import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Share your property requirement with Beig Estates — WhatsApp, call, email, or the form below.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
    title: "Contact Beig Estates",
    description: "Share your property requirement with Beig Estates — WhatsApp, call, email, or the form below.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div className="container-page pt-14 pb-2">
          <div className="label text-brass mb-3 flex items-center gap-2">
            <span className="w-[18px] h-px bg-brass" />
            Contact
          </div>
          <h1 className="font-extrabold text-3xl">
            Contact Beig Estates
          </h1>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

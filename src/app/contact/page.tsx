import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
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
        <PageHeader
          title="Contact Beig Estates"
          crumbs={[{ label: "Contact" }]}
        />
        {/* The section carries its own heading on the homepage; on this page
            PageHeader already said it, so it renders headless. */}
        <Contact headless />
      </main>
      <Footer />
    </>
  );
}

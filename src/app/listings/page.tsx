import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Listings from "@/components/Listings";
import PageHeader from "@/components/PageHeader";
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

type Props = {
  searchParams: Promise<{
    type?: string;
    q?: string;
    beds?: string;
    budget?: string;
  }>;
};

export default async function ListingsPage({ searchParams }: Props) {
  const { type, q, beds, budget } = await searchParams;

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          title="Property listings in Lucknow"
          crumbs={[{ label: "Listings" }]}
        />
        <Listings
          filterType={type}
          initialKeyword={q}
          initialBeds={beds}
          initialBudget={budget ? Number(budget) : undefined}
        />
      </main>
      <Footer />
    </>
  );
}

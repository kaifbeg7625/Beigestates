import type { Metadata } from "next";
import "./globals.css";

// ⚠️ Update this if you connect a custom domain later
const SITE_URL = "https://beigestates.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beig Estates — Real Estate & Property Advisory in Lucknow",
    template: "%s | Beig Estates",
  },
  description:
    "Buying, renting, or selling property in Lucknow? Beig Estates helps you find flats, plots, and villas, negotiate the right price, and close without the runaround.",
  keywords: [
    "real estate agent Lucknow",
    "property dealer Lucknow",
    "flats for sale Lucknow",
    "plots for sale Lucknow",
    "buy property Lucknow",
    "rent property Lucknow",
    "Beig Estates",
  ],
  authors: [{ name: "Beig Estates" }],
  openGraph: {
    title: "Beig Estates — Real Estate & Property Advisory in Lucknow",
    description:
      "Find flats, plots, and villas in Lucknow with a dedicated point of contact from enquiry to closed deal.",
    url: SITE_URL,
    siteName: "Beig Estates",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Beig Estates — Real Estate & Property Advisory in Lucknow",
    description:
      "Find flats, plots, and villas in Lucknow with a dedicated point of contact from enquiry to closed deal.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Beig Estates",
              description:
                "Real estate and property advisory helping clients buy, rent, and sell flats, plots, and villas in Lucknow.",
              url: SITE_URL,
              telephone: "+91-7497937625",
              areaServed: {
                "@type": "City",
                name: "Lucknow",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lucknow",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              sameAs: [],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

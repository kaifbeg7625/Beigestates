import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beig Estates — Real Estate & Property Advisory",
  description: "Buying, renting, or selling property in Lucknow — Beig Estates helps you find the right property and close without the runaround.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

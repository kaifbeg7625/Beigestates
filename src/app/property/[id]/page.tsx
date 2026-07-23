import { createClient } from "@/lib/supabase/server";
import type { Property } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import EnquireAboutProperty from "@/components/EnquireAboutProperty";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single<Property>();

  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} — ${property.location}`,
    description: `${property.title} in ${property.location} — ${property.price}. ${property.area ?? ""} ${property.status}. View details and enquire with Beig Estates.`,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single<Property>();

  if (!property) notFound();

  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.image_url
      ? [property.image_url]
      : [];

  return (
    <>
      <Navbar />

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <a href="/#listings" className="font-mono text-xs uppercase tracking-wide text-brass mb-6 inline-block">
            ← Back to listings
          </a>

          <PropertyGallery images={images} title={property.title} />

          <div className="grid sm:grid-cols-3 gap-10 mt-10">
            <div className="sm:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-wide text-brass mb-2">
                {property.property_type} · {property.status}
              </div>
              <h1 className="font-serif font-semibold text-3xl mb-2">
                {property.title}
              </h1>
              <p className="text-ink-soft mb-6">{property.location}</p>

              <div className="font-serif font-semibold text-3xl text-brass mb-8">
                {property.price}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 border-y border-ink/10 py-5">
                {property.area && <Detail label="Area" value={property.area} />}
                {property.bedrooms && <Detail label="Bedrooms" value={property.bedrooms} />}
                {property.bathrooms && <Detail label="Bathrooms" value={property.bathrooms} />}
              </div>

              {property.description && (
                <div>
                  <h2 className="font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-3">
                    About This Property
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}
            </div>

            <div>
              <EnquireAboutProperty propertyTitle={property.title} propertyType={property.property_type} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft/70 mb-1">
        {label}
      </p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
}

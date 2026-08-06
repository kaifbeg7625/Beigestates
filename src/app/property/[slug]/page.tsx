import { cache, Suspense } from "react";
import {
  getPropertyById,
  getRelatedProperties,
  getPropertySlugSeeds,
} from "@/lib/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import EnquireAboutProperty from "@/components/EnquireAboutProperty";
import BookVisit from "@/components/BookVisit";
import PropertyCard from "@/components/PropertyCard";
import { SITE } from "@/lib/site";
import { idFromSlug, propertySlug } from "@/lib/slug";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

const SITE_URL = "https://beigestates.vercel.app";

// generateMetadata and the page body both need the property. Without cache()
// that's two identical round trips to Supabase on every single request —
// which is most of why this page felt slow to open.
const getProperty = cache(async (slug: string) => {
  const id = idFromSlug(slug);
  if (!id) return null;
  return getPropertyById(id);
});

// Pre-render the listings that exist at build time so a visitor gets static
// HTML instead of waiting on a database call. Anything added later still
// works — it renders on first request and is then cached for `revalidate`.
export async function generateStaticParams() {
  try {
    const rows = await getPropertySlugSeeds();
    return rows.map((p) => ({ slug: propertySlug(p) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) return { title: "Property Not Found" };

  const canonical = `/property/${propertySlug(property)}`;
  const title = `${property.title} in ${property.location}`;
  const description = `${property.title} in ${property.location}, Lucknow — ${property.price}. ${[
    property.area,
    property.bedrooms && `${property.bedrooms} BHK`,
    property.status,
  ]
    .filter(Boolean)
    .join(", ")}. Enquire with Beig Estates.`;
  const cover = property.images?.[0] ?? property.image_url ?? undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  // Someone landing on a bare UUID or a stale title gets moved to the
  // canonical URL rather than the page existing at two addresses.
  const canonicalSlug = propertySlug(property);
  if (slug !== canonicalSlug) redirect(`/property/${canonicalSlug}`);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : property.image_url
      ? [property.image_url]
      : [];

  const isRental = property.property_type === "Rent";
  const priceNumeric = property.price.replace(/[^0-9]/g, "");

  // Deliberately not awaited here — the nearby listings are below the fold,
  // so they stream in via Suspense instead of holding up the whole page.

  const terms = isRental
    ? [
        property.deposit && { label: "Security deposit", value: property.deposit },
        property.maintenance && {
          label: "Maintenance",
          value: property.maintenance,
        },
        property.furnishing && { label: "Furnishing", value: property.furnishing },
        property.available_from && {
          label: "Available from",
          value: new Date(property.available_from).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        },
      ].filter(Boolean)
    : [];

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: property.title,
            description:
              property.description ||
              `${property.title} in ${property.location}`,
            url: `${SITE_URL}/property/${canonicalSlug}`,
            image: images,
            address: {
              "@type": "PostalAddress",
              addressLocality: property.location,
              addressRegion: SITE.address.state,
              addressCountry: SITE.address.country,
            },
            offers: {
              "@type": "Offer",
              price: priceNumeric || undefined,
              priceCurrency: "INR",
              availability:
                property.status === "Ready to Move"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
            },
          }),
        }}
      />

      <main id="main-content">
        <section className="py-10 sm:py-14 bg-shell">
          <div className="container-page">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2.5 text-sm text-ink-soft flex-wrap">
                <li>
                  <Link href="/" className="hover:text-brass transition-colors">
                    Home
                  </Link>
                </li>
                <Divider />
                <li>
                  <Link
                    href="/listings"
                    className="hover:text-brass transition-colors"
                  >
                    Listings
                  </Link>
                </li>
                <Divider />
                <li>
                  <Link
                    href={`/listings?type=${encodeURIComponent(property.property_type)}`}
                    className="hover:text-brass transition-colors"
                  >
                    {property.property_type}
                  </Link>
                </li>
                <Divider />
                <li className="text-ink" aria-current="page">
                  {property.location}
                </li>
              </ol>
            </nav>

            <PropertyGallery
              images={images}
              videos={property.videos ?? []}
              title={property.title}
            />

            <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 mt-12">
              <div>
                <div className="label text-brass mb-4">
                  {property.property_type} · {property.status}
                </div>
                <h1 className="font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-3">
                  {property.title}
                </h1>
                <p className="text-lg text-ink-soft mb-8">{property.location}</p>

                <div className="font-extrabold text-4xl text-brass mb-10">
                  {property.price}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 surface rounded-lg p-7">
                  {property.area && <Detail label="Area" value={property.area} />}
                  {property.bedrooms && (
                    <Detail label="Bedrooms" value={property.bedrooms} />
                  )}
                  {property.bathrooms && (
                    <Detail label="Bathrooms" value={property.bathrooms} />
                  )}
                  <Detail label="Type" value={property.property_type} />
                  <Detail label="Status" value={property.status} />
                  <Detail label="Locality" value={property.location} />
                </div>

                {/* Rentals live or die on the money terms, so they get their
                    own block instead of being buried in the description. */}
                {isRental && terms.length > 0 && (
                  <div className="surface-tan rounded-xl p-7 mb-8">
                    <p className="label text-brass mb-5">Rental terms</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {terms.map((t) => (
                        <div key={(t as { label: string }).label}>
                          <p className="label text-[0.625rem] text-ink-soft/70 mb-1.5">
                            {(t as { label: string }).label}
                          </p>
                          <p className="font-bold">
                            {(t as { value: string }).value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.description && (
                  <div>
                    <h2 className="label text-ink-soft mb-4">
                      About this property
                    </h2>
                    <p className="leading-relaxed whitespace-pre-line text-ink-soft">
                      {property.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:sticky lg:top-28 lg:self-start space-y-5">
                <BookVisit
                  propertyId={property.id}
                  propertyTitle={property.title}
                  propertyLocation={property.location}
                />
                <EnquireAboutProperty
                  propertyTitle={property.title}
                  propertyType={property.property_type}
                />
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <NearbyProperties
            location={property.location}
            excludeId={property.id}
          />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

async function NearbyProperties({
  location,
  excludeId,
}: {
  location: string;
  excludeId: string;
}) {
  const related = await getRelatedProperties(location, excludeId);
  if (related.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-paper">
      <div className="container-page">
        <div className="label text-brass mb-4 flex items-center gap-2.5">
          <span className="w-[18px] h-px bg-brass" />
          Also in {location}
        </div>
        <h2 className="font-extrabold text-3xl sm:text-4xl mb-12 leading-tight">
          Other properties nearby.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {related.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <li aria-hidden="true" className="text-ink-soft/40">
      /
    </li>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label text-[0.625rem] text-ink-soft/70 mb-1.5">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

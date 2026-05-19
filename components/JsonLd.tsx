import { LOCATIONS } from "@/lib/locations";

// Local Business + Organization schema with each branch as a sub-location.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://johnnyssmokeshop.com/#org",
        name: "Johnny's Smoke Shop & Kava Bar",
        url: "https://johnnyssmokeshop.com",
        logo: "https://johnnyssmokeshop.com/logo.png",
        sameAs: [
          "https://www.instagram.com/johnnyssmokeshop",
          "https://www.facebook.com/johnnyssmokeshop",
        ],
      },
      ...LOCATIONS.map((loc) => ({
        "@type": ["Store", "LocalBusiness"],
        "@id": `https://johnnyssmokeshop.com/locations/${loc.id}`,
        name: `Johnny's Smoke Shop & Kava Bar — ${loc.name}`,
        parentOrganization: { "@id": "https://johnnyssmokeshop.com/#org" },
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.address.split(",")[0],
          addressLocality: loc.area,
          addressRegion: "FL",
          addressCountry: "US",
        },
        telephone: loc.phone,
        openingHours: loc.hours,
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.lat,
          longitude: loc.lng,
        },
        priceRange: "$$",
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — content is fully internal/static.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

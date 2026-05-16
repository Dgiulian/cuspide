import { Metadata } from "next";
import BenefitsSection from "@/components/benefits-section";
import { ContactUsSection } from "@/components/contact-us-section";
import { HeroSection } from "@/components/hero-section";
import ListingCard from "@/components/listings-list/listing-card";
import { getFeaturedProperties } from "@/services/listings";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Cuspide Bienes Raices | Propiedades en Neuquén y Rio Negro";
  const description = "Cuspide Bienes Raices - Agencia inmobiliaria líder en el Alto Valle de Rio Negro y Neuquén. Casas, departamentos, terrenos y locales en venta y alquiler.";
  
  return {
    title,
    description,
    keywords: ["bienes raices", "propiedades", "Neuquén", "Rio Negro", "casas", "departamentos", "terrenos", "inmobiliaria"],
    authors: [{ name: "Cuspide Bienes Raices" }],
    openGraph: {
      title: title,
      description: description,
      url: `https://cuspidebr.com.ar/`,
      siteName: "Cuspide Bienes Raices",
      locale: "es_AR",
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
          width: 917,
          height: 530,
          alt: "Cuspide Bienes Raices - Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [
        "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
      ],
    },
    alternates: {
      canonical: "https://cuspidebr.com.ar/",
    },
  };
}

// JSON-LD Structured Data for LocalBusiness
function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Cuspide Bienes Raices",
    description: "Agencia inmobiliaria líder en el Alto Valle de Rio Negro y Neuquén",
    url: "https://cuspidebr.com.ar",
    logo: "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
    image: "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Neuquén",
      addressRegion: "Neuquén",
      addressCountry: "AR",
    },
    areaServed: {
      "@type": "Place",
      name: "Alto Valle de Rio Negro y Neuquén",
    },
    sameAs: [
      "https://www.facebook.com/CuspideBr",
      "https://www.instagram.com/cuspide.neuquen/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  
  return (
    <>
      <StructuredData />
      <HeroSection />
      <section
        className="w-full py-12 md:py-24 lg:py-32"
        id="propiedades-destacadas"
      >
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Propiedades Destacadas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.slice(0, 3).map((p) => (
              <ListingCard key={p.id} listing={p} isGridView={true} />
            ))}
          </div>
        </div>
      </section>
      <BenefitsSection />
      <ContactUsSection />
    </>
  );
}

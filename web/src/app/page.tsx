import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BenefitsSection from "@/components/benefits-section";
import { ContactUsSection } from "@/components/contact-us-section";
import { HeroSection } from "@/components/hero-section";
import ListingCard from "@/components/listings-list/listing-card";
import Reveal from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties, getUniqueCities } from "@/services/listings";
import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "@/lib/contact-info";

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
    telephone: CONTACT_PHONE_E164,
    email: CONTACT_EMAIL,
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT_PHONE_E164,
      email: CONTACT_EMAIL,
      availableLanguage: ["es-AR"],
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
  const [featuredProperties, cities] = await Promise.all([
    getFeaturedProperties(),
    getUniqueCities(),
  ]);

  return (
    <>
      <StructuredData />
      <HeroSection cities={cities} />
      <section
        className="w-full py-16 md:py-24 lg:py-28"
        id="propiedades-destacadas"
      >
        <div className="container px-4 md:px-6">
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Selección exclusiva
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Propiedades destacadas
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg">
                Las mejores oportunidades del Alto Valle, elegidas por nuestro
                equipo.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit rounded-full">
              <Link href="/propiedades">
                Ver todas las propiedades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 120} className="h-full">
                <ListingCard listing={p} isGridView={true} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BenefitsSection />
      <ContactUsSection />
    </>
  );
}

import "@/app/globals.css";

import BenefitsSection from "@/components/benefits-section";
import { ContactUsSection } from "@/components/contact-us-section";
import { HeroSection } from "@/components/hero-section";
import ListingCard from "@/components/listings-list/listing-card";
import { getFeaturedProperties } from "@/services/get-featured-properties";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Cuspide Bienes Raices";
  const description = "";
  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      url: `https://cuspidebr.com.ar/`,
      siteName: "Cuspiude Bienes Raices",
      images: [
        {
          url: "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
          width: 917,
          height: 530,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      // description: pageData.description,
      images: [
        "https://res.cloudinary.com/dsm3kqzwd/image/upload/v1734053129/cuspide-logo_gl4pu3.jpg",
      ],
    },
  };
}

export default async function HomePage() {
  const featuredProperties = (await getFeaturedProperties()) ?? [];
  return (
    <>
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
            {featuredProperties.map((p) => (
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

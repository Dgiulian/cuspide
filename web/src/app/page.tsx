import "@/app/globals.css";

import BenefitsSection from "@/components/benefits-section";
import { ContactUsSection } from "@/components/contact-us-section";
import { HeroSection } from "@/components/hero-section";
import ListingCard from "@/components/listings-list/listing-card";
import { getFeaturedProperties } from "@/services/get-featured-properties";

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

import { getFeaturedProperties } from "@/services/get-featured-properties";
import { ListingCard } from "@/components/listings-list/listing-card";

export async function FeaturedSection() {
  const featuredProperties = await getFeaturedProperties();
  
  if (!featuredProperties || featuredProperties.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Propiedades Destacadas
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Explora nuestras mejores propiedades seleccionadas para ti.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 3).map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isGridView={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

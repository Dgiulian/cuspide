import { propertiesListStore } from "@/components/PropertiesList/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@nanostores/react";
import { type PropiedadType } from "@/services/properties";

export default function PropertiesListToggle({
  properties,
}: {
  properties: PropiedadType[];
}) {
  const isGridView = useStore(propertiesListStore);
  // Mock data for real estate listings

  return (
    <div
      className={`grid gap-6 ${
        isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      }`}
    >
      {properties.map((listing) => (
        <Card key={listing.id} className={isGridView ? "" : "flex flex-row"}>
          <div className={`relative ${isGridView ? "h-48" : "h-full w-1/3"}`}>
            <img
              src={`/placeholder.svg?height=200&width=300&text=${listing.title}`}
              alt={listing.title}
              className="rounded-t-lg"
            />
          </div>
          <div className={isGridView ? "" : "w-2/3"}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{listing.price}</p>
              <p className="text-muted-foreground">
                {listing.rooms} beds • {listing.bathrooms} baths •{" "}
                {listing.land_surface} mt2
              </p>
            </CardContent>
            <CardFooter>
              <a
                href={`/detalle/${listing.documentId}`}
                className="
                h-10 px-4 py-2
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                bg-primary text-primary-foreground hover:bg-primary/90"
              >
                View Details
              </a>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}

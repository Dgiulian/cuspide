import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Mapa } from "@/components/mapa";
import PropertyDetails from "@/components/property-details";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/services/get-listing-by-slug";
import { Geopoint } from "@/domain/property";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ listingSlug: string }>;
}
const DEFAULT_LOCATION: Geopoint = {
  _type: "geopoint",
  lat: 0,
  lng: 0,
  alt: 0,
};

// export const metadata = {
//   title: "Cuspide Bienes Raices | ",
// };

// or dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listingSlug } = await params;

  const propertyDetail = await getListingBySlug(listingSlug);

  return {
    title: `Cuspide Bienes Raices | ${propertyDetail?.title}`,
    openGraph: {
      // images: ['/some-specific-page-image.jpg'],
    },
  };
}

export default async function DetallePage({ params }: Props) {
  const { listingSlug } = await params;

  if (!listingSlug) return notFound();

  const propertyDetail = await getListingBySlug(listingSlug);
  if (!propertyDetail) return notFound();

  return (
    <>
      <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-6">{propertyDetail.title}</h1>

        {/* Carrusel de Imágenes */}
        <ImageCarousel images={propertyDetail.images ?? []} />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Detalles de la Propiedad */}
          <PropertyDetails property={propertyDetail} />

          {/* Mapa */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            <CardHeader>
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <Mapa location={propertyDetail.location ?? DEFAULT_LOCATION} />
              </div>
              {propertyDetail.city && (
                <div className="mt-4 flex items-center">
                  <MapPin className="mr-2" size={16} />
                  <span>{`${propertyDetail.city}, ${propertyDetail.state ?? ""}`}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" variant="default">
            Programar una Visita
          </Button>
        </div>
      </div>
    </>
  );
}

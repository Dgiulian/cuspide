import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyByDocumentId } from "@/services/properties";
import { MapPin } from "lucide-react";
// import Map from "@/components/Map.astro";
import PropertyDetails from "@/components/property-details";
import { redirect } from "next/navigation";

const propiedad = {
  id: "123",
  title: "Lujoso Apartamento en el Centro",
  description:
    "Un impresionante apartamento de 3 habitaciones en el corazón de la ciudad con vistas impresionantes.",
  price: 750000,
  currency: "ARS",
  habitaciones: 3,
  banos: 2,
  area: 139, // convertido a metros cuadrados
  address: "Calle Principal 123, Ciudad, Estado 12345",
  imagenes: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  agente: {
    nombre: "Ana García",
    telefono: "+34 555 123 456",
    email: "ana.garcia@inmobiliaria.com",
  },
  latitud: 40.7128,
  longitud: -74.006,
};

interface Props {
  params: { propertyId: string };
}

export default async function DetallePage({ params }: Props) {
  const { propertyId } = params;
  if (!propertyId) return redirect("/404");
  const propertyDetail = await getPropertyByDocumentId(propertyId);
  if (!propertyDetail) return redirect("/404");

  console.dir({ propertyDetail });
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
                {/* <Mapa
              centro={{ lat: propiedad.latitud, lng: propiedad.longitud }}
              zoom={15}
              marcadores={[{ lat: propiedad.latitud, lng: propiedad.longitud }]}
            /> */}
              </div>
              <div className="mt-4 flex items-center">
                <MapPin className="mr-2" size={16} />
                <span>{propiedad.address}</span>
              </div>
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Phone, Mail } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import { getPropertyByDocumentId } from "@/services/properties";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
// import Map from "@/components/Map.astro";
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
  console.log({ params });
  const { propertyId } = params;
  if (!propertyId) return redirect("/404");
  const propertyDetail = await getPropertyByDocumentId(propertyId);

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">{propertyDetail.title}</h1>

        {/* Carrusel de Imágenes */}
        <ImageCarousel propiedad={propiedad} />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Detalles de la Propiedad */}
          <Card className="bg-gray-800 border-gray-700 text-gray-100">
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
              <CardDescription className="text-gray-400">
                {propertyDetail?.description && (
                  <BlocksRenderer
                    content={propertyDetail.description as BlocksContent}
                  />
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">
                  {propertyDetail.price &&
                    parseInt(propertyDetail.price).toLocaleString("es-ES", {
                      style: "currency",
                      currency: propertyDetail.currency ?? "ARS",
                    })}
                </span>
                <Badge variant="secondary">En Venta</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Bed className="mr-2" />
                  <span>{propertyDetail.rooms} Habitaciones</span>
                </div>
                <div className="flex items-center">
                  <Bath className="mr-2" />
                  <span>{propertyDetail.bathrooms} Baños</span>
                </div>
                <div className="flex items-center">
                  <Square className="mr-2" />
                  <span>{propertyDetail.built_surface} m²</span>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-2">Contactar al Agente</h3>
                <p className="font-medium">{propiedad.agente.nombre}</p>
                <div className="flex items-center mt-2">
                  <Phone className="mr-2" size={16} />
                  <span>{propiedad.agente.telefono}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Mail className="mr-2" size={16} />
                  <span>{propiedad.agente.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa */}
          <Card className="bg-gray-800 border-gray-700 text-gray-100">
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
          <Button size="lg" variant="secondary">
            Programar una Visita
          </Button>
        </div>
      </div>
    </>
  );
}

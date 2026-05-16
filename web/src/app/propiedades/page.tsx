import ListingsList from "@/components/listings-list";
import { getAllListings } from "@/services/listings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propiedades en Venta y Alquiler | Cuspide Bienes Raices",
  description: "Explora todas nuestras propiedades disponibles: casas, departamentos, terrenos y locales en el Alto Valle de Rio Negro y Neuquén. Encuentra tu hogar ideal.",
  keywords: ["propiedades", "venta", "alquiler", "casas", "departamentos", "terrenos", "Neuquén", "Rio Negro"],
  openGraph: {
    title: "Propiedades en Venta y Alquiler | Cuspide Bienes Raices",
    description: "Explora todas nuestras propiedades disponibles en el Alto Valle de Rio Negro y Neuquén.",
    type: "website",
  },
  alternates: {
    canonical: "https://cuspidebr.com.ar/propiedades",
  },
};

export default async function PropiedadesPage() {
  const listings = await getAllListings();
  
  if (listings.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No hay propiedades disponibles</h1>
        <p className="text-muted-foreground">
          En este momento no tenemos propiedades en nuestra base de datos.
          Por favor, vuelve a intentar más tarde.
        </p>
      </div>
    );
  }
  
  return <ListingsList listings={listings} title="Todas las Propiedades" />;
}

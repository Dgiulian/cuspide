import ListingsList from "@/components/listings-list";
import ListingsFilters from "@/components/listings-list/listings-filters";
import {
  searchListings,
  VALID_OPERATIONS,
  VALID_PROPERTY_TYPES,
  type SearchFilters,
} from "@/services/listing-search";
import { getUniqueCities } from "@/services/listings";
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

const typeTitles: Record<string, string> = {
  casa: "Casas",
  departamento: "Departamentos",
  duplex: "Dúplex",
  terreno: "Terrenos",
  local: "Locales",
};

function buildTitle(filters: SearchFilters): string {
  if (!filters.type && !filters.operation && !filters.city) {
    return "Todas las Propiedades";
  }

  const parts = [typeTitles[filters.type ?? ""] ?? "Propiedades"];
  if (filters.operation) {
    parts.push(filters.operation === "venta" ? "en Venta" : "en Alquiler");
  }
  if (filters.city) {
    parts.push(`en ${filters.city}`);
  }
  return parts.join(" ");
}

interface PropiedadesPageProps {
  searchParams: Promise<{
    operation?: string;
    type?: string;
    location?: string;
  }>;
}

export default async function PropiedadesPage({
  searchParams,
}: PropiedadesPageProps) {
  const params = await searchParams;

  const filters: SearchFilters = {
    operation: (VALID_OPERATIONS as readonly string[]).includes(
      params.operation ?? ""
    )
      ? (params.operation as "venta" | "alquiler")
      : null,
    type: (VALID_PROPERTY_TYPES as readonly string[]).includes(
      params.type ?? ""
    )
      ? params.type
      : null,
    city: params.location || null,
  };

  const [listings, cities] = await Promise.all([
    searchListings(filters),
    getUniqueCities(),
  ]);

  return (
    <ListingsList
      listings={listings}
      title={buildTitle(filters)}
      toolbar={<ListingsFilters cities={cities} />}
      emptyState={{
        title: "No se encontraron propiedades",
        description:
          "No hay propiedades que coincidan con los filtros seleccionados. Intenta ajustarlos para ver más resultados.",
        showResetButton: true,
        resetHref: "/propiedades",
      }}
    />
  );
}

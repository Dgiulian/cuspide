import { searchListings, getUniqueLocations, SearchFilters } from "@/services/listing-search";
import ListingsList from "@/components/listings-list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Propiedades | Cuspide Bienes Raices",
  description: "Busca propiedades en venta y alquiler en Neuquén y Rio Negro. Filtra por tipo, precio, ubicación y encuentra tu hogar ideal.",
  keywords: ["buscar propiedades", "filtros", "venta", "alquiler", "Neuquén", "Rio Negro"],
  openGraph: {
    title: "Buscar Propiedades | Cuspide Bienes Raices",
    description: "Busca propiedades en venta y alquiler en Neuquén y Rio Negro.",
    type: "website",
  },
  alternates: {
    canonical: "https://cuspidebr.com.ar/busqueda",
  },
};

interface SearchPageProps {
  searchParams: {
    type?: string;
    operation?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters: SearchFilters = {
    type: searchParams.type || null,
    operation: (searchParams.operation as "venta" | "alquiler") || null,
    location: searchParams.location || null,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : null,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : null,
    bedrooms: searchParams.bedrooms ? parseInt(searchParams.bedrooms) : null,
    bathrooms: searchParams.bathrooms ? parseInt(searchParams.bathrooms) : null,
  };

  const [listings, locations] = await Promise.all([
    searchListings(filters),
    getUniqueLocations(),
  ]);

  return (
    <div className="container mx-auto py-8">
      {/* Search Filters */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Buscar Propiedades</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select name="operation" defaultValue={searchParams.operation || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Operación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="venta">Venta</SelectItem>
              <SelectItem value="alquiler">Alquiler</SelectItem>
            </SelectContent>
          </Select>

          <Select name="type" defaultValue={searchParams.type || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="terreno">Terreno</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="departamento">Departamento</SelectItem>
              <SelectItem value="duplex">Duplex</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>

          <Select name="location" defaultValue={searchParams.location || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={`${loc.city}-${loc.state}`} value={loc.city}>
                  {loc.city}, {loc.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              name="minPrice"
              type="number"
              placeholder="Precio mínimo"
              defaultValue={searchParams.minPrice || ""}
            />
            <Input
              name="maxPrice"
              type="number"
              placeholder="Precio máximo"
              defaultValue={searchParams.maxPrice || ""}
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {listings.length} {listings.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
        </p>
      </div>

      {listings.length > 0 ? (
        <ListingsList listings={listings} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">No se encontraron propiedades</h2>
          <p className="text-muted-foreground">
            Intenta ajustar los filtros de búsqueda para ver más resultados.
          </p>
        </div>
      )}
    </div>
  );
}

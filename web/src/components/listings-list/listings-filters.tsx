"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const ALL = "all";

const operationOptions = [
  { value: ALL, label: "Venta y Alquiler" },
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

const typeOptions = [
  { value: ALL, label: "Todos los tipos" },
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "duplex", label: "Dúplex" },
  { value: "terreno", label: "Terreno" },
  { value: "local", label: "Local" },
];

interface ListingsFiltersProps {
  cities?: string[];
}

/**
 * Filter bar for listing pages. Reads the current filters from the URL
 * search params and navigates on change, so the server re-filters results.
 */
export function ListingsFilters({ cities = [] }: ListingsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const operation = searchParams.get("operation") ?? ALL;
  const type = searchParams.get("type") ?? ALL;
  const location = searchParams.get("location") ?? ALL;
  const hasFilters = operation !== ALL || type !== ALL || location !== ALL;

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const queryString = params.toString();
    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-opacity",
        isPending && "opacity-60"
      )}
    >
      <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filtrar
      </span>

      <Select value={operation} onValueChange={(v) => setParam("operation", v)}>
        <SelectTrigger className="w-full sm:w-[170px]" aria-label="Operación">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {operationOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={(v) => setParam("type", v)}>
        <SelectTrigger
          className="w-full sm:w-[180px]"
          aria-label="Tipo de propiedad"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {cities.length > 0 && (
        <Select value={location} onValueChange={(v) => setParam("location", v)}>
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Ubicación">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Todas las ciudades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="ml-auto text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1.5 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}

export default ListingsFilters;

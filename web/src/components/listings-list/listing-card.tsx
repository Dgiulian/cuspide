import { cn, formatPrice } from "@/lib/utils";
import { Property } from "@/domain/property";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface ListingCardProps {
  listing: Property;
  isGridView?: boolean;
  showFavoriteButton?: boolean;
}

const typeLabels: Record<string, string> = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  duplex: "Dúplex",
  local: "Local",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  disponible: {
    label: "Disponible",
    className: "bg-emerald-500/90 text-white",
  },
  vendida: {
    label: "Vendida",
    className: "bg-red-500/90 text-white",
  },
  reservada: {
    label: "Reservada",
    className: "bg-amber-400/95 text-stone-900",
  },
  no_disponible: {
    label: "No disponible",
    className: "bg-stone-500/90 text-white",
  },
};

export function ListingCard({
  listing,
  isGridView = true,
  showFavoriteButton = false,
}: ListingCardProps) {
  const status = listing.status || "disponible";
  const statusInfo = statusConfig[status] || statusConfig.disponible;
  const isAvailable = status === "disponible";

  const features = [
    listing.rooms != null && {
      icon: Bed,
      label: `${listing.rooms} amb`,
    },
    listing.bathrooms != null && {
      icon: Bath,
      label: `${listing.bathrooms} ${listing.bathrooms === 1 ? "baño" : "baños"}`,
    },
    listing.lot_size != null && {
      icon: Square,
      label: `${listing.lot_size} m²`,
    },
    listing.garage && {
      icon: Car,
      label: "Garage",
    },
  ].filter(Boolean) as { icon: React.ElementType; label: string }[];

  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10",
        isGridView ? "h-full flex-col" : "flex-col md:flex-row"
      )}
    >
      {/* Full-card link overlay */}
      <Link
        href={`/detalle/${listing.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Ver detalles de ${listing.title ?? "la propiedad"}`}
      />

      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          isGridView
            ? "aspect-[4/3]"
            : "aspect-[4/3] md:aspect-auto md:h-auto md:w-80 md:flex-shrink-0 lg:w-96"
        )}
      >
        <Image
          src={listing.image_cover || "/placeholder-property.jpg"}
          alt={listing.title ?? "Propiedad"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            !isAvailable && status !== "reservada" && "saturate-50"
          )}
        />

        {/* Scrim for legibility of chips */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/25" />

        {/* Top chips */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-900 shadow-sm backdrop-blur-sm">
              {typeLabels[listing.type || ""] || listing.type || "Propiedad"}
            </span>
            {listing.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                <Sparkles className="h-3 w-3" />
                Destacada
              </span>
            )}
          </div>

          {!isAvailable && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm backdrop-blur-sm",
                statusInfo.className
              )}
            >
              {statusInfo.label}
            </span>
          )}
        </div>

        {/* Price chip */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-baseline rounded-xl border border-white/20 bg-black/45 px-3.5 py-1.5 text-lg font-bold tracking-tight text-white shadow-lg backdrop-blur-md">
            {listing.price
              ? formatPrice(listing.price.toString(), listing.currency ?? "ars")
              : "Consultar"}
          </span>
        </div>

        {/* Favorite button — above the card link */}
        {showFavoriteButton && (
          <button
            className="absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white"
            aria-label="Agregar a favoritos"
          >
            <Heart className="h-4 w-4 text-stone-600 transition-colors hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight line-clamp-2 transition-colors group-hover:text-primary md:text-xl">
          {listing.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
          <span className="truncate">
            {listing.city || "Ubicación no especificada"}
            {listing.state && `, ${listing.state}`}
          </span>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
            {features.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary/80" />
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="text-xs text-muted-foreground">
            {listing.price && listing.lot_size
              ? `${formatPrice(
                  Math.round(listing.price / listing.lot_size).toString(),
                  listing.currency ?? "ars"
                )} / m²`
              : ""}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Ver detalles
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;

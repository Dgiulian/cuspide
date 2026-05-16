import { formatPrice } from "@/lib/utils";
import { Property } from "@/domain/property";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Car, Heart } from "lucide-react";

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
  disponible: { label: "Disponible", className: "bg-green-500 hover:bg-green-600 text-white" },
  vendida: { label: "Vendida", className: "bg-red-500 hover:bg-red-600 text-white" },
  reservada: { label: "Reservada", className: "bg-yellow-500 hover:bg-yellow-600 text-white" },
  no_disponible: { label: "No Disponible", className: "bg-gray-500 hover:bg-gray-600 text-white" },
};

export function ListingCard({ 
  listing, 
  isGridView = true,
  showFavoriteButton = false 
}: ListingCardProps) {
  const status = listing.status || "disponible";
  const statusInfo = statusConfig[status] || statusConfig.disponible;
  
  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isGridView ? "flex flex-col h-full" : "flex flex-col md:flex-row"
    }`}>
      {/* Image Section */}
      <div className={`relative overflow-hidden ${
        isGridView ? "h-56" : "h-56 md:w-80 md:h-64 flex-shrink-0"
      }`}>
        <Image
          src={listing.image_cover || "/placeholder-property.jpg"}
          alt={listing.title ?? "Propiedad"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type Badge - Top Left */}
        <Badge 
          className="absolute top-3 left-3 bg-black/70 text-white hover:bg-black/80 backdrop-blur-sm"
        >
          {typeLabels[listing.type || ""] || listing.type || "Propiedad"}
        </Badge>
        
        {/* Status Badge - Top Right */}
        {status !== "disponible" && (
          <Badge className={`absolute top-3 right-3 ${statusInfo.className}`}>
            {statusInfo.label}
          </Badge>
        )}
        
        {/* Featured Badge - Bottom */}
        {listing.featured && (
          <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
            Destacada
          </Badge>
        )}
        
        {/* Favorite Button */}
        {showFavoriteButton && (
          <button 
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Agregar a favoritos"
          >
            <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
          </button>
        )}
        
        {/* Price overlay on image */}
        <div className="absolute bottom-3 right-3">
          <span className="text-xl font-bold text-white drop-shadow-lg">
            {listing.price
              ? formatPrice(listing.price.toString(), listing.currency ?? "ars")
              : "Consultar"}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className={`flex flex-col flex-1 ${isGridView ? "" : "md:p-6"}`}>
        <CardContent className={`flex-1 ${isGridView ? "p-4" : "p-4 md:p-0 md:pb-0"}`}>
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">
              {listing.city || "Ubicación no especificada"}
              {listing.state && `, ${listing.state}`}
            </span>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {listing.rooms !== null && listing.rooms !== undefined && (
              <div className="flex items-center gap-1.5 text-sm">
                <Bed className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  {listing.rooms} {listing.rooms === 1 ? "hab" : "hab"}
                </span>
              </div>
            )}
            
            {listing.bathrooms !== null && listing.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5 text-sm">
                <Bath className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  {listing.bathrooms} {listing.bathrooms === 1 ? "baño" : "baños"}
                </span>
              </div>
            )}
            
            {listing.lot_size && (
              <div className="flex items-center gap-1.5 text-sm">
                <Square className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{listing.lot_size} m²</span>
              </div>
            )}
            
            {listing.garage && (
              <div className="flex items-center gap-1.5 text-sm">
                <Car className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Garage</span>
              </div>
            )}
          </div>
          
          {/* Price per m² if available */}
          {listing.price && listing.lot_size && (
            <p className="text-xs text-muted-foreground">
              {formatPrice(Math.round(listing.price / listing.lot_size).toString(), listing.currency ?? "ars")} / m²
            </p>
          )}
        </CardContent>
        
        {/* Footer with CTA */}
        <CardFooter className={`${isGridView ? "p-4 pt-0" : "p-4 md:p-0"}`}>
          <Button 
            asChild 
            className="w-full group/btn" 
            variant={status === "disponible" ? "default" : "secondary"}
            disabled={status !== "disponible"}
          >
            <Link href={`/detalle/${listing.slug}`}>
              {status === "disponible" ? "Ver detalles" : statusInfo.label}
              <svg 
                className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ListingCard;

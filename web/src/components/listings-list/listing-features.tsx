import { Property } from "@/domain/property";
import { Bed, Bath, Square, Car } from "lucide-react";

interface ListingFeaturesProps {
  listing: Property;
  compact?: boolean;
}

export function ListingFeatures({ listing, compact = false }: ListingFeaturesProps) {
  // If it's land (terreno), show only lot size
  if (listing.type === "terreno") {
    return (
      <div className={`flex items-center gap-2 ${compact ? "text-sm" : ""}`}>
        <Square className="h-4 w-4 text-primary flex-shrink-0" />
        <span className="text-muted-foreground">
          {listing.lot_size ? `${listing.lot_size} m²` : "Superficie no especificada"}
        </span>
      </div>
    );
  }

  return (
    <div className={`grid gap-2 ${compact ? "grid-cols-2 text-sm" : "grid-cols-2 sm:grid-cols-4 gap-3"}`}>
      {listing.rooms !== null && listing.rooms !== undefined && (
        <div className="flex items-center gap-2">
          <Bed className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">
            {listing.rooms} {compact ? "hab" : listing.rooms === 1 ? "habitación" : "habitaciones"}
          </span>
        </div>
      )}
      
      {listing.bathrooms !== null && listing.bathrooms !== undefined && (
        <div className="flex items-center gap-2">
          <Bath className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">
            {listing.bathrooms} {compact ? "baño" : listing.bathrooms === 1 ? "baño" : "baños"}
          </span>
        </div>
      )}
      
      {listing.lot_size && (
        <div className="flex items-center gap-2">
          <Square className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">{listing.lot_size} m²</span>
        </div>
      )}
      
      {listing.garage && (
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">{compact ? "Garage" : "Con garage"}</span>
        </div>
      )}
    </div>
  );
}

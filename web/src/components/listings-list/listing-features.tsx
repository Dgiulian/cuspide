import { PropiedadType } from "@/services/properties";

interface ListingFeaturesProps {
  listing: Omit<PropiedadType, "description">;
}

export function ListingFeatures({ listing }: ListingFeaturesProps) {
  if (listing.type === "terreno") {
    return (
      <p className="text-muted-foreground">
        {listing.lot_size} m<sup>2</sup>
      </p>
    );
  }

  return (
    <p className="text-muted-foreground">
      {listing.rooms} {listing.rooms === 1 ? "Habitación" : "Habitaciones"} •{" "}
      {listing.bathrooms} {listing.bathrooms === 1 ? "Baño" : "Baños"}{" "}
      {listing.lot_size ? (
        <span>
          • {listing.lot_size} m<sup>2</sup>
        </span>
      ) : null}
    </p>
  );
}

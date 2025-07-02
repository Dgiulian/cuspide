import { formatPrice } from "@/lib/utils";
import { PropiedadType } from "@/services/properties";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Image from "next/image";
import { ListingFeatures } from "./listing-features";

type Props = {
  listing: Omit<PropiedadType, "description">;
  isGridView: boolean;
};

function ListingCard({ listing, isGridView }: Props) {
  console.log(listing.status);
  return (
    <Card className={isGridView ? "" : "flex flex-row"}>
      <div className={`relative ${isGridView ? "h-56" : "h-full w-1/3"}`}>
        <Image
          src={getImageUrl(listing)}
          alt={listing.title ?? ""}
          fill
          className="rounded-t-lg object-cover"
        />
        <span className="absolute inline-block z-10 text-xl capitalize bg-red-600 top-[-12px] right-1 px-2 text-white">
          {listing.status && listing.status !== "disponible"
            ? listing.status.replace("_", " ")
            : null}
        </span>

        {listing.featured ? (
          <span className="absolute inline-block z-10 uppercase font-bold text-sm bg-blue-600 bottom-[-12px] right-1 px-2 text-white">
            Destacada
          </span>
        ) : null}
      </div>
      <div className={isGridView ? "" : "w-2/3"}>
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {listing.price
              ? formatPrice(listing.price.toString(), listing.currency ?? "ars")
              : "Consultar precio"}
          </p>
          <ListingFeatures listing={listing} />
        </CardContent>
        <CardFooter>
          <a
            href={`/detalle/${listing.slug}`}
            className="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Ver Detalles
          </a>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ListingCard;

function getImageUrl(p: Pick<Props, "listing">["listing"]) {
  if (typeof p.image_cover === "string") {
    return p.image_cover;
  }
  return p.image_cover?.url ?? "";
}

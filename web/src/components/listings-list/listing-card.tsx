import { formatPrice } from "@/lib/utils";
import { Property } from "@/domain/property";
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
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  listing: Property;
  isGridView: boolean;
};

function ListingCard({ listing, isGridView }: Props) {
  return (
    <Card
      className={
        isGridView
          ? "flex flex-col"
          : "flex flex-col md:flex-row md:items-center"
      }
    >
      <div
        className={`relative ${
          isGridView ? "h-56" : "h-full md:w-1/3 md:h-56"
        }`}
      >
        <Image
          src={listing.image_cover || "/placeholder-property.jpg"}
          alt={listing.title ?? "Propiedad"}
          fill
          className="rounded-t-lg object-cover"
        />
        {listing.status && listing.status !== "disponible" ? (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 capitalize"
          >
            {listing.status.replace("_", " ")}
          </Badge>
        ) : null}

        {listing.featured ? (
          <Badge className="absolute bottom-2 right-2">Destacada</Badge>
        ) : null}
      </div>
      <div className={isGridView ? "p-4" : "p-4 md:w-2/3"}>
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
          <Button asChild className="w-full" variant="outline">
            <Link href={`/detalle/${listing.slug}`}>Ver propiedad</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ListingCard;
export { ListingCard };

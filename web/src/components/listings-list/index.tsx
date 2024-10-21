"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Grid2X2, List } from "lucide-react";
import Image from "next/image";
import { PropiedadType } from "@/services/properties";
import { formatPrice } from "@/lib/utils";

interface ListingsListProps {
  listings: PropiedadType[];
}
export default function ListingsList({ listings }: ListingsListProps) {
  const [isGridView, setIsGridView] = useState(true);
  console.log(listings);
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Listado de Propiedades</h1>
        <Toggle
          aria-label="Toggle view"
          pressed={isGridView}
          onPressedChange={setIsGridView}
        >
          {isGridView ? (
            <Grid2X2 className="h-4 w-4" />
          ) : (
            <List className="h-4 w-4" />
          )}
        </Toggle>
      </div>
      <div
        className={`grid gap-6 ${
          isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }`}
      >
        {listings.map((listing) => (
          <Card key={listing.id} className={isGridView ? "" : "flex flex-row"}>
            <div className={`relative ${isGridView ? "h-48" : "h-full w-1/3"}`}>
              <Image
                src={listing.image_cover?.url ?? `/favicon.svg`}
                alt={listing.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className={isGridView ? "" : "w-2/3"}>
              <CardHeader>
                <CardTitle>{listing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {listing.price
                    ? formatPrice(listing.price, listing.currency)
                    : "Consultar precio"}
                </p>
                <p className="text-muted-foreground">
                  {listing.rooms} beds • {listing.bathrooms} baños •{" "}
                  {listing.built_surface} mt2
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href={`/detalle/${listing.documentId}`}
                  className="h-10 w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Ver Detalles
                </a>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

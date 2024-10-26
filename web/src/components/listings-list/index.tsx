"use client";

import { Toggle } from "@/components/ui/toggle";
import { PropiedadType } from "@/services/properties";
import { Grid2X2, List } from "lucide-react";
import { useState } from "react";
import ListingCard from "./listing-card";

interface ListingsListProps {
  listings: PropiedadType[];
}
export default function ListingsList({ listings }: ListingsListProps) {
  const [isGridView, setIsGridView] = useState(true);
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
          <ListingCard
            key={listing.id}
            listing={listing}
            isGridView={isGridView}
          />
        ))}
      </div>
    </div>
  );
}

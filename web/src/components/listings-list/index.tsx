"use client";

import { Toggle } from "@/components/ui/toggle";
import { Property } from "@/domain/property";
import { Grid2X2, List, SearchX, Home } from "lucide-react";
import { useState } from "react";
import ListingCard from "./listing-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ListingsListProps {
  listings: Property[];
  title?: string;
  showToggle?: boolean;
  showCount?: boolean;
  emptyState?: {
    title?: string;
    description?: string;
    showResetButton?: boolean;
    resetHref?: string;
  };
}

export default function ListingsList({ 
  listings, 
  title = "Listado de Propiedades",
  showToggle = true,
  showCount = true,
  emptyState = {
    title: "No se encontraron propiedades",
    description: "Intenta ajustar los filtros de búsqueda para ver más resultados.",
    showResetButton: true,
    resetHref: "/propiedades",
  }
}: ListingsListProps) {
  const [isGridView, setIsGridView] = useState(true);
  
  // Empty state
  if (listings.length === 0) {
    return (
      <div className="container mx-auto py-8">
        {showToggle && (
          <div className="mb-6">
            <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h1>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <SearchX className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">{emptyState.title}</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            {emptyState.description}
          </p>
          {emptyState.showResetButton && (
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href={emptyState.resetHref || "/propiedades"}>
                  <Home className="mr-2 h-4 w-4" />
                  Ver todas las propiedades
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className={`flex ${showToggle ? "justify-between" : "justify-start"} items-center mb-6`}>
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {showCount && (
            <p className="text-muted-foreground mt-1">
              {listings.length} {listings.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
            </p>
          )}
        </div>
        
        {showToggle && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {isGridView ? "Vista de cuadrícula" : "Vista de lista"}
            </span>
            <Toggle
              aria-label="Cambiar vista"
              pressed={isGridView}
              onPressedChange={setIsGridView}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {isGridView ? (
                <Grid2X2 className="h-4 w-4" />
              ) : (
                <List className="h-4 w-4" />
              )}
            </Toggle>
          </div>
        )}
      </div>
      
      {/* Grid */}
      <div
        className={`grid gap-6 ${
          isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-4xl"
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

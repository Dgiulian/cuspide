import { defineQuery } from "next-sanity";
import { cache } from "react";
import { client } from "@/sanity/client";
import {
  LISTING_FRAGMENT,
  getFetchOptions,
  CACHE_DURATION,
} from "@/infrastructure/sanity-helpers";
import {
  mapSanityListingsToProperties,
  SanityListing,
} from "./listing-mapper";
import type { Property } from "@/domain/property";

export interface SearchFilters {
  type?: string | null;
  operation?: "venta" | "alquiler" | null;
  location?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  city?: string | null;
  state?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  hasGarage?: boolean | null;
  featured?: boolean | null;
}

export const VALID_OPERATIONS = ["venta", "alquiler"] as const;
export const VALID_PROPERTY_TYPES = [
  "casa",
  "departamento",
  "duplex",
  "terreno",
  "local",
] as const;

/**
 * Strips characters that would break out of a GROQ string literal
 */
function escapeGroqValue(value: string): string {
  return value.replace(/['"\\]/g, "");
}

/**
 * Builds a GROQ filter string from search filters.
 * In Sanity, the listing's own `type` field holds the operation
 * (venta/alquiler); the property kind lives in `property->type`.
 */
function buildSearchFilter(filters: SearchFilters): string {
  const conditions: string[] = ["_type == 'listing'"];

  if (
    filters.type &&
    (VALID_PROPERTY_TYPES as readonly string[]).includes(filters.type)
  ) {
    conditions.push(`property->type == '${filters.type}'`);
  }

  if (
    filters.operation &&
    (VALID_OPERATIONS as readonly string[]).includes(filters.operation)
  ) {
    conditions.push(`type == '${filters.operation}'`);
  }

  if (filters.city) {
    conditions.push(`property->city == '${escapeGroqValue(filters.city)}'`);
  } else if (filters.location) {
    // Search in both city and state with partial matching
    const location = escapeGroqValue(filters.location);
    conditions.push(
      `(property->city match '*${location}*' || property->state match '*${location}*')`
    );
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    conditions.push(`price >= ${filters.minPrice}`);
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    conditions.push(`price <= ${filters.maxPrice}`);
  }

  if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
    conditions.push(`property->rooms >= ${filters.bedrooms}`);
  }

  if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
    conditions.push(`property->bathrooms >= ${filters.bathrooms}`);
  }

  if (filters.hasGarage !== null && filters.hasGarage !== undefined) {
    conditions.push(`property->garage == ${filters.hasGarage}`);
  }

  if (filters.featured !== null && filters.featured !== undefined) {
    conditions.push(`featured == ${filters.featured}`);
  }

  return conditions.join(" && ");
}

/**
 * Search listings with dynamic filters
 * Uses React.cache() for automatic request deduplication
 * Results cached for 30 seconds
 */
export const searchListings = cache(
  async (filters: SearchFilters = {}): Promise<Property[]> => {
    try {
      const filterString = buildSearchFilter(filters);

      const SEARCH_QUERY = defineQuery(`
        *[${filterString}] | order(featured desc, publishedAt desc)
        ${LISTING_FRAGMENT}
      `);

      const data = await client.fetch<SanityListing[]>(
        SEARCH_QUERY,
        {},
        getFetchOptions(CACHE_DURATION.SHORT, ["listings", "search"])
      );

      return mapSanityListingsToProperties(data);
    } catch (error) {
      console.error("Error searching listings:", error);
      return [];
    }
  }
);

/**
 * Get count of listings matching filters (without fetching full data)
 */
export const getListingsCount = cache(
  async (filters: SearchFilters = {}): Promise<number> => {
    try {
      const filterString = buildSearchFilter(filters);

      const COUNT_QUERY = defineQuery(`count(*[${filterString}])`);

      const count = await client.fetch<number>(
        COUNT_QUERY,
        {},
        getFetchOptions(CACHE_DURATION.SHORT, ["listings", "count"])
      );

      return count ?? 0;
    } catch (error) {
      console.error("Error counting listings:", error);
      return 0;
    }
  }
);

/**
 * Get related listings based on same type and location
 */
export const getRelatedListings = cache(
  async (
    currentSlug: string,
    type: string | null | undefined,
    city: string | null | undefined,
    limit: number = 3
  ): Promise<Property[]> => {
    try {
      if (!type || !city) return [];

      const RELATED_QUERY = defineQuery(`
        *[_type == "listing" 
          && slug.current != $currentSlug
          && property->type == $type
          && property->city == $city
        ] | order(featured desc, publishedAt desc) [0...${limit}]
        ${LISTING_FRAGMENT}
      `);

      const data = await client.fetch<SanityListing[]>(
        RELATED_QUERY,
        { currentSlug, type, city },
        getFetchOptions(CACHE_DURATION.MEDIUM, [
          "listings",
          `related-${currentSlug}`,
        ])
      );

      return mapSanityListingsToProperties(data);
    } catch (error) {
      console.error("Error fetching related listings:", error);
      return [];
    }
  }
);

/**
 * Get price range for filters (min/max prices available)
 */
export const getPriceRange = cache(async (): Promise<{ min: number; max: number }> => {
  try {
    const PRICE_RANGE_QUERY = defineQuery(`
      {
        "min": *[_type == "listing" && defined(price)] | order(price asc) [0].price,
        "max": *[_type == "listing" && defined(price)] | order(price desc) [0].price
      }
    `);

    const result = await client.fetch<{ min: number | null; max: number | null }>(
      PRICE_RANGE_QUERY,
      {},
      getFetchOptions(CACHE_DURATION.LONG, ["price-range"])
    );

    return {
      min: result?.min ?? 0,
      max: result?.max ?? 0,
    };
  } catch (error) {
    console.error("Error fetching price range:", error);
    return { min: 0, max: 0 };
  }
});

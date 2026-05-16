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

const ALL_LISTINGS_QUERY = defineQuery(`
  *[_type == "listing"] | order(featured desc, publishedAt desc)
  ${LISTING_FRAGMENT}
`);

/**
 * Fetch all listings with automatic deduplication via React.cache()
 * Cached for 30 seconds
 */
export const getAllListings = cache(
  async (): Promise<Property[]> => {
    try {
      const data = await client.fetch<SanityListing[]>(
        ALL_LISTINGS_QUERY,
        {},
        getFetchOptions(CACHE_DURATION.SHORT, ["listings", "all-listings"])
      );

      return mapSanityListingsToProperties(data);
    } catch (error) {
      console.error("Error fetching all listings:", error);
      return [];
    }
  }
);

const FEATURED_LISTINGS_QUERY = defineQuery(`
  *[_type == "listing" && featured == true] | order(publishedAt desc)
  ${LISTING_FRAGMENT}
`);

/**
 * Fetch featured listings only
 * Cached for 1 minute (stable data)
 */
export const getFeaturedProperties = cache(
  async (): Promise<Property[]> => {
    try {
      const data = await client.fetch<SanityListing[]>(
        FEATURED_LISTINGS_QUERY,
        {},
        getFetchOptions(CACHE_DURATION.MEDIUM, ["listings", "featured"])
      );

      return mapSanityListingsToProperties(data);
    } catch (error) {
      console.error("Error fetching featured listings:", error);
      return [];
    }
  }
);

const LISTING_BY_SLUG_QUERY = defineQuery(`
  *[_type == "listing" && slug.current == $slug][0]
  ${LISTING_FRAGMENT}
`);

/**
 * Fetch a single listing by slug
 * Uses React.cache() for deduplication within the same request
 * Cached for 30 seconds
 */
export const getListingBySlug = cache(
  async (slug: string): Promise<Property | null> => {
    if (!slug) return null;

    try {
      const data = await client.fetch<SanityListing>(
        LISTING_BY_SLUG_QUERY,
        { slug },
        getFetchOptions(CACHE_DURATION.SHORT, [`listing-${slug}`])
      );

      if (!data) return null;

      const properties = mapSanityListingsToProperties([data]);
      return properties[0] ?? null;
    } catch (error) {
      console.error(`Error fetching listing by slug "${slug}":`, error);
      return null;
    }
  }
);

const LOCATIONS_QUERY = defineQuery(`
  *[_type == "property" && defined(city) && defined(state)] {
    city,
    state
  }
`);

export interface Location {
  city: string;
  state: string;
}

/**
 * Fetch unique locations (city/state pairs)
 * Cached for 1 hour (very stable data)
 */
export const getUniqueLocations = cache(async (): Promise<Location[]> => {
  try {
    const data = await client.fetch<{ city: string; state: string }[]>(
      LOCATIONS_QUERY,
      {},
      getFetchOptions(CACHE_DURATION.VERY_LONG, ["locations"])
    );

    if (!data) return [];

    // Create unique combinations and sort
    const uniqueLocations = new Map<string, Location>();

    for (const item of data) {
      if (item.city && item.state) {
        const key = `${item.city}-${item.state}`;
        if (!uniqueLocations.has(key)) {
          uniqueLocations.set(key, { city: item.city, state: item.state });
        }
      }
    }

    return Array.from(uniqueLocations.values()).sort((a, b) =>
      a.city.localeCompare(b.city)
    );
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
});

const CITIES_QUERY = defineQuery(`
  *[_type == "property" && defined(city)].city
`);

/**
 * Fetch unique cities only
 * Cached for 1 hour
 */
export const getUniqueCities = cache(async (): Promise<string[]> => {
  try {
    const cities = await client.fetch<string[]>(
      CITIES_QUERY,
      {},
      getFetchOptions(CACHE_DURATION.VERY_LONG, ["cities"])
    );

    if (!cities) return [];

    // Remove duplicates and sort
    return [...new Set(cities)].filter(Boolean).sort();
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
});

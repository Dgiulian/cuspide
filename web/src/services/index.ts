/**
 * Listings Services
 * 
 * This module provides optimized fetching functions for property listings from Sanity CMS.
 * All functions use React.cache() for automatic request deduplication within the same render.
 * 
 * Cache durations:
 * - SHORT (30s): Frequently changing data (listings, search results)
 * - MEDIUM (60s): Semi-stable data (featured listings)
 * - LONG (300s): Stable data (price ranges)
 * - VERY_LONG (3600s): Rarely changing data (locations, cities)
 */

export {
  getAllListings,
  getFeaturedProperties,
  getListingBySlug,
  getUniqueLocations,
  getUniqueCities,
  type Location,
} from "./listings";

export {
  searchListings,
  getListingsCount,
  getRelatedListings,
  getPriceRange,
  type SearchFilters,
} from "./listing-search";

// Backwards compatibility - re-export old function names
export { getAllListings as getAllListingsLegacy } from "./get-all-listings";
export { getFeaturedProperties as getFeaturedPropertiesLegacy } from "./get-featured-properties";
export { getListingBySlug as getListingBySlugLegacy } from "./get-listing-by-slug";
export { searchListings as searchListingsLegacy, getUniqueLocations as getUniqueLocationsLegacy } from "./search-listings";

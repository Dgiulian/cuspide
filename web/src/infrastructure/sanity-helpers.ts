import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./sanity";

/**
 * Image URL builder for Sanity images
 */
export const urlFor = (source: SanityImageSource | null | undefined) => {
  if (!source || !projectId || !dataset) return null;
  return imageUrlBuilder({ projectId, dataset }).image(source);
};

/**
 * Get image URL from Sanity image source
 */
export function getImageUrl(
  source: SanityImageSource | null | undefined,
  options?: { width?: number; height?: number; quality?: number }
): string | null {
  if (!source) return null;

  let builder = urlFor(source);
  if (!builder) return null;

  if (options?.width) builder = builder.width(options.width);
  if (options?.height) builder = builder.height(options.height);
  if (options?.quality) builder = builder.quality(options.quality);

  return builder.url();
}

/**
 * Shared GROQ fragment for listing fields
 * This ensures consistency across all listing queries
 */
export const LISTING_FRAGMENT = `{
  _id,
  title,
  price,
  currency,
  slug,
  featured,
  status,
  publishedAt,
  "operation": type,
  property-> {
    _id,
    title,
    type,
    description,
    rooms,
    bathrooms,
    lot_size,
    garage,
    slug,
    publishedAt,
    image_cover,
    images,
    location,
    city,
    state,
    address,
    amenities
  }
}`;

/**
 * Cache duration constants (in seconds)
 */
export const CACHE_DURATION = {
  SHORT: 30, // 30 seconds - for frequently changing data
  MEDIUM: 60, // 1 minute
  LONG: 300, // 5 minutes - for stable data
  VERY_LONG: 3600, // 1 hour - for rarely changing data like locations
} as const;

/**
 * Default fetch options for Sanity queries
 */
export function getFetchOptions(
  revalidate: number = CACHE_DURATION.SHORT,
  tags?: string[]
) {
  return {
    next: {
      revalidate,
      tags: tags ?? ["listings"],
    },
  };
}

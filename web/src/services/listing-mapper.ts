import { Property } from "@/domain/property";
import { getImageUrl } from "@/infrastructure/sanity-helpers";

/**
 * Raw Sanity listing data structure
 */
export interface SanityListing {
  _id: string;
  title: string | null;
  price: number | null;
  currency: "ars" | "usd" | null;
  slug: { current: string } | null;
  featured: boolean | null;
  status: "disponible" | "no_disponible" | "vendida" | "reservada" | null;
  publishedAt?: string;
  property?: {
    _id: string;
    title: string | null;
    type: Property["type"];
    description: Property["description"];
    rooms: number | null;
    bathrooms: number | null;
    lot_size: number | null;
    garage: boolean | null;
    slug: { current: string } | null;
    publishedAt?: string;
    image_cover: unknown;
    images: unknown[];
    location: Property["location"];
    city: string | null;
    state: string | null;
    address?: string | null;
    amenities?: string[];
  } | null;
}

/**
 * Maps Sanity listing data to our Property domain model
 */
export function mapSanityListingToProperty(
  data: SanityListing | null | undefined
): Property | null {
  if (!data) return null;

  const property = data.property;

  // Parse images with error handling
  const parsedImages: string[] = [];
  if (property?.images && Array.isArray(property.images)) {
    for (const img of property.images) {
      try {
        const url = getImageUrl(img);
        if (url) parsedImages.push(url);
      } catch {
        // Skip invalid images
        continue;
      }
    }
  }

  return {
    id: data._id,
    title: data.title,
    slug: data.slug?.current,
    price: data.price,
    currency: data.currency,
    featured: data.featured,
    status: data.status,
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
    // Property details
    type: property?.type,
    description: property?.description,
    rooms: property?.rooms,
    bathrooms: property?.bathrooms,
    lot_size: property?.lot_size,
    garage: property?.garage,
    location: property?.location,
    city: property?.city,
    state: property?.state,
    image_cover: getImageUrl(property?.image_cover),
    images: parsedImages.length > 0 ? parsedImages : [],
  };
}

/**
 * Maps an array of Sanity listings to Property array
 */
export function mapSanityListingsToProperties(
  data: SanityListing[] | null | undefined
): Property[] {
  if (!data || !Array.isArray(data)) return [];

  return data
    .map(mapSanityListingToProperty)
    .filter((p): p is Property => p !== null);
}

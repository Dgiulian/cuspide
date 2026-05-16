import { Property } from "@/domain/property";
import { dataset, fetchCollection, projectId } from "@/infrastructure/sanity";
import { ALL_LISTINGS_QUERYResult } from "@/sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, type SanityDocument } from "next-sanity";

const options = { next: { revalidate: 30 } };

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export interface SearchFilters {
  type?: string | null;
  operation?: "venta" | "alquiler" | null;
  location?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export async function searchListings(filters: SearchFilters = {}): Promise<Property[] | null> {
  const { type, location, minPrice, maxPrice } = filters;
  
  // Build dynamic query based on filters
  let filterConditions = ["_type == 'listing'"];
  
  if (type) {
    filterConditions.push(`property->type == '${type}'`);
  }
  
  if (minPrice !== null && minPrice !== undefined) {
    filterConditions.push(`price >= ${minPrice}`);
  }
  
  if (maxPrice !== null && maxPrice !== undefined) {
    filterConditions.push(`price <= ${maxPrice}`);
  }
  
  if (location) {
    filterConditions.push(`(property->city match '*${location}*' || property->state match '*${location}*')`);
  }
  
  const filterString = filterConditions.join(" && ");
  
  const SEARCH_QUERY = defineQuery(`*[${filterString}]|order(featured, publishedAt desc)
    { _id, 
     title, 
     price,
     currency,
     slug,
     featured,
     status,
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
        }
      }`);

  const sanityData = await fetchCollection<
    SanityDocument<ALL_LISTINGS_QUERYResult>
  >({
    query: SEARCH_QUERY,
    options,
  });

  if (!sanityData) {
    return null;
  }

  const listings: Property[] = sanityData.map((d) => ({
    id: d._id,
    slug: d.slug?.current,
    images: [],
    title: d.title,
    type: d.property?.type,
    rooms: d.property?.rooms,
    garage: d.property?.garage,
    location: null,
    description: d.property?.description,
    bathrooms: d.property?.bathrooms,
    lot_size: d.property?.lot_size,
    image_cover: d.property?.image_cover
      ? urlFor(d.property.image_cover)?.url()
      : null,
    city: d.property?.city,
    state: d.property?.state,
    price: d.price,
    currency: d.currency,
    featured: d.featured,
    status: d.status,
  }));

  return listings;
}

// Get unique cities for location filter
export async function getUniqueLocations(): Promise<string[]> {
  const LOCATIONS_QUERY = defineQuery(`*[_type == "property" && defined(city)].city`);
  
  const cities = await fetchCollection<string[]>({
    query: LOCATIONS_QUERY,
    options,
  });
  
  if (!cities) return [];
  
  // Remove duplicates and sort
  return [...new Set(cities)].filter(Boolean).sort();
}

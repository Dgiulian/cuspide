import { Property } from "@/domain/property";
import { type SanityDocument } from "next-sanity";
const options = { next: { revalidate: 30 } };
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset, fetchCollection } from "@/infrastructure/sanity";

export interface SanityListing {
  _id: string;
  title: string;
  price: number;
  currency: "ARS" | "USD";
  property: SanityProperty;
}

export interface SanityProperty {
  title: string;
  type: string;
  rooms: number;
  garage: boolean;
  slug: { current: string; _type: "slug" };
  images: SanityImage;
  location: null;
  _id: string;
  description: null;
  bathrooms: number;
  lot_size: number;
  publishedAt: Date;
  image_cover: SanityImage;
  city: string;
  state: string;
}

export interface SanityImage {
  _type: string;
  _key: string;
  asset: SanityAsset;
}

export interface SanityAsset {
  _ref: string;
  _type: string;
}

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function getFeaturedProperties(): Promise<Property[]> {
  const FEATURED_PROPERTIES_QUERY = `*[
    _type == "listing" && featured == true
  ]|order(publishedAt desc)[0...12]
  { _id, 
   title, 
   price,
   currency,
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
      price,
      currency
      }
    }`;

  const sanityData = await fetchCollection<SanityDocument<SanityListing>>({
    query: FEATURED_PROPERTIES_QUERY,
    options,
  });
  const featuredProperties: Property[] = sanityData.map((d) => ({
    id: d._id,
    slug: d.property.slug.current,
    images: [],
    title: d.title,
    type: d.property.type,
    rooms: d.property.rooms,
    garage: d.property.garage,
    location: null,
    description: d.property.description,
    bathrooms: d.property.bathrooms,
    lot_size: d.property.lot_size,
    //   images: SanityImage;
    //   publishedAt: Date;
    image_cover: urlFor(d.property.image_cover)?.url() ?? null,
    city: d.property.city,
    state: d.property.state,
    price: d.price,
    currency: d.currency,
  }));

  return featuredProperties;
}

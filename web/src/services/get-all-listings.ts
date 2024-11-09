import { Property } from "@/domain/property";
import { type SanityDocument } from "next-sanity";
const options = { next: { revalidate: 30 } };
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  projectId,
  dataset,
  fetchCollection,
  SanityListing,
} from "@/infrastructure/sanity";

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function getAllListings(): Promise<Property[]> {
  const FEATURED_PROPERTIES_QUERY = `*[
    _type == "listing"
  ]|order(publishedAt desc)[0...12]
  { _id, 
   title, 
   price,
   currency,
   slug,
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
  const allListings: Property[] = sanityData.map((d) => ({
    id: d._id,
    slug: d.slug.current,
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

  return allListings;
}

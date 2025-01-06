import { Property } from "@/domain/property";
import { defineQuery, type SanityDocument } from "next-sanity";
const options = { next: { revalidate: 30 } };
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset, fetchCollection } from "@/infrastructure/sanity";
import { FEATURED_PROPERTIES_QUERYResult } from "@/sanity/types";

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function getFeaturedProperties(): Promise<Property[] | null> {
  const FEATURED_PROPERTIES_QUERY = defineQuery(`*[
    _type == "listing" && featured == true
  ]|order(publishedAt desc)
  { _id, 
   title, 
   price,
   currency,
   slug,
   featured,
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
    }`);

  const sanityData = await fetchCollection<
    SanityDocument<FEATURED_PROPERTIES_QUERYResult>
  >({
    query: FEATURED_PROPERTIES_QUERY,
    options,
  });
  if (!sanityData) {
    return null;
  }
  const featuredProperties: Property[] = sanityData.map((d) => ({
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
    //   images: SanityImage;
    //   publishedAt: Date;
    image_cover: d.property?.image_cover
      ? urlFor(d.property.image_cover)?.url()
      : null,
    city: d.property?.city,
    state: d.property?.state,
    price: d.price,
    currency: d.currency,
    featured: d.featured,
  }));

  return featuredProperties;
}

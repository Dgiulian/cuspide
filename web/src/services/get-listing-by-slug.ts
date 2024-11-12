import { Property } from "@/domain/property";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery } from "next-sanity";

import { dataset, fetchCollection, projectId } from "@/infrastructure/sanity";
import { LISTING_BY_SLUG_QUERYResult } from "@/sanity/types";
const options = { next: { revalidate: 30 } };
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export async function getListingBySlug(slug: string): Promise<Property | null> {
  const LISTING_BY_SLUG_QUERY =
    defineQuery(`*[_type == "listing" && slug.current == $slug][0]
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
      publishedAt,
      image_cover,
      images,
      location,
      city,
      state,
      price,
      currency,
      }
    }`);

  const sanityData = await fetchCollection<LISTING_BY_SLUG_QUERYResult>({
    query: LISTING_BY_SLUG_QUERY,
    params: { slug },
    options,
  });

  if (!sanityData) {
    return null;
  }

  const d = sanityData;
  const propertyImages: string[] =
    d.property?.images?.map((img) => urlFor(img)?.url() ?? "") ?? [];
  const listingDetail: Property = {
    id: d._id,
    slug: d.slug?.current,
    images: propertyImages,
    title: d.title,
    type: d.property?.type,
    rooms: d.property?.rooms,
    garage: d.property?.garage,
    location: d.property?.location,
    description: d.property?.description,
    bathrooms: d.property?.bathrooms,
    lot_size: d.property?.lot_size,
    //   images: SanityImage;
    //   publishedAt: Date;
    image_cover: d.property?.image_cover
      ? urlFor(d.property?.image_cover)?.url()
      : null,
    city: d.property?.city,
    state: d.property?.state,
    price: d.price,
    currency: d.currency,
  };

  return listingDetail;
}

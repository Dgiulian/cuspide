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

export async function getListingBySlug(slug: string): Promise<Property | null> {
  const LISTING_BY_SLUG_QUERY = `*[_type == "listing" && slug.current == $slug] | order(publishedAt desc)[0...12]
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
      currency
      }
    }`;

  const sanityData = await fetchCollection<SanityDocument<SanityListing>>({
    query: LISTING_BY_SLUG_QUERY,
    params: { slug },
    options,
  });

  console.log({ sanityData, slug, LISTING_BY_SLUG_QUERY });

  if (!sanityData.length) {
    return null;
  }

  const d = sanityData[0];
  const listingDetail: Property = {
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
  };

  return listingDetail;
}

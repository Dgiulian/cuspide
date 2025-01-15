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

const ALL_LISTINGS_QUERY = defineQuery(`*[
      _type == "listing"
    ]|order(featured, publishedAt desc)
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

export async function getAllListings(): Promise<Property[] | null> {
  const sanityData = await fetchCollection<
    SanityDocument<ALL_LISTINGS_QUERYResult>
  >({
    query: ALL_LISTINGS_QUERY,
    options,
  });

  if (!sanityData) {
    return null;
  }

  const allListings: Property[] = sanityData.map((d) => ({
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
    status: d.status,
  }));

  return allListings;
}

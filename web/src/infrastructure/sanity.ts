import { client } from "@/sanity/client";
import { FilteredResponseQueryOptions } from "next-sanity";

export const { projectId, dataset } = client.config();
export { client };

type FetchCollectionOptions = {
  type?: string; // Type of the document in Sanity schema, e.g., 'post' or 'product'
  fields?: string[]; // Specify fields to include, e.g., ['title', 'slug']
  limit?: number; // Number of documents to fetch
  sortBy?: string; // Field to sort by, e.g., '_createdAt'
  order?: "asc" | "desc"; // Sort order
  query?: string; // Custom GROQ query string,+
  options?: FilteredResponseQueryOptions;
  params?: Record<string, string>;
};

export async function fetchCollection<T = unknown>({
  type,
  fields,
  limit,
  sortBy = "_createdAt",
  order = "asc",
  query,
  options,
  params = {},
}: FetchCollectionOptions): Promise<T[]> {
  // Use the custom query if provided, otherwise construct one based on options
  const defaultFieldString = fields ? fields.join(", ") : "*";
  const defaultQuery = `*[_type == "${type}"] | order(${sortBy} ${order}) [0...${limit ?? ""}] { ${defaultFieldString} }`;
  const finalQuery = query ?? defaultQuery;

  try {
    const data = await client.fetch<T[]>(finalQuery, params, options);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
}

export interface SanityListing {
  _id: string;
  title: string;
  price: number;
  currency: "ARS" | "USD";
  property: SanityProperty;
  slug: { current: string; _type: "slug" };
}

export interface SanityProperty {
  title: string;
  type: string;
  rooms: number;
  garage: boolean;
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

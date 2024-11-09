import fetchApi from "@/lib/strapi";
import { BlocksContent } from "@strapi/blocks-react-renderer";

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface Formats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export type PropiedadType = {
  id: string;
  slug: string;
  // documentId: string;
  title: string;
  description: null | string | BlocksContent;
  // address: string;
  // addressNum: string;
  city?: string;
  state?: string;
  price: number;
  currency: "USD" | "ARS";
  // highlight: boolean;
  rooms: number;
  bathrooms: number;
  lot_size?: number;
  built_surface?: number;
  images: string[] | StrapiImage[];
  image_cover: string | StrapiImage | null;
  agente?: AgenteType;
};

type AgenteType = {
  id: number;
  documentId: string;
  name: string;
  email: string;
  phone: string;
  avatar: StrapiImage;
};

export async function getListedProperties(): Promise<PropiedadType[]> {
  const res = await fetchApi<PropiedadType[]>({
    endpoint: "properties",
    query: {
      populate: ["agente", "image_cover"],
    },
    wrappedByKey: "data",
  });
  return res;
}

export async function getFeaturedProperties(): Promise<PropiedadType[]> {
  const res = await fetchApi<PropiedadType[]>({
    endpoint: "properties",
    query: {
      "filters[featured][$neq]": "false",
      "pagination[page]": "1",
      "pagination[pageSize]": "3",
      populate: "image_cover",
    },
    wrappedByKey: "data",
  });
  return res;
}
export async function getPropertyByDocumentId(
  documentId: string
): Promise<PropiedadType> {
  const res = await fetchApi<PropiedadType>({
    endpoint: `properties/${documentId}`,
    query: { populate: ["images", "agente"] },

    wrappedByKey: "data",
  });
  return res;
}

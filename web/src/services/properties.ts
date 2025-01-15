import { Geopoint, TypeOfProperty } from "@/domain/property";
import fetchApi from "@/lib/strapi";

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
  slug?: string | null;
  title: string | null;
  description?: BlockArrayContent | null;
  city?: string | null;
  state?: string | null;
  price?: number | null;
  currency?: "ars" | "usd" | null;
  rooms?: number | null;
  bathrooms?: number | null;
  lot_size?: number | null;
  built_surface?: number;
  images?: string[] | StrapiImage[] | null;
  image_cover?: string | StrapiImage | null;
  agente?: AgenteType;
  location?: Geopoint | null;
  featured?: boolean | null;
  type?: TypeOfProperty | null;
  status?: "disponible" | "no_disponible" | "vendida" | "reservada" | null;
};

type BlockArrayContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
  listItem?: "bullet" | "number";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
}> | null;

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

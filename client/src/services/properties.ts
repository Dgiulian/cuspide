import { type BlocksContent } from "@strapi/blocks-react-renderer";
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
  documentId: string;
  title: string;
  description: string | BlocksContent;
  address: string;
  addressNum: string;
  city?: string;
  state?: string;
  price: string;
  currency: "US" | "ARS";
  highlight: boolean;
  rooms: number;
  bathrooms: number;
  land_surface: number;
  built_surface: number;
  images: StrapiImage[];
};

type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export async function getListedProperties(): Promise<PropiedadType[]> {
  const res = await fetch(
    `${import.meta.env.STRAPI_URL}/api/properties&populate=images`
  );
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}

export async function getFeaturedProperties(): Promise<PropiedadType[]> {
  const res = await fetch(
    `${
      import.meta.env.STRAPI_URL
    }/api/properties?filters[featured][$eq]=true&pagination[page]=1&pagination[pageSize]=3&populate=images`
  );
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}
export async function getPropertyByDocumentId(
  documentId: string
): Promise<PropiedadType> {
  const res = await fetch(
    `${import.meta.env.STRAPI_URL}/api/properties/${documentId}?populate=images`
  );
  const parsedResponse: StrapiResponse<PropiedadType> = await res.json();
  return parsedResponse.data;
}

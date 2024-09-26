import { type BlocksContent } from "@strapi/blocks-react-renderer";
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
  const res = await fetch(`${import.meta.env.STRAPI_URL}/api/properties`);
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}

export async function getFeaturedProperties(): Promise<PropiedadType[]> {
  const res = await fetch(
    `${
      import.meta.env.STRAPI_URL
    }/api/properties?filters[featured][$eq]=true&pagination[page]=1&pagination[pageSize]=3`
  );
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}
export async function getPropertyByDocumentId(
  documentId: string
): Promise<PropiedadType> {
  const res = await fetch(
    `${import.meta.env.STRAPI_URL}/api/properties/${documentId}`
  );
  const parsedResponse: StrapiResponse<PropiedadType> = await res.json();
  return parsedResponse.data;
}

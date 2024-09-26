type PropiedadType = {
  id: string;
  title: string;
  description: string;
  address: string;
  addressNum: string;
  city?: string;
  state?: string;
  price: string;
  currency: "US" | "ARS";
  highlight: boolean;
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

export async function getFeaturedProperties() {
  const res = await fetch(
    `${
      import.meta.env.STRAPI_URL
    }/api/properties?filters[featured][$eq]=true&pagination[page]=1&pagination[pageSize]=3`
  );
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}

export async function getListedProperties() {
  const res = await fetch(
    `${import.meta.env.STRAPI_URL}/api/properties?sort=createdAt`
  );
  const parsedResponse: StrapiResponse<PropiedadType[]> = await res.json();
  return parsedResponse.data;
}

export interface Property {
  id: string;
  title: string | null;
  type?: TypeOfProperty;
  rooms?: number | null;
  garage?: boolean | null;
  slug?: string;
  images?: string[];
  location?: Geopoint | null;
  description?: unknown;
  bathrooms?: number | null;
  lot_size?: number | null;
  publishedAt?: Date;
  image_cover?: string | null;
  city?: string | null;
  state?: string | null;
  price?: number | null;
  currency?: "ars" | "usd" | null;
}

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type TypeOfProperty =
  | "local"
  | "casa"
  | "departamento"
  | "duplex"
  | "terreno"
  | null;
export interface SanityImage {
  _type: string;
  _key: string;
  asset: SanityAsset;
}

export interface SanityAsset {
  _ref: string;
  _type: string;
}

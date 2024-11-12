export interface Property {
  id: string;
  title: string | null;
  type?: TypeOfProperty;
  rooms?: number | null;
  garage?: boolean | null;
  slug?: string;
  images?: string[] | null;
  location?: Geopoint | null;
  description?: BlockArrayContent | null;
  bathrooms?: number | null;
  lot_size?: number | null;
  publishedAt?: Date;
  image_cover?: string | null;
  city?: string | null;
  state?: string | null;
  price?: number | null;
  currency?: "ars" | "usd" | null;
}

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

export interface Property {
  id: string;
  title: string;
  type: string;
  rooms: number;
  garage: boolean;
  slug: string;
  images: string[];
  location?: null;
  description: null;
  bathrooms: number;
  lot_size?: number;
  publishedAt?: Date;
  image_cover: string | null;
  city: string;
  state: string;
  price: number;
  currency: "ARS" | "USD";
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

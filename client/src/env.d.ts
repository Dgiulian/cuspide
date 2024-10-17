/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly MAPBOX_ACCESS_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

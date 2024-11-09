import { createClient } from "next-sanity";
import { env } from "@/env";

export const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

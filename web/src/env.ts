import { z } from "zod";

const envSchema = z.object({
  MAILGUN_API_KEY: z.string(),
  SANITY_PROJECT_ID: z.string(),
  SANITY_DATASET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables!", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;

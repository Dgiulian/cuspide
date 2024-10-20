import { z } from "zod";

const envSchema = z.object({
  STRAPI_URL: z.string().url(),
  MAILGUN_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);
console.log(parsedEnv);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables!", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;

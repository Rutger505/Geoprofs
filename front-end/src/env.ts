import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    BACKEND_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    TEST_ENV: z.coerce.boolean().optional().default(false),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    TEST_ENV: process.env.TEST_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

import "server-only";

import { z } from "zod";

const envSchema = z.object({
	UPLOADTHING_TOKEN: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/**
 * Parses `process.env` once on first use. Lazy so `next build` and CI do not
 * fail for routes that never touch the page store.
 */
export function getEnv(): Env {
	cached ??= envSchema.parse(process.env);
	return cached;
}

import * as z from "zod/mini";

/** A bookmarked page: the chapter slug and the 1-based page number in it. */
export const bookmarkSchema = z.object({
	slug: z.string().check(z.minLength(1)),
	page: z.int().check(z.positive()),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;

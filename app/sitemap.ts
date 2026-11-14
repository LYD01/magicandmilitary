import type { MetadataRoute } from "next";

import { SITE_URL } from "@constants";
import { getPublishedChapters } from "@/lib/publishedChapters";

/** Keep in sync with every public route; see `project-context` rule. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const chapters = await getPublishedChapters();

	return [
		{ url: SITE_URL, changeFrequency: "weekly", priority: 1 },
		...chapters.map(({ slug }) => ({
			url: `${SITE_URL}/${slug}`,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}

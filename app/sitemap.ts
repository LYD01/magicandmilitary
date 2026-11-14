import type { MetadataRoute } from "next";

import { PLACEHOLDER_CHAPTERS, SITE_URL } from "@constants";

/** Keep in sync with every public route; see `project-context` rule. */
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: SITE_URL, changeFrequency: "weekly", priority: 1 },
		...PLACEHOLDER_CHAPTERS.map(({ slug }) => ({
			url: `${SITE_URL}/${slug}`,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}

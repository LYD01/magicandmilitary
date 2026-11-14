import "server-only";

import { CHAPTERS } from "@constants";

import { z } from "zod";

/**
 * Server-only page manifest. Do NOT export this through a barrel: file keys
 * must never reach a client bundle (`TitleHero` imports the `@constants` barrel).
 *
 * To add a page: upload the web copy in the UploadThing dashboard, generate an
 * id with `node -e "console.log(crypto.randomUUID())"`, paste the file key, and
 * bump `pageCount` for the chapter in `app/_constants/chapters.ts`.
 */
const RAW_MANIFEST: unknown = {};

export const PAGE_IMAGE_PATH = "/api/pages";

const manifestSchema = z.record(
	z.string(),
	z.object({
		/** Default width / height for every page in the chapter. */
		aspectRatio: z.number().positive(),
		pages: z.array(
			z.object({
				id: z.uuid(),
				fileKey: z.string().min(1),
				alt: z.string().min(1).optional(),
				aspectRatio: z.number().positive().optional(),
			}),
		),
	}),
);

export type PageImage = {
	src: string;
	alt: string;
	aspectRatio: number;
};

function load() {
	const manifest = manifestSchema.parse(RAW_MANIFEST);
	const chapterSlugs = new Set(CHAPTERS.map((chapter) => chapter.slug));
	const pagesById = new Map<string, { chapterSlug: string; fileKey: string }>();

	for (const [slug, chapter] of Object.entries(manifest)) {
		if (!chapterSlugs.has(slug)) {
			throw new Error(`Manifest chapter "${slug}" is not in CHAPTERS`);
		}
		for (const page of chapter.pages) {
			if (pagesById.has(page.id)) {
				throw new Error(`Duplicate page id "${page.id}" in manifest`);
			}
			pagesById.set(page.id, { chapterSlug: slug, fileKey: page.fileKey });
		}
	}

	for (const chapter of CHAPTERS) {
		const actual = manifest[chapter.slug]?.pages.length ?? 0;
		if (actual !== chapter.pageCount) {
			throw new Error(
				`"${chapter.slug}" declares pageCount ${chapter.pageCount} but the manifest has ${actual}`,
			);
		}
	}

	return { manifest, pagesById };
}

const { manifest, pagesById } = load();

export function getChapterPages(slug: string): PageImage[] {
	const chapter = CHAPTERS.find((entry) => entry.slug === slug);
	const entry = manifest[slug];
	if (!chapter || !entry) {
		return [];
	}
	return entry.pages.map((page, index) => ({
		src: `${PAGE_IMAGE_PATH}/${page.id}`,
		alt: page.alt ?? `${chapter.label}, page ${index + 1}`,
		aspectRatio: page.aspectRatio ?? entry.aspectRatio,
	}));
}

export function findPage(
	id: string,
): { chapterSlug: string; fileKey: string } | undefined {
	return pagesById.get(id);
}

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
const RAW_MANIFEST: unknown = {
	"chapter-1": {
		aspectRatio: 1600 / 894,
		pages: [
			{
				id: "c0a8101f-07fd-49f5-984e-aa963a2e127d",
				fileKey: "0x63sKHQ1DjzeynrgPyJvZduCfHt4gm20wJOKqxRcXN9irLa",
			},
			{
				id: "fce9d40e-a36f-4e21-ab8e-147dbca9e55b",
				fileKey: "0x63sKHQ1DjzuDjYDBbjn3tpDQ5FZWkTu7irw812UfcRg9bz",
			},
			{
				id: "56df181a-8f37-4f0f-9549-9671914ef704",
				fileKey: "0x63sKHQ1Djz9lCKUTr2uXcTDA6InpCyPLrlYMxmZs5ghVBG",
			},
			{
				id: "25a06d6a-2c71-4a3d-b2cc-f1f1ee2e1b22",
				fileKey: "0x63sKHQ1DjzOFb5pCoSo2QvlRmhaxpCTkYSIzB6d1wZrUyc",
			},
			{
				id: "849e4aed-2f6f-45d5-8963-1da3f5f50c0a",
				fileKey: "0x63sKHQ1DjzNqeXg5RB45v9IRp2dFMG1bTZJxewSDKWX3hy",
			},
			{
				id: "fac1a1b2-9bc5-4908-99eb-b5393d2315c4",
				fileKey: "0x63sKHQ1DjzgBYj0hu5elUjA39vzxnCWXDK2T4qm8gsro6i",
			},
			{
				id: "da515e35-d366-4f8c-8b23-8e0689b33809",
				fileKey: "0x63sKHQ1Djz7xjOoPaeYdCvIpVD3MKOmJosS2LBxj6F9rQi",
			},
			{
				id: "cb24ad28-468e-4a45-b15d-16edd484455b",
				fileKey: "0x63sKHQ1Djze5mVYiJvZduCfHt4gm20wJOKqxRcXN9irLaT",
				aspectRatio: 1600 / 2143,
			},
			{
				id: "0a8bc3b4-ba84-42bd-aeb8-2db143328a6b",
				fileKey: "0x63sKHQ1Djz4d2DGwP8apTVq3FSMZ7svf02QJ6KHDwAL1io",
			},
			{
				id: "8c34263d-0107-4502-b350-8675f906f4e4",
				fileKey: "0x63sKHQ1DjztrDTogdkTh9QLiarNbJRKSCje8syUdXBZDqP",
			},
			{
				id: "c1c91c72-89dc-4213-b57d-5d6acb826863",
				fileKey: "0x63sKHQ1DjzkXDJkqxtUI7e8hL2f3NBlOSjxwaEVHFvRXYs",
			},
			{
				id: "180ae16b-3a5c-4e80-b165-740c5e2b34e4",
				fileKey: "0x63sKHQ1Djz9Y7LmJYr2uXcTDA6InpCyPLrlYMxmZs5ghVB",
			},
			{
				id: "c2b759f2-ab43-4590-86fc-569c31f9d3f9",
				fileKey: "0x63sKHQ1DjzSzXaZuV4We2izZBTRfMJy8DgpuY6mN703lah",
			},
			{
				id: "cc7f925e-bbcd-47ea-b4cb-51c4cdce228c",
				fileKey: "0x63sKHQ1DjzR9a0FMkX0paUS9wA7BFdjnsv3Yciz5VHMIG1",
			},
			{
				id: "644da093-f297-40d7-acc4-d02879e91e42",
				fileKey: "0x63sKHQ1DjzIOyRpv5t3BM9QbKyCnqvlY1DLciJkVA74fNr",
			},
		],
	},
};

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

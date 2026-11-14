/**
 * Public chapter data. Safe for client bundles (this folder is behind the
 * `@constants` barrel), so it must never contain UploadThing file keys.
 * Page files live in the server-only manifest at `lib/chapterManifest.ts`.
 */

export type Chapter = {
	slug: string;
	label: string;
	/** Must equal the number of pages in `lib/chapterManifest.ts` (checked at load). */
	pageCount: number;
	/** ISO date. The chapter is hidden everywhere until this moment has passed. */
	publishedAt: string;
};

export const CHAPTERS: Chapter[] = [
	{
		slug: "chapter-1",
		label: "Chapter 1: A journey west",
		pageCount: 20,
		publishedAt: "2026-01-01T00:00:00Z",
	},
	{
		slug: "chapter-2",
		label: "Chapter 2",
		pageCount: 0,
		publishedAt: "2099-01-01T00:00:00Z",
	},
];

import "server-only";

import { cacheLife } from "next/cache";

import { CHAPTERS, type Chapter } from "@constants";

/**
 * True when `publishedAt` is at or before `at`.
 * Callers pass an explicit instant. Cache Components reject `Date.now()` during
 * prerender, so that clock read stays inside `getPublishedChapters`.
 */
export function isChapterPublished(
	chapter: Chapter,
	at: number | Date,
): boolean {
	const when = at instanceof Date ? at.getTime() : at;
	return Date.parse(chapter.publishedAt) <= when;
}

/**
 * Chapters whose `publishedAt` has passed. The clock read lives inside a cached
 * scope (required by Cache Components); it refreshes hourly, so a scheduled
 * chapter appears within an hour of its publish time.
 */
export async function getPublishedChapters(): Promise<Chapter[]> {
	"use cache";
	cacheLife("hours");

	const now = Date.now();
	return CHAPTERS.filter((chapter) => isChapterPublished(chapter, now));
}

export async function getPublishedChapter(
	slug: string,
): Promise<Chapter | undefined> {
	const chapters = await getPublishedChapters();
	return chapters.find((chapter) => chapter.slug === slug);
}

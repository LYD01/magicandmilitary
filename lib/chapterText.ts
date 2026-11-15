import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { CHAPTERS } from "@constants";

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

/**
 * Markdown body for a chapter, or `undefined` when the chapter is unknown, has
 * no file, or the file holds only whitespace and HTML comments (the placeholder
 * stub). The slug must be in `CHAPTERS`, which also rules out path traversal.
 * Call only after confirming the chapter is published.
 */
export async function getChapterText(
	slug: string,
): Promise<string | undefined> {
	if (!CHAPTERS.some((chapter) => chapter.slug === slug)) {
		return undefined;
	}

	let raw: string;
	try {
		raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			return undefined;
		}
		throw error;
	}

	const body = raw.replace(/<!--[\s\S]*?-->/g, "").trim();
	return body.length > 0 ? body : undefined;
}

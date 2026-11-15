import {
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL,
	SOCIAL_LINKS,
} from "@constants";
import { getPublishedChapters } from "@/lib/publishedChapters";

export async function GET(): Promise<Response> {
	const chapters = await getPublishedChapters();

	const chapterLines = chapters.map(
		(chapter) =>
			`- [${chapter.label}](${SITE_URL}/${chapter.slug}): read this chapter in the online manga reader.`,
	);

	const socialLines = SOCIAL_LINKS.map(
		({ name, href }) =>
			`- [${name}](${href}): official Magic and Military profile.`,
	);

	const body = [
		`# ${SITE_TITLE}`,
		"",
		`> ${SITE_DESCRIPTION}`,
		"",
		"Magic and Military is a free-to-read web manga. The home page lists published chapters; each chapter route is a vertical page reader. High-resolution page images are served only through same-origin proxies and are not listed here.",
		"",
		"## Pages",
		"",
		`- [Home](${SITE_URL}/): chapter index and story entry point.`,
		...chapterLines,
		"",
		"## Discovery",
		"",
		`- [Sitemap](${SITE_URL}/sitemap.xml): machine-readable list of public URLs.`,
		`- [Robots](${SITE_URL}/robots.txt): crawler rules for this site.`,
		"",
		"## Social",
		"",
		...socialLines,
		"",
	].join("\n");

	return new Response(body, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
}

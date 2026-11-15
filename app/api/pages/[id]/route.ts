import { IMAGES_ENABLED } from "@constants";
import { findPage } from "@/lib/chapterManifest";
import { getPublishedChapter } from "@/lib/publishedChapters";
import { fetchPageImage } from "@/lib/uploadthing";
import { pageIdSchema } from "@/lib/validations/pageId";

const notFound = () => new Response("Not found", { status: 404 });

/** Browsers embed chapter images; block cross-site hotlinking only. */
const ALLOWED_FETCH_SITES = new Set(["same-origin", "same-site"]);

/**
 * Same-origin proxy for private chapter pages. The browser only ever sees
 * `/api/pages/<random id>`; UploadThing URLs and file keys stay on the server.
 */
export async function GET(
	request: Request,
	ctx: RouteContext<"/api/pages/[id]">,
) {
	if (!IMAGES_ENABLED) {
		return notFound();
	}

	// Deterrent against hotlinking and direct navigation. Browsers set this
	// header; non-browser clients can spoof it, so it is not access control.
	const fetchSite = request.headers.get("sec-fetch-site");
	if (fetchSite !== null && !ALLOWED_FETCH_SITES.has(fetchSite)) {
		return new Response("Forbidden", { status: 403 });
	}

	const parsed = pageIdSchema.safeParse((await ctx.params).id);
	if (!parsed.success) {
		return notFound();
	}

	const page = findPage(parsed.data);
	if (!page || !(await getPublishedChapter(page.chapterSlug))) {
		return notFound();
	}

	const image = await fetchPageImage(page.fileKey);
	if (!image.ok) {
		return image.status === 404
			? notFound()
			: new Response("Bad gateway", { status: 502 });
	}

	// Buffer with Content-Length: iOS Safari is unreliable on chunked image bodies
	// (especially without a known length). Pages are web-sized (~400 KB).
	const headers = new Headers({
		"Content-Type": image.contentType,
		"Content-Length": String(image.body.byteLength),
		"Content-Disposition": "inline",
		"Cache-Control": "private, max-age=3600",
		"X-Content-Type-Options": "nosniff",
		"X-Robots-Tag": "noindex",
	});

	return new Response(image.body, { headers });
}

import "server-only";

import { UTApi } from "uploadthing/server";

import { getEnv } from "./env";

const SIGNED_URL_TTL_SECONDS = 60;
const UPSTREAM_TIMEOUT_MS = 10_000;

export type PageImageResult =
	| {
			ok: true;
			body: ReadableStream<Uint8Array>;
			contentType: string;
			contentLength: string | null;
	  }
	| { ok: false; status: 404 | 502 };

let utapi: UTApi | undefined;

/**
 * The only function that talks to UploadThing. Signs a short-lived URL for a
 * private file and streams it. Errors are collapsed to a status code on purpose:
 * the signed URL (and its signature) must never reach logs or clients.
 */
export async function fetchPageImage(
	fileKey: string,
): Promise<PageImageResult> {
	try {
		utapi ??= new UTApi({ token: getEnv().UPLOADTHING_TOKEN });
		const { ufsUrl } = await utapi.generateSignedURL(fileKey, {
			expiresIn: SIGNED_URL_TTL_SECONDS,
		});

		const upstream = await fetch(ufsUrl, {
			cache: "no-store",
			signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
		});

		if (upstream.status === 404) {
			return { ok: false, status: 404 };
		}

		const contentType = upstream.headers.get("content-type") ?? "";
		if (!upstream.ok || !upstream.body || !contentType.startsWith("image/")) {
			console.error("Page image upstream failure, status:", upstream.status);
			return { ok: false, status: 502 };
		}

		return {
			ok: true,
			body: upstream.body,
			contentType,
			contentLength: upstream.headers.get("content-length"),
		};
	} catch {
		console.error("Page image upstream request failed");
		return { ok: false, status: 502 };
	}
}

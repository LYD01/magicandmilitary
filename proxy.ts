import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const REGION_COOKIE = "mm_eu";

/** EU member states plus EEA, UK and Switzerland (strictest reasonable reading). */
const EU_LIKE_COUNTRIES = new Set([
	"AT",
	"BE",
	"BG",
	"HR",
	"CY",
	"CZ",
	"DK",
	"EE",
	"FI",
	"FR",
	"DE",
	"GR",
	"HU",
	"IE",
	"IT",
	"LV",
	"LT",
	"LU",
	"MT",
	"NL",
	"PL",
	"PT",
	"RO",
	"SK",
	"SI",
	"ES",
	"SE",
	"IS",
	"LI",
	"NO",
	"GB",
	"CH",
]);

/**
 * Request proxy (Next.js 16+; replaces deprecated `middleware`).
 * Marks visitors as EU (`mm_eu=1`) or not (`mm_eu=0`) from the Vercel geo
 * header so the client can pick the analytics consent default. Unknown
 * country is treated as EU (privacy-safe).
 */
export function proxy(request: NextRequest) {
	const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
	const isEu = !country || EU_LIKE_COUNTRIES.has(country);
	const value = isEu ? "1" : "0";

	const response = NextResponse.next();
	if (request.cookies.get(REGION_COOKIE)?.value !== value) {
		response.cookies.set(REGION_COOKIE, value, {
			path: "/",
			sameSite: "lax",
			maxAge: 60 * 60 * 24,
		});
	}
	return response;
}

export const config = {
	matcher: [
		/*
		 * Skip Next internals, API routes and static assets.
		 */
		"/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

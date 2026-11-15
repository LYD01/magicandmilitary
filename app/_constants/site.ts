/** Public site copy and navigation placeholders for Magic and Military. */

export const SITE_TITLE = "Magic and Military";

/** Canonical origin used by `sitemap.ts` and `robots.ts`. Update when the production domain is final. */
export const SITE_URL = "https://magicandmilitary.com";

export const SITE_DESCRIPTION =
	"Read Magic and Military — an ongoing manga story, chapter by chapter.";

/** Stripe Payment Link (live mode, supporter chooses the amount). */
export const SUPPORT_URL = "https://buy.stripe.com/aFa8wJ2fAfQT55L2rO6wE00";

export type SupportSource = "chapter-end" | "footer";

/** Support link tagged with where it was clicked; Stripe shows it as the payment's client reference. */
export function getSupportHref(source: SupportSource): string {
	return `${SUPPORT_URL}?client_reference_id=${source}`;
}

export type SocialLink = {
	name: string;
	href: string;
};

/** Replace `#` with real profile URLs when accounts are ready. */
export const SOCIAL_LINKS: SocialLink[] = [
	{ name: "X", href: "https://x.com/magicmilitaryx" },
	{ name: "Instagram", href: "https://www.instagram.com/magicandmilitary/" },
	{ name: "TikTok", href: "https://www.tiktok.com/@magicmilitary" },
];

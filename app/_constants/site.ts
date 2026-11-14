/** Public site copy and navigation placeholders for Magic and Military. */

export const SITE_TITLE = "Magic and Military";

/** Canonical origin used by `sitemap.ts` and `robots.ts`. Update when the production domain is final. */
export const SITE_URL = "https://magicandmilitary.com";

export const SITE_DESCRIPTION =
	"Read Magic and Military — an ongoing manga story, chapter by chapter.";

/** One hex per visible letter (spaces reuse no color). */
export const HERO_LETTER_COLORS = [
	"#b45309",
	"#047857",
	"#1d4ed8",
	"#7c3aed",
	"#be123c",
	"#0f766e",
	"#a21caf",
	"#c2410c",
	"#1e40af",
	"#15803d",
	"#9333ea",
	"#b91c1c",
	"#0e7490",
	"#ca8a04",
	"#4f46e5",
	"#db2777",
] as const;

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

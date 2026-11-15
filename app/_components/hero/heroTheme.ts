/** Shared constants for the hand-drawn hero letters. */

/** Outline on every glyph: tracks `--hero-ink` for light / dark canvas (3:1+). */
export const INK = "var(--hero-ink)";

/** Local y of the text baseline inside every glyph's coordinate space. */
export const GLYPH_BASELINE = 130;

export const OUTLINE = {
	stroke: INK,
	strokeWidth: 4,
	strokeLinejoin: "round",
	strokeLinecap: "round",
} as const;

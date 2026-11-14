/** Shared constants for the hand-drawn hero letters. */

/** Dark outline on every glyph: keeps each letter readable (3:1+) on the off-white canvas. */
export const INK = "#1b2117";

/** Local y of the text baseline inside every glyph's coordinate space. */
export const GLYPH_BASELINE = 130;

export const OUTLINE = {
	stroke: INK,
	strokeWidth: 4,
	strokeLinejoin: "round",
	strokeLinecap: "round",
} as const;

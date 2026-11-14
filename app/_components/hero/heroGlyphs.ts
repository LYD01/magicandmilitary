import type { ComponentType } from "react";

import { type LayoutItem, layoutArch } from "./heroLayout";
import { LetterACrown, LetterALion, LetterARune } from "./LetterA";
import { LetterC } from "./LetterC";
import { LetterD } from "./LetterD";
import { LetterG } from "./LetterG";
import { LetterICandle, LetterICartridge, LetterIStaff } from "./LetterI";
import { LetterL } from "./LetterL";
import { LetterMForest, LetterMRidge } from "./LetterM";
import { LetterN } from "./LetterN";
import { LetterR } from "./LetterR";
import { LetterT } from "./LetterT";
import { LetterY } from "./LetterY";

/** How a glyph arrives; maps to `.hl-in-*` keyframes in `globals.css`. */
type Entrance = "rise" | "drop" | "pop" | "shoot" | "spin" | "grow";

type Glyph = {
	Component: ComponentType;
	width: number;
	entrance: Entrance;
};

export const HERO_GLYPHS = {
	"M-forest": { Component: LetterMForest, width: 124, entrance: "rise" },
	"a-rune": { Component: LetterARune, width: 92, entrance: "spin" },
	g: { Component: LetterG, width: 92, entrance: "drop" },
	"i-candle": { Component: LetterICandle, width: 44, entrance: "rise" },
	c: { Component: LetterC, width: 80, entrance: "spin" },
	"a-crown": { Component: LetterACrown, width: 96, entrance: "drop" },
	n: { Component: LetterN, width: 100, entrance: "grow" },
	d: { Component: LetterD, width: 104, entrance: "drop" },
	"M-ridge": { Component: LetterMRidge, width: 124, entrance: "rise" },
	"i-cartridge": { Component: LetterICartridge, width: 44, entrance: "rise" },
	l: { Component: LetterL, width: 40, entrance: "shoot" },
	"i-staff": { Component: LetterIStaff, width: 44, entrance: "pop" },
	t: { Component: LetterT, width: 72, entrance: "pop" },
	"a-lion": { Component: LetterALion, width: 106, entrance: "pop" },
	r: { Component: LetterR, width: 78, entrance: "rise" },
	y: { Component: LetterY, width: 100, entrance: "grow" },
} as const satisfies Record<string, Glyph>;

export type HeroGlyphKey = keyof typeof HERO_GLYPHS;

type HeroItem = LayoutItem<HeroGlyphKey | "space">;

const SPACE_WIDTH = 46;

function glyph(key: HeroGlyphKey): HeroItem {
	return { key, width: HERO_GLYPHS[key].width };
}

const SPACE: HeroItem = { key: "space", width: SPACE_WIDTH };

const MAGIC: HeroItem[] = [
	glyph("M-forest"),
	glyph("a-rune"),
	glyph("g"),
	glyph("i-candle"),
	glyph("c"),
];

const AND: HeroItem[] = [glyph("a-crown"), glyph("n"), glyph("d")];

const MILITARY: HeroItem[] = [
	glyph("M-ridge"),
	glyph("i-cartridge"),
	glyph("l"),
	glyph("i-staff"),
	glyph("t"),
	glyph("a-lion"),
	glyph("r"),
	glyph("y"),
];

/** Desktop: the whole title on one shallow arch. */
export const HERO_LAYOUT_WIDE = layoutArch(
	[[...MAGIC, SPACE, ...AND, SPACE, ...MILITARY]],
	{ radius: 3200, gap: 6, lineHeight: 0, staggerMs: 85 },
);

/** Mobile: two stacked arches ("Magic and" over "Military") so letters stay big. */
export const HERO_LAYOUT_STACKED = layoutArch(
	[[...MAGIC, SPACE, ...AND], MILITARY],
	{ radius: 1400, gap: 6, lineHeight: 290, staggerMs: 85 },
);

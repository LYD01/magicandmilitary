import { GLYPH_BASELINE } from "./heroTheme";

export type LayoutItem<K extends string> = {
	key: K;
	/** Advance width of the glyph in its local coordinate space. */
	width: number;
};

export type PlacedItem<K extends string> = {
	key: K;
	width: number;
	/** Baseline-centre of the glyph on the arch. */
	x: number;
	y: number;
	/** Degrees; tilts each letter to stay perpendicular to the arch. */
	angle: number;
	delayMs: number;
};

export type ArchLayout<K extends string> = {
	items: PlacedItem<K>[];
	viewBox: string;
};

type ArchOptions = {
	/** Larger radius = flatter arch. */
	radius: number;
	/** Extra space between neighbouring glyphs. */
	gap: number;
	/** Vertical distance between the baselines (tops of the arches) of consecutive lines. */
	lineHeight: number;
	/** Stagger between consecutive letters' entrance animations. */
	staggerMs: number;
};

/** How far glyph artwork (flags, bushes, crowns, descenders) strays above and below the baseline. */
const ART_ABOVE = GLYPH_BASELINE + 45;
const ART_BELOW = 70;
const ART_SIDE = 10;

function toDegrees(radians: number): number {
	return (radians * 180) / Math.PI;
}

/**
 * Sets each line of glyphs along the top of a circle, so the words bend like a
 * shallow arch. Each glyph is rotated about its baseline-centre to follow the curve.
 */
export function layoutArch<K extends string>(
	lines: LayoutItem<K>[][],
	{ radius, gap, lineHeight, staggerMs }: ArchOptions,
): ArchLayout<K> {
	const items: PlacedItem<K>[] = [];
	let index = 0;

	lines.forEach((line, lineIndex) => {
		const total =
			line.reduce((sum, item) => sum + item.width, 0) + gap * (line.length - 1);
		let cursor = -total / 2;

		for (const item of line) {
			const theta = (cursor + item.width / 2) / radius;
			cursor += item.width + gap;

			items.push({
				key: item.key,
				width: item.width,
				x: radius * Math.sin(theta),
				y: radius * (1 - Math.cos(theta)) + lineIndex * lineHeight,
				angle: toDegrees(theta),
				delayMs: index * staggerMs,
			});
			index += 1;
		}
	});

	let minX = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;

	for (const item of items) {
		const rad = (item.angle * Math.PI) / 180;
		const cos = Math.cos(rad);
		const sin = Math.sin(rad);
		const halfWidth = item.width / 2 + ART_SIDE;

		for (const [lx, ly] of [
			[-halfWidth, -ART_ABOVE],
			[halfWidth, -ART_ABOVE],
			[-halfWidth, ART_BELOW],
			[halfWidth, ART_BELOW],
		]) {
			const px = item.x + lx * cos - ly * sin;
			const py = item.y + lx * sin + ly * cos;
			minX = Math.min(minX, px);
			maxX = Math.max(maxX, px);
			minY = Math.min(minY, py);
			maxY = Math.max(maxY, py);
		}
	}

	return {
		items,
		viewBox: [minX, minY, maxX - minX, maxY - minY]
			.map((value) => value.toFixed(1))
			.join(" "),
	};
}

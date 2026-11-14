"use client";

import { HERO_LETTER_COLORS, SITE_TITLE } from "@constants";

type HeroSegment =
	| { id: string; kind: "space"; delayMs: number }
	| {
			id: string;
			kind: "letter";
			char: string;
			color: string;
			delayMs: number;
	  };

function buildHeroSegments(title: string): HeroSegment[] {
	const segments: HeroSegment[] = [];
	let colorIndex = 0;

	for (let i = 0; i < title.length; i += 1) {
		const char = title[i];
		const id = `${char}-${i}`;

		if (char === " ") {
			segments.push({ id, kind: "space", delayMs: i * 45 });
			continue;
		}

		segments.push({
			id,
			kind: "letter",
			char,
			color: HERO_LETTER_COLORS[colorIndex % HERO_LETTER_COLORS.length],
			delayMs: i * 45,
		});
		colorIndex += 1;
	}

	return segments;
}

const HERO_SEGMENTS = buildHeroSegments(SITE_TITLE);

export function TitleHero() {
	return (
		<h1 className="text-center font-semibold tracking-tight text-balance">
			<span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.06em] gap-y-1 text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
				{HERO_SEGMENTS.map((segment) =>
					segment.kind === "space" ? (
						<span
							key={segment.id}
							aria-hidden="true"
							className="hero-letter w-[0.35em]"
							style={{ animationDelay: `${segment.delayMs}ms` }}
						>
							{"\u00a0"}
						</span>
					) : (
						<span
							key={segment.id}
							className="hero-letter"
							style={{
								color: segment.color,
								animationDelay: `${segment.delayMs}ms`,
							}}
						>
							{segment.char}
						</span>
					),
				)}
			</span>
		</h1>
	);
}

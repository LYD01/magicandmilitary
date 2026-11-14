import { SITE_TITLE } from "@constants";

import { HeroDefs } from "./hero/HeroDefs";
import {
	HERO_GLYPHS,
	HERO_LAYOUT_STACKED,
	HERO_LAYOUT_WIDE,
} from "./hero/heroGlyphs";
import type { ArchLayout } from "./hero/heroLayout";
import { GLYPH_BASELINE } from "./hero/heroTheme";

type HeroArtProps = {
	layout: ArchLayout<keyof typeof HERO_GLYPHS | "space">;
	className: string;
};

function HeroArt({ layout, className }: HeroArtProps) {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			viewBox={layout.viewBox}
			className={className}
		>
			{layout.items.map((item) => {
				if (item.key === "space") {
					return null;
				}

				const { Component, entrance } = HERO_GLYPHS[item.key];

				return (
					<g
						key={`${item.key}-${item.delayMs}`}
						transform={`translate(${item.x.toFixed(2)} ${item.y.toFixed(2)}) rotate(${item.angle.toFixed(3)}) translate(${-item.width / 2} ${-GLYPH_BASELINE})`}
					>
						<g
							className={`hl-enter hl-in-${entrance}`}
							style={{ animationDelay: `${item.delayMs}ms` }}
						>
							<Component />
						</g>
					</g>
				);
			})}
		</svg>
	);
}

/**
 * Hero title. Every letter is hand-drawn SVG themed on the story (magic,
 * Narnia, holy, military) and set on a shallow arch. Animation is CSS-only,
 * so this stays a Server Component. The real title is exposed as text for assistive tech.
 */
export function TitleHero() {
	return (
		<h1 className="w-full text-center">
			<span className="sr-only">{SITE_TITLE}</span>
			<HeroDefs />
			<HeroArt
				layout={HERO_LAYOUT_WIDE}
				className="mx-auto hidden h-auto w-full max-w-4xl overflow-visible md:block"
			/>
			<HeroArt
				layout={HERO_LAYOUT_STACKED}
				className="mx-auto block h-auto w-full max-w-md overflow-visible md:hidden"
			/>
		</h1>
	);
}

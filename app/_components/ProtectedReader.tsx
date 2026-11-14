"use client";

import { SITE_TITLE, SITE_URL } from "@constants";

import { BookmarkToggle } from "./BookmarkToggle";
import { useContentGuard } from "./useContentGuard";

export type ReaderPage = {
	src: string;
	alt: string;
	/** width / height */
	aspectRatio: number;
};

type ProtectedReaderProps = {
	chapterSlug: string;
	pages: ReaderPage[];
};

const WATERMARK_TEXT = `${SITE_TITLE} · ${new URL(SITE_URL).hostname}`;

/** Tiled, rotated, low-opacity text with a light halo so it reads on dark and light art. */
const WATERMARK_BACKGROUND = `url("data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns='http://www.w3.org/2000/svg' width='360' height='220'><text x='180' y='110' text-anchor='middle' font-family='Arial,sans-serif' font-size='18' font-weight='700' fill='#000' fill-opacity='.2' stroke='#fff' stroke-opacity='.2' stroke-width='3' paint-order='stroke' transform='rotate(-25 180 110)'>${WATERMARK_TEXT}</text></svg>`,
)}")`;

/**
 * Client leaf: lazy-loaded page images from the same-origin proxy, a visible
 * watermark overlay, and light copy deterrents. See `docs/audits/reader-protection.md`.
 */
export function ProtectedReader({ chapterSlug, pages }: ProtectedReaderProps) {
	const { hidden, guardProps } = useContentGuard();

	return (
		<section
			aria-label="Chapter pages"
			className="reader mx-auto flex w-full max-w-3xl flex-col gap-2"
			data-guard-hidden={hidden}
			{...guardProps}
		>
			{pages.map((page, index) => (
				<div
					key={page.src}
					id={`page-${index + 1}`}
					className="relative w-full scroll-mt-4 bg-neutral-200"
					style={{ aspectRatio: page.aspectRatio }}
				>
					{/* Plain img on purpose: next/image would re-fetch the proxy server-side without browser fetch metadata and cache it publicly. */}
					{/* eslint-disable @next/next/no-img-element */}
					{/* biome-ignore lint/performance/noImgElement: see comment above */}
					<img
						src={page.src}
						alt={page.alt}
						loading={index === 0 ? "eager" : "lazy"}
						fetchPriority={index === 0 ? "high" : "auto"}
						decoding="async"
						draggable={false}
						className="h-full w-full object-contain"
					/>
					{/* eslint-enable @next/next/no-img-element */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0"
						style={{ backgroundImage: WATERMARK_BACKGROUND }}
					/>
					<BookmarkToggle slug={chapterSlug} page={index + 1} />
				</div>
			))}
		</section>
	);
}

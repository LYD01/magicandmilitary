import Link from "next/link";

import { CHAPTERS } from "@constants";

type ChapterListProps = {
	/** Slugs whose `publishedAt` has passed. The clock read stays in `getPublishedChapters`. */
	publishedSlugs: readonly string[];
};

export function ChapterList({ publishedSlugs }: ChapterListProps) {
	const published = new Set(publishedSlugs);

	return (
		<section
			className="w-full max-w-md px-4 sm:px-6"
			aria-labelledby="chapters-heading"
		>
			<h2 id="chapters-heading" className="sr-only">
				Chapters
			</h2>
			<ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed sm:text-lg">
				{CHAPTERS.map((chapter) => (
					<li key={chapter.slug}>
						{published.has(chapter.slug) && chapter.pageCount > 0 ? (
							<Link className="link-classic" href={`/${chapter.slug}`}>
								{chapter.label}
							</Link>
						) : (
							<span>
								{chapter.label}{" "}
								<span className="text-foreground/75">(Coming soon)</span>
							</span>
						)}
					</li>
				))}
			</ol>
		</section>
	);
}

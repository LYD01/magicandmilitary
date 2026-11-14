import Link from "next/link";

import { getPublishedChapters } from "@/lib/publishedChapters";

export async function ChapterList() {
	const chapters = await getPublishedChapters();

	return (
		<section
			className="w-full max-w-md px-4 sm:px-6"
			aria-labelledby="chapters-heading"
		>
			<h2 id="chapters-heading" className="sr-only">
				Chapters
			</h2>
			<ol className="list-decimal space-y-2 pl-6 text-base leading-relaxed sm:text-lg">
				{chapters.map((chapter) => (
					<li key={chapter.slug}>
						<Link className="link-classic" href={`/${chapter.slug}`}>
							{chapter.label}
						</Link>
					</li>
				))}
			</ol>
		</section>
	);
}

import { BookmarkList, ChapterList, SiteFooter, TitleHero } from "@components";
import { getPublishedChapters } from "@/lib/publishedChapters";

export default async function Home() {
	const chapters = await getPublishedChapters();

	return (
		<div className="flex min-h-full flex-1 flex-col bg-canvas">
			<main className="flex flex-1 flex-col items-center px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
				<div className="flex w-full max-w-4xl flex-col items-center gap-12 sm:gap-14 md:gap-16">
					<TitleHero />
					<BookmarkList
						chapters={chapters.map(({ slug, label, pageCount }) => ({
							slug,
							label,
							pageCount,
						}))}
					/>
					<ChapterList
						publishedSlugs={chapters.map((chapter) => chapter.slug)}
					/>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}

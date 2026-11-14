import { ChapterList, SiteFooter, TitleHero } from "@components";

export default function Home() {
	return (
		<div className="flex min-h-full flex-1 flex-col bg-canvas">
			<main className="flex flex-1 flex-col items-center px-4 pb-6 pt-14 sm:px-6 sm:pt-20 md:pt-24">
				<div className="flex w-full max-w-4xl flex-col items-center gap-12 sm:gap-14 md:gap-16">
					<TitleHero />
					<ChapterList />
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}

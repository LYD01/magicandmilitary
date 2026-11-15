import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
	ChapterText,
	ProtectedReader,
	SiteFooter,
	SupportCard,
} from "@components";
import { IMAGES_ENABLED } from "@constants";
import { getChapterPages } from "@/lib/chapterManifest";
import { getChapterText } from "@/lib/chapterText";
import {
	getPublishedChapter,
	getPublishedChapters,
} from "@/lib/publishedChapters";

export async function generateStaticParams() {
	const chapters = await getPublishedChapters();
	return chapters.map(({ slug }) => ({ chapter: slug }));
}

export async function generateMetadata({
	params,
}: PageProps<"/[chapter]">): Promise<Metadata> {
	const chapter = await getPublishedChapter((await params).chapter);
	return chapter ? { title: chapter.label } : {};
}

export default async function ChapterPage({ params }: PageProps<"/[chapter]">) {
	const { chapter: slug } = await params;
	const chapters = await getPublishedChapters();
	const index = chapters.findIndex((entry) => entry.slug === slug);
	if (index === -1) {
		notFound();
	}

	const chapter = chapters[index];
	const previous = chapters[index - 1];
	const next = chapters[index + 1];
	const pages = IMAGES_ENABLED ? getChapterPages(slug) : [];
	const text = IMAGES_ENABLED ? undefined : await getChapterText(slug);

	return (
		<div className="flex min-h-full flex-1 flex-col bg-canvas">
			<main className="flex flex-1 flex-col items-center gap-6 px-4 py-8 sm:px-6">
				<nav aria-label="Site">
					<Link className="link-classic inline-block py-2" href="/">
						All chapters
					</Link>
				</nav>
				<h1 className="text-center text-2xl font-semibold sm:text-3xl">
					{chapter.label}
				</h1>
				{pages.length > 0 ? (
					<>
						<p className="max-w-prose text-center text-sm">
							Pages are hidden while this tab is in the background.
						</p>
						<ProtectedReader chapterSlug={slug} pages={pages} />
						<SupportCard />
					</>
				) : text ? (
					<>
						<ChapterText markdown={text} />
						<SupportCard />
					</>
				) : (
					<p className="text-base">Chapter coming soon.</p>
				)}
				<nav
					aria-label="Chapter navigation"
					className="flex w-full max-w-3xl justify-between gap-4"
				>
					{previous ? (
						<Link
							className="link-classic inline-block py-2"
							href={`/${previous.slug}`}
						>
							Previous: {previous.label}
						</Link>
					) : (
						<span />
					)}
					{next ? (
						<Link
							className="link-classic inline-block py-2"
							href={`/${next.slug}`}
						>
							Next: {next.label}
						</Link>
					) : null}
				</nav>
			</main>
			<SiteFooter />
		</div>
	);
}

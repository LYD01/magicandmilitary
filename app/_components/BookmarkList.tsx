"use client";

import Link from "next/link";
import { useEffect } from "react";

import { BookmarkIcon } from "./BookmarkIcon";
import { useBookmarks } from "./useBookmarks";

type BookmarkChapter = {
	slug: string;
	label: string;
	pageCount: number;
};

type BookmarkListProps = {
	chapters: BookmarkChapter[];
};

/** Saved pages, resolved against the published chapters passed from the server. */
export function BookmarkList({ chapters }: BookmarkListProps) {
	const { bookmarks, remove, prune } = useBookmarks();

	const isValid = (slug: string, page: number) => {
		const chapter = chapters.find((entry) => entry.slug === slug);
		return chapter !== undefined && page <= chapter.pageCount;
	};

	useEffect(() => {
		if (chapters.length > 0) {
			prune((bookmark) => {
				const chapter = chapters.find((entry) => entry.slug === bookmark.slug);
				return chapter !== undefined && bookmark.page <= chapter.pageCount;
			});
		}
	}, [chapters, prune]);

	const items = bookmarks
		.filter((bookmark) => isValid(bookmark.slug, bookmark.page))
		.map((bookmark) => ({
			...bookmark,
			label:
				chapters.find((entry) => entry.slug === bookmark.slug)?.label ??
				bookmark.slug,
			order: chapters.findIndex((entry) => entry.slug === bookmark.slug),
		}))
		.sort((a, b) => a.order - b.order || a.page - b.page);

	if (items.length === 0) {
		return null;
	}

	return (
		<section
			className="w-full max-w-md px-4 sm:px-6"
			aria-labelledby="bookmarks-heading"
		>
			<h2
				id="bookmarks-heading"
				className="mb-2 flex items-center gap-2 text-lg font-semibold"
			>
				<BookmarkIcon filled className="h-5 w-5 text-[#b3261e]" />
				Bookmarks
			</h2>
			<ul className="space-y-2 text-base leading-relaxed sm:text-lg">
				{items.map((item) => (
					<li
						key={`${item.slug}#${item.page}`}
						className="flex items-center justify-between gap-3"
					>
						<Link
							className="link-classic"
							href={`/${item.slug}#page-${item.page}`}
						>
							{item.label}, page {item.page}
						</Link>
						{/* Local, easily re-added item: deliberately no confirm step (exception to the destructive-action rule). */}
						<button
							type="button"
							className="bookmark-remove"
							aria-label={`Remove bookmark: ${item.label}, page ${item.page}`}
							onClick={() => remove(item.slug, item.page)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}

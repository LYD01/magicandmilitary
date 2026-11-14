"use client";

import { useState } from "react";

import { BookmarkIcon } from "./BookmarkIcon";
import { useBookmarks } from "./useBookmarks";

type BookmarkToggleProps = {
	slug: string;
	/** 1-based page number in the chapter. */
	page: number;
};

/**
 * Ribbon bookmark hanging from the top edge of a reader page. Animations only
 * run after a click (`data-animate`), never when saved bookmarks load.
 */
export function BookmarkToggle({ slug, page }: BookmarkToggleProps) {
	const { isBookmarked, toggle } = useBookmarks();
	const [animate, setAnimate] = useState<"add" | "remove">();
	const pressed = isBookmarked(slug, page);

	return (
		<button
			type="button"
			className="bookmark-toggle"
			aria-pressed={pressed}
			aria-label={`Bookmark page ${page}`}
			data-animate={animate}
			onClick={() => {
				setAnimate(pressed ? "remove" : "add");
				toggle(slug, page);
			}}
		>
			<span className="bookmark-wrap" aria-hidden="true">
				<span className="bookmark-ribbon">
					<BookmarkIcon filled={pressed} />
				</span>
			</span>
		</button>
	);
}

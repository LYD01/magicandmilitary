import { useSyncExternalStore } from "react";

import { type Bookmark, bookmarkSchema } from "@/lib/validations/bookmarks";

import * as z from "zod/mini";

const STORAGE_KEY = "mm_bookmarks";
const MAX_BOOKMARKS = 200;

const EMPTY: Bookmark[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cachedList: Bookmark[] = EMPTY;

function readRaw(): string | null {
	try {
		return window.localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
}

function parse(raw: string | null): Bookmark[] {
	if (!raw) {
		return EMPTY;
	}
	try {
		const data: unknown = JSON.parse(raw);
		if (!Array.isArray(data)) {
			return EMPTY;
		}
		const list: Bookmark[] = [];
		for (const item of data) {
			const result = z.safeParse(bookmarkSchema, item);
			if (result.success) {
				list.push(result.data);
			}
		}
		return list;
	} catch {
		return EMPTY;
	}
}

/** Referentially stable until the stored string changes (required by `useSyncExternalStore`). */
function getSnapshot(): Bookmark[] {
	const raw = readRaw();
	if (raw !== cachedRaw) {
		cachedRaw = raw;
		cachedList = parse(raw);
	}
	return cachedList;
}

const getServerSnapshot = () => EMPTY;

function subscribe(onChange: () => void) {
	listeners.add(onChange);
	const onStorage = (event: StorageEvent) => {
		if (event.key === STORAGE_KEY || event.key === null) {
			onChange();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(onChange);
		window.removeEventListener("storage", onStorage);
	};
}

/** `storage` events only reach other tabs, so same-tab subscribers are notified here. */
function write(list: Bookmark[]) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
	} catch {
		// Storage blocked or full: bookmarks simply do not persist.
		return;
	}
	for (const listener of listeners) {
		listener();
	}
}

const same = (a: Bookmark, slug: string, page: number) =>
	a.slug === slug && a.page === page;

function toggle(slug: string, page: number) {
	const current = getSnapshot();
	if (current.some((entry) => same(entry, slug, page))) {
		write(current.filter((entry) => !same(entry, slug, page)));
		return;
	}
	write([...current, { slug, page }].slice(-MAX_BOOKMARKS));
}

function remove(slug: string, page: number) {
	write(getSnapshot().filter((entry) => !same(entry, slug, page)));
}

/** Drops every bookmark the predicate rejects (e.g. unpublished chapters). */
function prune(isValid: (bookmark: Bookmark) => boolean) {
	const current = getSnapshot();
	const next = current.filter(isValid);
	if (next.length !== current.length) {
		write(next);
	}
}

/**
 * Page bookmarks in `localStorage`. A bookmark is identified by chapter slug and
 * 1-based page number, so inserting or reordering pages in the manifest shifts
 * existing bookmarks.
 */
export function useBookmarks() {
	const bookmarks = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	return {
		bookmarks,
		isBookmarked: (slug: string, page: number) =>
			bookmarks.some((entry) => same(entry, slug, page)),
		toggle,
		remove,
		prune,
	};
}

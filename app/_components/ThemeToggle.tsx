"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
	THEME_STORAGE_KEY,
	type ThemePreference,
	applyTheme,
	resolveTheme,
} from "@utils";

const THEME_CHANGE = "mm-theme-change";

function subscribe(onStoreChange: () => void) {
	window.addEventListener(THEME_CHANGE, onStoreChange);
	return () => window.removeEventListener(THEME_CHANGE, onStoreChange);
}

function getThemeSnapshot(): ThemePreference {
	return resolveTheme();
}

function getServerThemeSnapshot(): ThemePreference {
	return "light";
}

function persistTheme(theme: ThemePreference) {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		// Still apply for this session when storage is unavailable.
	}
	applyTheme(theme);
	window.dispatchEvent(new Event(THEME_CHANGE));
}

export function ThemeToggle() {
	const theme = useSyncExternalStore(
		subscribe,
		getThemeSnapshot,
		getServerThemeSnapshot,
	);

	const toggle = useCallback(() => {
		const next: ThemePreference = theme === "dark" ? "light" : "dark";
		persistTheme(next);
	}, [theme]);

	const isDark = theme === "dark";
	const label = isDark ? "Switch to light mode" : "Switch to dark mode";

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={label}
			aria-pressed={isDark}
			suppressHydrationWarning
			className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-foreground/20 bg-canvas text-foreground shadow-sm transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [text-shadow:none]"
		>
			{isDark ? (
				<svg
					aria-hidden="true"
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.75}
					viewBox="0 0 24 24"
				>
					<circle cx={12} cy={12} r={4.25} />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</svg>
			) : (
				<svg
					aria-hidden="true"
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M21.64 13a9 9 0 1 1-10.63-10.61 1 1 0 0 1 .91.65 7 7 0 0 0 9.83 9.83 1 1 0 0 1 .89.13z" />
				</svg>
			)}
		</button>
	);
}

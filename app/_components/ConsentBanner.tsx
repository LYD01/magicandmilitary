"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_COOKIE, CONSENT_MAX_AGE, type ConsentChoice } from "@utils";

const DISMISSED_KEY = "mm_consent_dismissed";
const CHANGE_EVENT = "mm-consent-change";

type GtagWindow = Window & {
	gtag?: (...args: unknown[]) => void;
};

function hasStoredChoice() {
	return document.cookie
		.split("; ")
		.some((part) => part.startsWith(`${CONSENT_COOKIE}=`));
}

function subscribe(onChange: () => void) {
	window.addEventListener(CHANGE_EVENT, onChange);
	return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function getHidden() {
	return hasStoredChoice() || sessionStorage.getItem(DISMISSED_KEY) === "1";
}

export function ConsentBanner() {
	// Server snapshot is "hidden" so SSR and first client render match.
	const hidden = useSyncExternalStore(subscribe, getHidden, () => true);

	function choose(choice: ConsentChoice) {
		// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API lacks Safari/Firefox support
		document.cookie = `${CONSENT_COOKIE}=${choice}; max-age=${CONSENT_MAX_AGE}; path=/; SameSite=Lax`;
		(window as GtagWindow).gtag?.("consent", "update", {
			analytics_storage: choice,
		});
		window.dispatchEvent(new Event(CHANGE_EVENT));
	}

	function dismiss() {
		sessionStorage.setItem(DISMISSED_KEY, "1");
		window.dispatchEvent(new Event(CHANGE_EVENT));
	}

	if (hidden) return null;

	return (
		<section
			aria-label="Cookie consent"
			className="fixed right-3 bottom-3 z-50 w-[min(20rem,calc(100vw-1.5rem))] rounded border border-foreground/25 bg-canvas p-3 pr-9 text-sm text-foreground shadow-md [text-shadow:none]"
		>
			<button
				type="button"
				onClick={dismiss}
				aria-label="Dismiss cookie notice"
				className="absolute top-1 right-1 flex size-7 items-center justify-center rounded text-lg leading-none font-bold text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 dark:text-red-400 dark:focus-visible:outline-red-400"
			>
				<span aria-hidden="true">×</span>
			</button>
			<p className="mb-3">
				We use cookies for analytics to understand how the site is used.
			</p>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => choose("denied")}
					className="min-h-8 flex-1 rounded border border-foreground/40 bg-canvas px-2 py-1 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
				>
					Reject non-essential
				</button>
				<button
					type="button"
					onClick={() => choose("granted")}
					className="min-h-8 flex-1 rounded border border-foreground bg-foreground px-2 py-1 text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
				>
					Accept all
				</button>
			</div>
		</section>
	);
}

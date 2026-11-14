import { type SyntheticEvent, useSyncExternalStore } from "react";

const preventDefault = (event: SyntheticEvent) => event.preventDefault();

const guardProps = {
	onContextMenu: preventDefault,
	onDragStart: preventDefault,
} as const;

function subscribe(onChange: () => void) {
	document.addEventListener("visibilitychange", onChange);
	return () => document.removeEventListener("visibilitychange", onChange);
}

const getHidden = () => document.hidden;
const getServerHidden = () => false;

/**
 * Casual-copy deterrents for the reader: blocks the context menu and image
 * dragging, and reports when the tab is in the background so pages can blank.
 * Deliberately small: no key blocking and no blur handling (false positives,
 * and they interfere with browser and assistive-tech shortcuts).
 */
export function useContentGuard() {
	const hidden = useSyncExternalStore(subscribe, getHidden, getServerHidden);
	return { hidden, guardProps };
}

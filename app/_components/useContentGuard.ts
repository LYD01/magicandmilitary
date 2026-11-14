import {
	type SyntheticEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";

const REVEAL_MS = 5000;
const LONG_PRESS_MS = 500;

function subscribe(onChange: () => void) {
	document.addEventListener("visibilitychange", onChange);
	return () => document.removeEventListener("visibilitychange", onChange);
}

const getHidden = () => document.hidden;
const getServerHidden = () => false;

/** PrintScreen, or the macOS screenshot shortcuts (Cmd+Shift+3/4/5). */
function isScreenshotShortcut(event: KeyboardEvent) {
	if (event.key === "PrintScreen") {
		return true;
	}
	return event.metaKey && event.shiftKey && ["3", "4", "5"].includes(event.key);
}

/**
 * Casual-copy deterrents for the reader: blocks the context menu and image
 * dragging, reports when the tab is in the background so pages can blank, and
 * reports `revealed` for a few seconds after a copy attempt (right-click, drag,
 * long-press, screenshot shortcut) so the watermark can fade in only then.
 * Deliberately small: no key blocking and no blur handling (false positives,
 * and they interfere with browser and assistive-tech shortcuts).
 */
export function useContentGuard() {
	const hidden = useSyncExternalStore(subscribe, getHidden, getServerHidden);
	const [revealed, setRevealed] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const pressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const reveal = useCallback(() => {
		setRevealed(true);
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setRevealed(false), REVEAL_MS);
	}, []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (isScreenshotShortcut(event)) {
				reveal();
			}
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.key === "PrintScreen") {
				reveal();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
			clearTimeout(timer.current);
			clearTimeout(pressTimer.current);
		};
	}, [reveal]);

	const guardProps = {
		onContextMenu: (event: SyntheticEvent) => {
			event.preventDefault();
			reveal();
		},
		onDragStart: (event: SyntheticEvent) => {
			event.preventDefault();
			reveal();
		},
		onTouchStart: () => {
			clearTimeout(pressTimer.current);
			pressTimer.current = setTimeout(reveal, LONG_PRESS_MS);
		},
		onTouchEnd: () => clearTimeout(pressTimer.current),
		onTouchMove: () => clearTimeout(pressTimer.current),
		onTouchCancel: () => clearTimeout(pressTimer.current),
	};

	return { hidden, revealed, guardProps };
}

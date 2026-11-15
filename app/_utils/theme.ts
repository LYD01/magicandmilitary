/** Persists explicit light / dark; default is light when nothing is stored. */

export const THEME_STORAGE_KEY = "mm-theme";

export type ThemePreference = "dark" | "light";

export function applyTheme(theme: ThemePreference) {
	const root = document.documentElement;
	root.classList.toggle("dark", theme === "dark");
}

export function readStoredTheme(): ThemePreference | null {
	try {
		const value = localStorage.getItem(THEME_STORAGE_KEY);
		if (value === "light" || value === "dark") {
			return value;
		}
	} catch {
		// Private mode or blocked storage — fall back to light.
	}
	return null;
}

export function resolveTheme(): ThemePreference {
	return readStoredTheme() ?? "light";
}

/** Runs before paint so the canvas does not flash the wrong theme. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);document.documentElement.classList.toggle("dark",s==="dark");}catch(e){}})();`;

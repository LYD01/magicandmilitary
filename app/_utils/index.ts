/** Barrel exports for `@utils` — pure helpers shared across the app. */
export {
	CONSENT_COOKIE,
	CONSENT_INIT_SCRIPT,
	CONSENT_MAX_AGE,
	type ConsentChoice,
	REGION_COOKIE,
} from "./consent";
export {
	THEME_INIT_SCRIPT,
	THEME_STORAGE_KEY,
	type ThemePreference,
	applyTheme,
	readStoredTheme,
	resolveTheme,
} from "./theme";

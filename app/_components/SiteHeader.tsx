import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
	return (
		<header className="flex w-full shrink-0 justify-end px-[max(0.75rem,env(safe-area-inset-right))] pb-2 pl-[max(0.75rem,env(safe-area-inset-left))] pt-[max(0.75rem,env(safe-area-inset-top))]">
			<ThemeToggle />
		</header>
	);
}

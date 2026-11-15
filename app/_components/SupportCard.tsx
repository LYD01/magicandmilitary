import { getSupportHref } from "@constants";

/** End-of-chapter ask. Server Component, no client JS. */
export function SupportCard() {
	return (
		<section
			aria-labelledby="support-heading"
			className="flex w-full max-w-3xl flex-col items-center gap-3 rounded-md border border-foreground/60 px-5 py-6 text-center"
		>
			<h2 className="text-xl font-semibold" id="support-heading">
				Enjoyed this chapter?
			</h2>
			<p className="max-w-prose text-base">Help me make the next one.</p>
			<a
				className="inline-flex min-h-11 items-center justify-center rounded-sm bg-foreground px-5 py-2 text-base font-semibold text-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
				href={getSupportHref("chapter-end")}
				rel="noopener noreferrer"
				target="_blank"
			>
				Buy me a coffee
				<span className="sr-only"> (opens in a new tab)</span>
			</a>
		</section>
	);
}

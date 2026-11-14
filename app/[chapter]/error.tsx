"use client";

export default function ChapterError({ reset }: { reset: () => void }) {
	return (
		<main className="flex flex-1 flex-col items-center justify-center gap-4 bg-canvas px-4 py-8 text-center">
			<h1 className="text-2xl font-semibold">This chapter could not load</h1>
			<button
				type="button"
				onClick={reset}
				className="min-h-11 rounded border-2 border-foreground px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
			>
				Try again
			</button>
		</main>
	);
}

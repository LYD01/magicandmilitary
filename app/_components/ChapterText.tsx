import Markdown from "react-markdown";

type ChapterTextProps = {
	markdown: string;
};

/**
 * Light-novel style prose. Server Component. Raw HTML in the source is never
 * rendered (react-markdown's default), and `---` becomes a scene break.
 */
export function ChapterText({ markdown }: ChapterTextProps) {
	return (
		<article aria-label="Chapter text" className="chapter-text">
			<Markdown
				components={{
					hr: () => (
						<hr aria-label="Scene break" className="chapter-text-break" />
					),
				}}
			>
				{markdown}
			</Markdown>
		</article>
	);
}

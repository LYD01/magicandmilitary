import { INK } from "./heroTheme";

type Stroke = { d: string; width: number };

type OutlinedStrokesProps = {
	strokes: Stroke[];
	/** Flat colour: gradients on straight strokes have a zero-width bounding box and vanish. */
	color: string;
};

/**
 * Thick stroked paths with one merged outline: every outline is drawn first,
 * then every fill, so overlapping strokes read as a single shape.
 */
export function OutlinedStrokes({ strokes, color }: OutlinedStrokesProps) {
	return (
		<>
			{strokes.map((stroke) => (
				<path
					key={`ink-${stroke.d}`}
					d={stroke.d}
					fill="none"
					stroke={INK}
					strokeWidth={stroke.width + 8}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			))}
			{strokes.map((stroke) => (
				<path
					key={`fill-${stroke.d}`}
					d={stroke.d}
					fill="none"
					stroke={color}
					strokeWidth={stroke.width}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			))}
		</>
	);
}

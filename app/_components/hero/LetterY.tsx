import { INK } from "./heroTheme";
import { OutlinedStrokes } from "./OutlinedStrokes";

const BUDS = [
	{ x: 12, y: 33, delayMs: 0 },
	{ x: 8, y: 72, delayMs: 600 },
	{ x: 88, y: 33, delayMs: 1200 },
	{ x: 92, y: 72, delayMs: 1800 },
] as const;

/** Narnia: a stag's antlers fork into the y, tipped with glowing magic buds. */
export function LetterY() {
	return (
		<g className="hl-sway-slow">
			<OutlinedStrokes
				color="#a06d3c"
				strokes={[
					{ d: "M18 62L46 116", width: 22 },
					{ d: "M82 62L46 116", width: 22 },
					{ d: "M46 116Q42 150 30 168", width: 20 },
					{ d: "M20 66L12 36", width: 11 },
					{ d: "M31 90L9 73", width: 11 },
					{ d: "M80 66L88 36", width: 11 },
					{ d: "M65 90L91 73", width: 11 },
				]}
			/>
			{BUDS.map((bud) => (
				<circle
					key={`${bud.x}-${bud.y}`}
					className="hl-twinkle"
					cx={bud.x}
					cy={bud.y}
					r={5}
					fill="#7fe7d1"
					stroke={INK}
					strokeWidth={2.2}
					style={{ animationDelay: `${bud.delayMs}ms` }}
				/>
			))}
		</g>
	);
}

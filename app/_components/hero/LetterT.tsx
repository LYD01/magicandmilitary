import { ringPoints } from "./heroGeometry";
import { INK } from "./heroTheme";
import { OutlinedStrokes } from "./OutlinedStrokes";

const RAY_COUNT = 12;
const RAYS_FROM = ringPoints(34, 64, 36, RAY_COUNT, 15);
const RAYS_TO = ringPoints(34, 64, 47, RAY_COUNT, 15);

/** Holy: a golden cross wrapped in a slowly turning halo of rays. */
export function LetterT() {
	return (
		<>
			<circle
				className="hl-pulse"
				cx={34}
				cy={64}
				r={52}
				fill="url(#hero-glow-gold)"
			/>
			<g className="hl-spin-slow">
				{RAYS_FROM.map((from, i) => (
					<line
						key={from.angle}
						x1={from.x}
						y1={from.y}
						x2={RAYS_TO[i].x}
						y2={RAYS_TO[i].y}
						stroke="#e8b83a"
						strokeWidth={3.5}
						strokeLinecap="round"
					/>
				))}
			</g>
			<OutlinedStrokes
				color="#f1c453"
				strokes={[
					{ d: "M34 20V106Q34 126 58 122", width: 17 },
					{ d: "M12 58H56", width: 15 },
				]}
			/>
			<path
				d="M30 28V98"
				fill="none"
				stroke="#fff"
				strokeOpacity={0.45}
				strokeWidth={2.6}
				strokeLinecap="round"
			/>
			<circle
				cx={34}
				cy={58}
				r={5.5}
				fill="#d63a3a"
				stroke={INK}
				strokeWidth={2.4}
			/>
		</>
	);
}

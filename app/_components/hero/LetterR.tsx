import { INK, OUTLINE } from "./heroTheme";
import { OutlinedStrokes } from "./OutlinedStrokes";

/** Narnia: the lamp-post, with its lantern swinging from the crook of the r. */
export function LetterR() {
	return (
		<>
			<OutlinedStrokes
				color="#2f5d50"
				strokes={[{ d: "M22 116V80Q22 64 38 64Q52 64 57 72", width: 17 }]}
			/>
			<path
				d="M6 130H38L33 117H11Z"
				fill="#2f5d50"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<rect
				x={14}
				y={98}
				width={16}
				height={6}
				rx={2}
				fill="url(#hero-gold)"
				{...OUTLINE}
				strokeWidth={2.6}
			/>
			<path
				d="M17 76Q20 68 28 67"
				fill="none"
				stroke="#fff"
				strokeOpacity={0.3}
				strokeWidth={2.6}
				strokeLinecap="round"
			/>
			<g className="hl-swing">
				<circle
					className="hl-pulse"
					cx={60}
					cy={106}
					r={34}
					fill="url(#hero-glow-warm)"
				/>
				<path
					d="M60 78V90"
					fill="none"
					stroke={INK}
					strokeWidth={3}
					strokeLinecap="round"
				/>
				<path
					d="M48 100L54 91H66L72 100Z"
					fill="url(#hero-gold)"
					{...OUTLINE}
					strokeWidth={3}
				/>
				<rect
					x={51}
					y={100}
					width={18}
					height={22}
					rx={2}
					fill="url(#hero-lamp)"
					{...OUTLINE}
					strokeWidth={3}
				/>
				<rect
					x={48}
					y={122}
					width={24}
					height={6}
					rx={2}
					fill="url(#hero-gold)"
					{...OUTLINE}
					strokeWidth={3}
				/>
			</g>
		</>
	);
}

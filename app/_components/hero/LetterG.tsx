import { INK, OUTLINE } from "./heroTheme";
import { OutlinedStrokes } from "./OutlinedStrokes";

const GRID = {
	fill: "none",
	stroke: "#26361a",
	strokeWidth: 2.6,
	strokeOpacity: 0.75,
} as const;

/** Battle: a pineapple grenade body, with the safety lever sweeping down as the descender. */
export function LetterG() {
	return (
		<>
			<OutlinedStrokes
				color="#9aa194"
				strokes={[
					{
						d: "M40 50H58Q74 50 74 66V146Q74 168 52 168Q38 168 26 158",
						width: 24,
					},
				]}
			/>
			<ellipse
				cx={38}
				cy={96}
				rx={33}
				ry={35}
				fill="url(#hero-olive)"
				{...OUTLINE}
			/>
			<g clipPath="url(#hero-clip-grenade)">
				<path d="M4 82H72M4 96H72M4 110H72" {...GRID} />
				<path d="M24 60Q12 96 24 132M38 60V132M52 60Q64 96 52 132" {...GRID} />
			</g>
			<ellipse cx={26} cy={82} rx={7} ry={4} fill="#fff" fillOpacity={0.3} />
			<rect
				x={27}
				y={48}
				width={22}
				height={14}
				rx={3}
				fill="#7f857a"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<g className="hl-swing">
				<circle
					cx={17}
					cy={55}
					r={9}
					fill="none"
					stroke={INK}
					strokeWidth={8}
				/>
				<circle
					cx={17}
					cy={55}
					r={9}
					fill="none"
					stroke="#f0c040"
					strokeWidth={3.5}
				/>
			</g>
		</>
	);
}

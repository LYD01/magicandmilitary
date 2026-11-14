import { INK, OUTLINE } from "./heroTheme";

/** Letter body: width 124, cap height 14 to 130. */
const M_PATH = "M4 130V14h26l32 58 32-58h26v116H96V62L70 110H54L28 62v68z";

type BushProps = {
	x: number;
	y: number;
	scale: number;
	delayMs: number;
};

/** A leafy bush rooted at (x, y) that sways from its base. */
function Bush({ x, y, scale, delayMs }: BushProps) {
	const leaf = {
		stroke: INK,
		strokeWidth: 2.5,
		strokeLinejoin: "round",
	} as const;

	return (
		<g transform={`translate(${x} ${y}) scale(${scale})`}>
			<g className="hl-sway" style={{ animationDelay: `${delayMs}ms` }}>
				<ellipse
					cx={-17}
					cy={-26}
					rx={4.5}
					ry={9}
					transform="rotate(-38 -17 -26)"
					fill="#7cc95f"
					{...leaf}
				/>
				<ellipse
					cx={15}
					cy={-28}
					rx={4.5}
					ry={9}
					transform="rotate(34 15 -28)"
					fill="#7cc95f"
					{...leaf}
				/>
				<circle cx={-12} cy={-8} r={12} fill="#2f6a2c" {...leaf} />
				<circle cx={13} cy={-8} r={11} fill="#2f6a2c" {...leaf} />
				<circle cx={0} cy={-16} r={13} fill="#4c9a3f" {...leaf} />
				<circle cx={-4} cy={-19} r={5} fill="#79c35b" />
				<circle cx={8} cy={-12} r={3.5} fill="#79c35b" />
			</g>
		</g>
	);
}

type CamoMProps = {
	/** Mirrors where the bushes sit so the two M's do not look identical. */
	mirrored: boolean;
};

function CamoM({ mirrored }: CamoMProps) {
	return (
		<>
			<path d={M_PATH} fill="url(#hero-camo)" {...OUTLINE} />
			{mirrored ? (
				<>
					<Bush x={108} y={22} scale={1.15} delayMs={300} />
					<Bush x={18} y={134} scale={0.9} delayMs={900} />
					<Bush x={62} y={78} scale={0.5} delayMs={1500} />
				</>
			) : (
				<>
					<Bush x={16} y={22} scale={1.15} delayMs={0} />
					<Bush x={108} y={134} scale={0.9} delayMs={600} />
					<Bush x={62} y={78} scale={0.5} delayMs={1200} />
				</>
			)}
		</>
	);
}

export function LetterMForest() {
	return <CamoM mirrored={false} />;
}

export function LetterMRidge() {
	return <CamoM mirrored />;
}

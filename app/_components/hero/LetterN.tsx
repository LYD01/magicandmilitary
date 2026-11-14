import { INK, OUTLINE } from "./heroTheme";

const N_PATH =
	"M8 130V62H32V68Q42 60 58 60Q88 60 88 90V130H64V92Q64 84 54 84Q32 84 32 98V130Z";

const MERLON_X = [4, 16, 28] as const;

/** Kings and queens: a stone castle, with a banner flying from the tower. */
export function LetterN() {
	return (
		<>
			<path d={N_PATH} fill="url(#hero-brick)" {...OUTLINE} />
			<rect
				x={4}
				y={58}
				width={32}
				height={8}
				rx={1.5}
				fill="url(#hero-brick)"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			{MERLON_X.map((x) => (
				<rect
					key={x}
					x={x}
					y={46}
					width={8}
					height={13}
					fill="url(#hero-brick)"
					{...OUTLINE}
					strokeWidth={3.5}
				/>
			))}
			<rect x={17} y={82} width={6} height={17} rx={3} fill={INK} />
			<path
				d="M69 130V118Q76 107 83 118V130Z"
				fill="#7a4a24"
				stroke={INK}
				strokeWidth={3}
				strokeLinejoin="round"
			/>
			<path
				d="M20 46V8"
				fill="none"
				stroke={INK}
				strokeWidth={3.5}
				strokeLinecap="round"
			/>
			<circle
				cx={20}
				cy={6}
				r={4}
				fill="#f1c453"
				stroke={INK}
				strokeWidth={2}
			/>
			<g className="hl-wave">
				<path
					d="M22 9Q37 4 52 11Q42 17 52 24Q37 30 22 25Z"
					fill="#c8382c"
					stroke={INK}
					strokeWidth={2.8}
					strokeLinejoin="round"
				/>
				<circle cx={34} cy={17} r={3.4} fill="#ffe27a" />
			</g>
		</>
	);
}

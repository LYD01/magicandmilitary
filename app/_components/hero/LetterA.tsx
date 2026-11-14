import { ringPoints, sparklePath, starPath } from "./heroGeometry";
import { INK, OUTLINE } from "./heroTheme";

/** Single-storey "a" bowl (centre 40,96) as a ring with a hollow counter. */
const BOWL_RING =
	"M6 96a34 34 0 1 0 68 0a34 34 0 1 0-68 0zM25 96a15 15 0 1 0 30 0a15 15 0 1 0-30 0z";

const MANE_PATH = starPath(40, 96, 14, 41, 32);
const PEARLS = ringPoints(40, 96, 24.5, 8, 22.5);

/** Magic: arcane rune ring for the bowl, a wand for the stem. */
export function LetterARune() {
	return (
		<>
			<rect
				x={62}
				y={60}
				width={24}
				height={70}
				rx={6}
				fill="url(#hero-wood)"
				{...OUTLINE}
			/>
			<rect
				x={62}
				y={60}
				width={24}
				height={9}
				rx={3}
				fill="url(#hero-gold)"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<path
				d={BOWL_RING}
				fill="url(#hero-arcane)"
				fillRule="evenodd"
				{...OUTLINE}
			/>
			<circle
				className="hl-spin"
				cx={40}
				cy={96}
				r={24.5}
				fill="none"
				stroke="#ffd45c"
				strokeWidth={3.5}
				strokeDasharray="3 6.4"
			/>
			<path
				className="hl-twinkle"
				d={sparklePath(74, 44, 17)}
				fill="#ffe27a"
				stroke={INK}
				strokeWidth={2.5}
				strokeLinejoin="round"
			/>
		</>
	);
}

/** Kings and queens: a gold ring of pearls, a gold stem and a crown on top. */
export function LetterACrown() {
	return (
		<>
			<rect
				x={62}
				y={60}
				width={24}
				height={70}
				rx={6}
				fill="url(#hero-gold)"
				{...OUTLINE}
			/>
			<path
				d={BOWL_RING}
				fill="url(#hero-gold)"
				fillRule="evenodd"
				{...OUTLINE}
			/>
			{PEARLS.map((pearl) => (
				<circle
					key={pearl.angle}
					cx={pearl.x}
					cy={pearl.y}
					r={3}
					fill="#fff7d6"
					stroke={INK}
					strokeWidth={1.8}
				/>
			))}
			<g transform="rotate(-8 48 44)">
				<g className="hl-bob">
					<path
						d="M24 58L19 28L35 41L48 20L61 41L77 28L72 58Z"
						fill="url(#hero-gold)"
						{...OUTLINE}
					/>
					<rect
						x={24}
						y={50}
						width={48}
						height={9}
						rx={2}
						fill="#e0a82e"
						{...OUTLINE}
						strokeWidth={3}
					/>
					<circle
						cx={19}
						cy={27}
						r={4.5}
						fill="#e03a3a"
						stroke={INK}
						strokeWidth={2}
					/>
					<circle
						cx={48}
						cy={19}
						r={5}
						fill="#3a6fe0"
						stroke={INK}
						strokeWidth={2}
					/>
					<circle
						cx={77}
						cy={27}
						r={4.5}
						fill="#e03a3a"
						stroke={INK}
						strokeWidth={2}
					/>
					<circle cx={36} cy={54.5} r={2.6} fill="#e03a3a" />
					<circle cx={48} cy={54.5} r={2.6} fill="#3a6fe0" />
					<circle cx={60} cy={54.5} r={2.6} fill="#e03a3a" />
				</g>
			</g>
			<path
				className="hl-twinkle"
				d={sparklePath(84, 30, 9)}
				fill="#fff7d6"
				stroke={INK}
				strokeWidth={2}
				strokeLinejoin="round"
				style={{ animationDelay: "700ms" }}
			/>
		</>
	);
}

/** Narnia: the lion's mane is the bowl and his tail is the stem. */
export function LetterALion() {
	return (
		<>
			<rect
				x={76}
				y={64}
				width={24}
				height={66}
				rx={7}
				fill="#e8a93a"
				{...OUTLINE}
			/>
			<path
				d="M88 50Q101 60 99 74Q88 82 77 74Q75 60 88 50Z"
				fill="#7a3f1a"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<g className="hl-breathe">
				<path
					d={MANE_PATH}
					fill="url(#hero-mane)"
					{...OUTLINE}
					strokeWidth={3.5}
				/>
			</g>
			<circle
				cx={21}
				cy={75}
				r={7}
				fill="#e49b2c"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<circle
				cx={59}
				cy={75}
				r={7}
				fill="#e49b2c"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<circle
				cx={40}
				cy={96}
				r={24}
				fill="#f4b942"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<ellipse
				cx={40}
				cy={106}
				rx={13}
				ry={9.5}
				fill="#fbe3a6"
				stroke={INK}
				strokeWidth={2.2}
			/>
			<path
				d="M34.5 100H45.5L40 108Z"
				fill="#5a2e1e"
				stroke={INK}
				strokeWidth={1.8}
				strokeLinejoin="round"
			/>
			<path
				d="M40 108V112M40 112Q35 116 31 112M40 112Q45 116 49 112"
				fill="none"
				stroke={INK}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<g className="hl-blink">
				<circle cx={31} cy={92} r={3} fill={INK} />
				<circle cx={49} cy={92} r={3} fill={INK} />
			</g>
		</>
	);
}

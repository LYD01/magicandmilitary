import { INK, OUTLINE } from "./heroTheme";
import { OutlinedStrokes } from "./OutlinedStrokes";

/** Holy: a church candle, its flame is the dot of the i. */
export function LetterICandle() {
	return (
		<>
			<circle
				className="hl-pulse"
				cx={22}
				cy={34}
				r={34}
				fill="url(#hero-glow-warm)"
			/>
			<path
				d="M3 127H41L37 135H7Z"
				fill="url(#hero-gold)"
				{...OUTLINE}
				strokeWidth={3}
			/>
			<rect
				x={9}
				y={62}
				width={26}
				height={66}
				rx={4}
				fill="#f6eed6"
				{...OUTLINE}
			/>
			<path
				d="M9 66V84Q9 92 14 92Q19 92 19 84V68Z"
				fill="#fffbe9"
				stroke={INK}
				strokeWidth={2.4}
				strokeLinejoin="round"
			/>
			<path
				d="M22 92V112M14 100H30"
				fill="none"
				stroke="#b8892c"
				strokeWidth={3.5}
				strokeLinecap="round"
			/>
			<path
				d="M22 62V52"
				fill="none"
				stroke={INK}
				strokeWidth={3}
				strokeLinecap="round"
			/>
			<g className="hl-flicker">
				<path
					d="M22 10Q35 27 33 40Q31 53 22 53Q13 53 11 40Q9 27 22 10Z"
					fill="#ff9a2e"
					{...OUTLINE}
					strokeWidth={3}
				/>
				<path
					d="M22 27Q29 37 28 44Q27 50 22 50Q17 50 16 44Q15 37 22 27Z"
					fill="#ffe27a"
				/>
			</g>
		</>
	);
}

/** Military: a rifle cartridge for the stem, an army helmet for the dot. */
export function LetterICartridge() {
	return (
		<>
			<path
				d="M14 86V74Q14 64 22 58Q30 64 30 74V86Z"
				fill="url(#hero-copper)"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<path
				d="M12 86H32L35 100V130H9V100Z"
				fill="url(#hero-brass)"
				{...OUTLINE}
			/>
			<rect
				x={6}
				y={123}
				width={32}
				height={9}
				rx={2}
				fill="url(#hero-brass)"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<path
				d="M9 116H35"
				fill="none"
				stroke={INK}
				strokeWidth={2.4}
				strokeLinecap="round"
			/>
			<g className="hl-bob">
				<path
					d="M2 46Q2 18 22 18Q42 18 42 46Z"
					fill="url(#hero-camo)"
					{...OUTLINE}
				/>
				<rect
					x={-3}
					y={43}
					width={50}
					height={8}
					rx={3.5}
					fill="#46552d"
					{...OUTLINE}
					strokeWidth={3.5}
				/>
				<path
					d="M22 25L24 31H30L25 35L27 41L22 37.5L17 41L19 35L14 31H20Z"
					fill="#ffe27a"
					stroke={INK}
					strokeWidth={1.6}
					strokeLinejoin="round"
				/>
			</g>
		</>
	);
}

/** Battle magic: a vine-wrapped staff for the stem, a fireball for the dot. */
export function LetterIStaff() {
	return (
		<>
			<circle
				className="hl-pulse"
				cx={22}
				cy={32}
				r={32}
				fill="url(#hero-glow-fire)"
			/>
			<rect
				x={12}
				y={62}
				width={20}
				height={68}
				rx={5}
				fill="url(#hero-wood)"
				{...OUTLINE}
			/>
			<path
				d="M12 80L32 72M12 98L32 90M12 116L32 108"
				fill="none"
				stroke="#4fae45"
				strokeWidth={3.5}
				strokeLinecap="round"
			/>
			<OutlinedStrokes
				color="#f1c453"
				strokes={[
					{ d: "M12 62Q4 52 11 45", width: 4 },
					{ d: "M32 62Q40 52 33 45", width: 4 },
				]}
			/>
			<g className="hl-flicker">
				<path
					d="M22 6Q30 16 34 24Q41 32 34 42Q28 52 22 52Q14 52 9 42Q3 32 12 24Q14 30 18 28Q16 17 22 6Z"
					fill="url(#hero-fire)"
					{...OUTLINE}
					strokeWidth={3}
				/>
				<path
					d="M22 26Q28 34 27 41Q26 47 22 47Q18 47 17 41Q16 34 22 26Z"
					fill="#fff2a0"
				/>
			</g>
			<circle className="hl-ember" cx={12} cy={14} r={2.4} fill="#ffd45c" />
			<circle
				className="hl-ember"
				cx={32}
				cy={12}
				r={2.4}
				fill="#ffd45c"
				style={{ animationDelay: "700ms" }}
			/>
			<circle
				className="hl-ember"
				cx={22}
				cy={4}
				r={2}
				fill="#ffb347"
				style={{ animationDelay: "1300ms" }}
			/>
		</>
	);
}

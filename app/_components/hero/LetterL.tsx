import { INK, OUTLINE } from "./heroTheme";

/** Military: a .50 cal round, standing tall as the l. */
export function LetterL() {
	return (
		<>
			<path
				d="M11 56H29L32 80V130H8V80Z"
				fill="url(#hero-brass)"
				{...OUTLINE}
			/>
			<path
				d="M10 58V36Q10 14 20 2Q30 14 30 36V58Z"
				fill="url(#hero-copper)"
				{...OUTLINE}
			/>
			<path
				d="M12.4 20Q15.5 10 20 4Q24.5 10 27.6 20Z"
				fill="#c8382c"
				stroke={INK}
				strokeWidth={2.4}
				strokeLinejoin="round"
			/>
			<rect
				x={5}
				y={123}
				width={30}
				height={9}
				rx={2}
				fill="url(#hero-brass)"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<path
				d="M8 116H32"
				fill="none"
				stroke={INK}
				strokeWidth={2.4}
				strokeLinecap="round"
			/>
			<path
				d="M14.5 62V112"
				fill="none"
				stroke="#fff"
				strokeOpacity={0.4}
				strokeWidth={3}
				strokeLinecap="round"
			/>
			<g clipPath="url(#hero-clip-bullet)">
				<rect
					className="hl-gleam"
					x={4}
					y={134}
					width={12}
					height={26}
					fill="#fff"
					opacity={0}
				/>
			</g>
		</>
	);
}

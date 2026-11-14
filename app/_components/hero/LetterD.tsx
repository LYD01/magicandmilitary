import { INK, OUTLINE } from "./heroTheme";

/** Holy and battle: a crusader shield for the bowl, a sword planted in the ground as the stem. */
export function LetterD() {
	return (
		<>
			<circle cx={36} cy={96} r={34} fill="url(#hero-shield)" {...OUTLINE} />
			<circle
				cx={36}
				cy={96}
				r={27}
				fill="none"
				stroke="#f1c453"
				strokeWidth={3}
				strokeDasharray="1 6"
				strokeLinecap="round"
			/>
			<path
				d="M36 76V116M16 96H56"
				fill="none"
				stroke={INK}
				strokeWidth={13}
				strokeLinecap="round"
			/>
			<path
				d="M36 76V116M16 96H56"
				fill="none"
				stroke="#f1c453"
				strokeWidth={8}
				strokeLinecap="round"
			/>

			<path
				d="M66 38H86V118L76 134L66 118Z"
				fill="url(#hero-steel)"
				{...OUTLINE}
			/>
			<path
				d="M76 44V116"
				fill="none"
				stroke="#6b7380"
				strokeWidth={2.6}
				strokeLinecap="round"
			/>
			<g clipPath="url(#hero-clip-blade)">
				<rect
					className="hl-gleam"
					x={63}
					y={134}
					width={9}
					height={26}
					fill="#fff"
					opacity={0}
				/>
			</g>
			<rect
				x={70}
				y={17}
				width={12}
				height={15}
				rx={2}
				fill="#7a3b2a"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
			<path
				d="M70 22L82 25M70 27L82 30"
				fill="none"
				stroke={INK}
				strokeWidth={1.8}
			/>
			<rect
				x={52}
				y={29}
				width={48}
				height={10}
				rx={5}
				fill="url(#hero-gold)"
				{...OUTLINE}
			/>
			<circle
				cx={76}
				cy={11}
				r={6.5}
				fill="url(#hero-gold)"
				{...OUTLINE}
				strokeWidth={3.5}
			/>
		</>
	);
}

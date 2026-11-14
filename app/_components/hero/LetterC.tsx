import { sparklePath } from "./heroGeometry";
import { INK, OUTLINE } from "./heroTheme";

/** Crescent: big circle (40,96 r34) minus a smaller one offset to the right (56,96 r27). */
const CRESCENT =
	"M61.34 69.53A34 34 0 1 0 61.34 122.47A27 27 0 1 1 61.34 69.53Z";

/** Magic: a crescent moon with stars caught in its mouth. */
export function LetterC() {
	return (
		<>
			<circle
				className="hl-pulse"
				cx={40}
				cy={96}
				r={48}
				fill="url(#hero-glow-moon)"
			/>
			<path d={CRESCENT} fill="url(#hero-moon)" {...OUTLINE} />
			<circle cx={21} cy={86} r={4} fill="#000" fillOpacity={0.14} />
			<circle cx={17} cy={103} r={3} fill="#000" fillOpacity={0.14} />
			<circle cx={25} cy={113} r={3.6} fill="#000" fillOpacity={0.14} />
			<path
				className="hl-twinkle"
				d={sparklePath(66, 96, 11)}
				fill="#fff7d6"
				stroke={INK}
				strokeWidth={2.2}
				strokeLinejoin="round"
			/>
			<path
				className="hl-twinkle"
				d={sparklePath(72, 78, 6)}
				fill="#fff7d6"
				stroke={INK}
				strokeWidth={1.8}
				strokeLinejoin="round"
				style={{ animationDelay: "900ms" }}
			/>
		</>
	);
}

/** Pure SVG path helpers for the hero letters. */

function point(x: number, y: number): string {
	return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

/** Spiky star polygon, used for the lion's mane. */
export function starPath(
	cx: number,
	cy: number,
	spikes: number,
	outer: number,
	inner: number,
): string {
	const points: string[] = [];

	for (let i = 0; i < spikes * 2; i += 1) {
		const radius = i % 2 === 0 ? outer : inner;
		const angle = (Math.PI * i) / spikes - Math.PI / 2;
		points.push(
			point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)),
		);
	}

	return `M${points.join("L")}Z`;
}

/** Four-point concave sparkle, used for magic glints and stars. */
export function sparklePath(cx: number, cy: number, r: number): string {
	const c = point(cx, cy);

	return [
		`M${point(cx, cy - r)}`,
		`Q${c} ${point(cx + r, cy)}`,
		`Q${c} ${point(cx, cy + r)}`,
		`Q${c} ${point(cx - r, cy)}`,
		`Q${c} ${point(cx, cy - r)}Z`,
	].join("");
}

/** Points on a circle, used for beads and rays. */
export function ringPoints(
	cx: number,
	cy: number,
	radius: number,
	count: number,
	startDeg = 0,
): { x: number; y: number; angle: number }[] {
	return Array.from({ length: count }, (_, i) => {
		const angle = startDeg + (360 / count) * i;
		const rad = (angle * Math.PI) / 180;

		return {
			x: Number((cx + radius * Math.cos(rad)).toFixed(2)),
			y: Number((cy + radius * Math.sin(rad)).toFixed(2)),
			angle,
		};
	});
}

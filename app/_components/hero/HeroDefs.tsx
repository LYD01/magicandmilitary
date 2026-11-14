type StopProps = { offset: string; color: string; opacity?: number };

function Stops({ stops }: { stops: StopProps[] }) {
	return (
		<>
			{stops.map((stop) => (
				<stop
					key={`${stop.offset}-${stop.color}`}
					offset={stop.offset}
					stopColor={stop.color}
					stopOpacity={stop.opacity ?? 1}
				/>
			))}
		</>
	);
}

type CylinderProps = { id: string; stops: StopProps[] };

/** Horizontal gradient that shades a shape like a rounded metal cylinder. */
function Cylinder({ id, stops }: CylinderProps) {
	return (
		<linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
			<Stops stops={stops} />
		</linearGradient>
	);
}

function Glow({ id, color }: { id: string; color: string }) {
	return (
		<radialGradient id={id}>
			<Stops
				stops={[
					{ offset: "0", color, opacity: 0.75 },
					{ offset: "0.55", color, opacity: 0.3 },
					{ offset: "1", color, opacity: 0 },
				]}
			/>
		</radialGradient>
	);
}

/**
 * Paint servers and clip paths shared by every hero letter. Rendered once,
 * as a zero-size (not `display: none`) SVG so other SVGs can still reference it.
 */
export function HeroDefs() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			width="0"
			height="0"
			className="absolute"
		>
			<defs>
				<pattern
					id="hero-camo"
					width="64"
					height="64"
					patternUnits="userSpaceOnUse"
				>
					<rect width="64" height="64" fill="#6b7d3f" />
					<path d="M2 12Q8 2 22 6Q32 14 22 24Q8 30 2 22Z" fill="#33421f" />
					<path d="M36 6Q50 0 60 10Q64 22 52 26Q38 22 36 6Z" fill="#b09a60" />
					<path d="M6 40Q18 34 28 42Q30 54 16 58Q4 56 6 40Z" fill="#7a5a30" />
					<path
						d="M34 44Q46 36 58 46Q58 58 44 60Q32 58 34 44Z"
						fill="#33421f"
					/>
					<path d="M26 28Q34 24 38 32Q34 40 26 36Z" fill="#b09a60" />
				</pattern>
				<pattern
					id="hero-brick"
					width="24"
					height="16"
					patternUnits="userSpaceOnUse"
				>
					<rect width="24" height="16" fill="#b8bbb4" />
					<path
						d="M0 0H24M0 8H24M12 0V8M0 8V16M24 8V16"
						fill="none"
						stroke="#6c716b"
						strokeWidth="1.6"
					/>
				</pattern>

				<Cylinder
					id="hero-brass"
					stops={[
						{ offset: "0", color: "#9c6a1c" },
						{ offset: "0.35", color: "#f6da7e" },
						{ offset: "0.7", color: "#d1a03a" },
						{ offset: "1", color: "#8d5f18" },
					]}
				/>
				<Cylinder
					id="hero-copper"
					stops={[
						{ offset: "0", color: "#86441c" },
						{ offset: "0.4", color: "#ec9f60" },
						{ offset: "1", color: "#86441c" },
					]}
				/>
				<Cylinder
					id="hero-steel"
					stops={[
						{ offset: "0", color: "#7c8590" },
						{ offset: "0.4", color: "#f0f3f6" },
						{ offset: "1", color: "#7c8590" },
					]}
				/>
				<Cylinder
					id="hero-wood"
					stops={[
						{ offset: "0", color: "#5b3416" },
						{ offset: "0.5", color: "#a06a38" },
						{ offset: "1", color: "#5b3416" },
					]}
				/>
				<Cylinder
					id="hero-gold"
					stops={[
						{ offset: "0", color: "#b8821d" },
						{ offset: "0.45", color: "#ffe58a" },
						{ offset: "1", color: "#c8921f" },
					]}
				/>

				<radialGradient id="hero-arcane">
					<Stops
						stops={[
							{ offset: "0", color: "#7a46dd" },
							{ offset: "1", color: "#33187a" },
						]}
					/>
				</radialGradient>
				<radialGradient id="hero-olive" cx="0.35" cy="0.3" r="0.8">
					<Stops
						stops={[
							{ offset: "0", color: "#93b25e" },
							{ offset: "1", color: "#476026" },
						]}
					/>
				</radialGradient>
				<radialGradient id="hero-mane">
					<Stops
						stops={[
							{ offset: "0", color: "#f29a2c" },
							{ offset: "1", color: "#8a3a12" },
						]}
					/>
				</radialGradient>
				<radialGradient id="hero-shield" cx="0.4" cy="0.35" r="0.8">
					<Stops
						stops={[
							{ offset: "0", color: "#5088d6" },
							{ offset: "1", color: "#1d3b80" },
						]}
					/>
				</radialGradient>
				<radialGradient id="hero-fire" cx="0.5" cy="0.65" r="0.65">
					<Stops
						stops={[
							{ offset: "0", color: "#fff2a0" },
							{ offset: "0.5", color: "#ff9a2e" },
							{ offset: "1", color: "#e0371f" },
						]}
					/>
				</radialGradient>
				<linearGradient id="hero-moon" x1="0" y1="0" x2="1" y2="1">
					<Stops
						stops={[
							{ offset: "0", color: "#fff6c4" },
							{ offset: "1", color: "#dcb23a" },
						]}
					/>
				</linearGradient>
				<linearGradient id="hero-lamp" x1="0" y1="0" x2="0" y2="1">
					<Stops
						stops={[
							{ offset: "0", color: "#fff3ac" },
							{ offset: "1", color: "#ffc84a" },
						]}
					/>
				</linearGradient>

				<Glow id="hero-glow-warm" color="#ffb347" />
				<Glow id="hero-glow-gold" color="#ffd45c" />
				<Glow id="hero-glow-fire" color="#ff7a2e" />
				<Glow id="hero-glow-moon" color="#9cc4ff" />

				<clipPath id="hero-clip-grenade">
					<ellipse cx="38" cy="96" rx="33" ry="35" />
				</clipPath>
				<clipPath id="hero-clip-blade">
					<path d="M66 38H86V118L76 134L66 118Z" />
				</clipPath>
				<clipPath id="hero-clip-bullet">
					<path d="M10 56V36Q10 14 20 2Q30 14 30 36V56L32 80V130H8V80L10 56Z" />
				</clipPath>
			</defs>
		</svg>
	);
}

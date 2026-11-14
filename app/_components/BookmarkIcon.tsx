type BookmarkIconProps = {
	filled?: boolean;
	className?: string;
};

/** Decorative bookmark glyph; the surrounding control carries the accessible name. */
export function BookmarkIcon({
	filled = false,
	className = "h-4 w-4",
}: BookmarkIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth={2}
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			className={className}
		>
			<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
		</svg>
	);
}

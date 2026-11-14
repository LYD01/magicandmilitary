import { NextResponse } from "next/server";

/**
 * Request proxy (Next.js 16+; replaces deprecated `middleware`).
 * Pass-through placeholder until protected routes need a gate
 * (e.g. admin cookie check — see mensculture `proxy.ts`).
 */
export function proxy() {
	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Skip Next internals and static assets. Narrow further when
		 * adding protected routes (e.g. matcher: "/admin/:path*").
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

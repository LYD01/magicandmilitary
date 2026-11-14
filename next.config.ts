import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static (nonce-free) CSP: per-request nonces force dynamic rendering and would
// break the prerendered shell from `cacheComponents`. Host allowlists cover GTM
// + AdSense; AdSense prefers strict nonce CSP, but that conflicts with caching.
const gtmScript = "https://www.googletagmanager.com";
const adsScript = [
	"https://pagead2.googlesyndication.com",
	"https://www.googleadservices.com",
	"https://www.google.com",
	"https://partner.googleadservices.com",
	"https://tpc.googlesyndication.com",
	"https://www.gstatic.com",
	"https://fundingchoicesmessages.google.com",
].join(" ");

const googleImg = [
	"https://www.googletagmanager.com",
	"https://*.google-analytics.com",
	"https://*.googlesyndication.com",
	"https://*.g.doubleclick.net",
	"https://*.google.com",
	"https://www.googleadservices.com",
	"https://googleads.g.doubleclick.net",
	"https://pagead2.googlesyndication.com",
].join(" ");

const googleConnect = [
	"https://www.googletagmanager.com",
	"https://*.google-analytics.com",
	"https://*.google.com",
	"https://*.g.doubleclick.net",
	"https://pagead2.googlesyndication.com",
	"https://www.googleadservices.com",
	"https://googleads.g.doubleclick.net",
	"https://ad.doubleclick.net",
	"https://*.googlesyndication.com",
	"https://fundingchoicesmessages.google.com",
	"https://ep1.adtrafficquality.google",
	"https://ep2.adtrafficquality.google",
].join(" ");

const googleFrame = [
	"https://www.googletagmanager.com",
	"https://tpc.googlesyndication.com",
	"https://googleads.g.doubleclick.net",
	"https://*.doubleclick.net",
	"https://*.googlesyndication.com",
	"https://www.google.com",
	"https://fundingchoicesmessages.google.com",
	"https://ep1.adtrafficquality.google",
	"https://ep2.adtrafficquality.google",
].join(" ");

const contentSecurityPolicy = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${gtmScript} ${adsScript}`,
	"style-src 'self' 'unsafe-inline'",
	`img-src 'self' blob: data: ${googleImg}`,
	"font-src 'self'",
	`connect-src 'self'${isDev ? " ws:" : ""} ${googleConnect}`,
	`frame-src ${googleFrame}`,
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
	{ key: "Content-Security-Policy", value: contentSecurityPolicy },
	{ key: "Strict-Transport-Security", value: "max-age=63072000" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

const nextConfig: NextConfig = {
	experimental: {
		agentFeedback: true,
	},
	cacheComponents: true,
	partialPrefetching: true,
	poweredByHeader: false,
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
};

export default nextConfig;

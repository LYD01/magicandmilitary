import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { ConsentBanner, SiteHeader } from "@components";
import { SITE_DESCRIPTION, SITE_TITLE } from "@constants";
import { CONSENT_INIT_SCRIPT, THEME_INIT_SCRIPT } from "@utils";

import "./globals.css";

const GTM_ID = "GTM-MXS69RJJ";
const ADSENSE_CLIENT = "ca-pub-6999297880306274";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: SITE_TITLE,
		template: `%s · ${SITE_TITLE}`,
	},
	description: SITE_DESCRIPTION,
	other: {
		"google-adsense-account": ADSENSE_CLIENT,
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			{/* AdSense injects its own <script> into <head> before hydration; suppress the resulting mismatch. */}
			<head suppressHydrationWarning>
				<script
					suppressHydrationWarning
					// biome-ignore lint/security/noDangerouslySetInnerHtml: theme init before paint
					dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
				/>
			</head>
			<body className="min-h-full flex flex-col">
				<Script id="gtm-init" strategy="afterInteractive">
					{CONSENT_INIT_SCRIPT}
				</Script>
				<Script
					src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
					strategy="afterInteractive"
				/>
				{/* Plain <script>: next/script adds data-nscript, which AdSense rejects. */}
				<script
					async
					src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
					crossOrigin="anonymous"
				/>
				<SiteHeader />
				{children}
				<ConsentBanner />
			</body>
		</html>
	);
}

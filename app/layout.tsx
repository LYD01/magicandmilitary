import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { SITE_DESCRIPTION, SITE_TITLE } from "@constants";

import "./globals.css";

const GTM_ID = "GTM-MXS69RJJ";

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Script id="gtm-init" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });`}
				</Script>
				<Script
					src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
					strategy="afterInteractive"
				/>
				{children}
			</body>
		</html>
	);
}

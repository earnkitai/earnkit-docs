import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { getPageMap } from "nextra/page-map";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "EarnKit Documentation",
	description: "EarnKit Documentation",
};

const navbar = (
	<Navbar
		logo={
			<div className="flex flex-row items-center gap-3">
				<Image
					src="/logo.png"
					alt="EarnKit Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<span className="font-mono text-2xl">EarnKit</span>
			</div>
		}
	/>
);
const footer = (
	<Footer>© {new Date().getFullYear()} EarnKit AI. All rights reserved.</Footer>
);

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Layout
					navbar={navbar}
					pageMap={await getPageMap()}
					docsRepositoryBase="https://github.com/rayvego/earnkit-assignment/tree/main/apps/web"
					footer={footer}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}

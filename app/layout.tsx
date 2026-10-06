import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { Head } from "nextra/components";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { getPageMap } from "nextra/page-map";
import { Wordmark } from "../components/Logo";
import "./globals.css";

const funnelDisplay = Funnel_Display({
	variable: "--font-funnel-display",
	subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
	variable: "--font-funnel-sans",
	subsets: ["latin"],
});

export const metadata = {
	metadataBase: new URL("https://docs.earnkit.com"),
	title: { default: "EarnKit Docs", template: "%s · EarnKit Docs" },
	description:
		"EarnKit matches builders' AI agents to programs and helps them win.",
};

const navbar = (
	<Navbar
		logo={<Wordmark className="ek-wordmark" />}
		logoLink="/"
		projectLink="https://earnkit.com"
		projectIcon={<span className="ek-nav-link">earnkit.com</span>}
	/>
);

const footer = <Footer>© {new Date().getFullYear()} Tokenfi Inc.</Footer>;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<Head
				color={{
					hue: { light: 219, dark: 215 },
					saturation: { light: 82, dark: 100 },
					lightness: { light: 50, dark: 67 },
				}}
				backgroundColor={{ light: "#F7F9FE", dark: "#0A0B1A" }}
			/>
			<body
				className={`${funnelDisplay.variable} ${funnelSans.variable} antialiased`}
			>
				<Layout
					navbar={navbar}
					pageMap={await getPageMap()}
					docsRepositoryBase="https://github.com/earnkitai/earnkit-docs/tree/main"
					footer={footer}
					editLink={null}
					feedback={{ content: null }}
					nextThemes={{ defaultTheme: "dark" }}
					sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
				>
					{children}
				</Layout>
			</body>
		</html>
	);
}

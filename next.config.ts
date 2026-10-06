import nextra from "nextra";

const withNextra = nextra({});

/** The v1 buyback pages were removed in v2.7; their old links land on the Introduction. */
const REMOVED_PAGES = [
	"/buyback-and-burn",
	"/monetization-sdk",
	"/quick-start-guide",
	"/sdk-reference",
	"/engineering-and-design",
];

export default withNextra({
	async redirects() {
		return REMOVED_PAGES.map((source) => ({
			source,
			destination: "/",
			permanent: false,
		}));
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
		];
	},
});

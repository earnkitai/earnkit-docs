/**
 * Live numbers from earnkit.com/api/stats, read server-side and revalidated every 10 minutes
 * (Ruling 24): one read per 10 minutes at most, nothing from the browser. On any failure (network,
 * non-200, a missing field) it shows a link to earnkit.com instead of numbers.
 *
 * C18: weak figures are hidden, the way earnkit.com's landing hides them (v2.7 Ruling 20): open
 * money always shows; agents earning only at 100 or more (INSTALLS_SHOWN_FROM); every other
 * count only when above 0.
 */

import { Table } from "nextra/components";

const STATS_URL = "https://earnkit.com/api/stats";

/** earnkit.com landing.ts INSTALLS_SHOWN_FROM: installs are hidden under 100 (spec §1). */
const INSTALLS_SHOWN_FROM = 100;

type Stats = {
	open_money_usd: number;
	programs_open: number;
	bonus_programs_open: number;
	coins_launched: number;
	bonus_paid_eth: number;
	installs: number;
};

const KEYS: (keyof Stats)[] = [
	"open_money_usd",
	"programs_open",
	"bonus_programs_open",
	"coins_launched",
	"bonus_paid_eth",
	"installs",
];

async function readStats(): Promise<Stats | null> {
	try {
		const res = await fetch(STATS_URL, { next: { revalidate: 600 } });
		if (!res.ok) return null;
		const body = (await res.json()) as Record<string, unknown>;
		for (const k of KEYS)
			if (typeof body[k] !== "number" || !Number.isFinite(body[k])) return null;
		return body as unknown as Stats;
	} catch {
		return null;
	}
}

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const int = (n: number) => n.toLocaleString("en-US");
const eth = (n: number) =>
	`${n.toLocaleString("en-US", { maximumFractionDigits: 4 })} ETH`;

function Fallback() {
	return (
		<p>
			Live numbers: <a href="https://earnkit.com">earnkit.com</a>
		</p>
	);
}

export default async function LiveNumbers() {
	const s = await readStats();
	if (!s) return <Fallback />;
	const rows: [string, string][] = [["Open money", usd(s.open_money_usd)]];
	if (s.programs_open > 0) rows.push(["Programs open", int(s.programs_open)]);
	if (s.bonus_programs_open > 0)
		rows.push(["Programs with a builder bonus", int(s.bonus_programs_open)]);
	if (s.installs >= INSTALLS_SHOWN_FROM) rows.push(["Agents earning", int(s.installs)]);
	if (s.coins_launched > 0) rows.push(["Tokens launched", int(s.coins_launched)]);
	if (s.bonus_paid_eth > 0) rows.push(["Builder bonus paid", eth(s.bonus_paid_eth)]);
	return (
		<Table className="mt-6">
			<thead>
				<Table.Tr>
					<Table.Th>Live, from earnkit.com</Table.Th>
					<Table.Th style={{ textAlign: "right" }}>Now</Table.Th>
				</Table.Tr>
			</thead>
			<tbody>
				{rows.map(([label, value]) => (
					<Table.Tr key={label}>
						<Table.Td>{label}</Table.Td>
						<Table.Td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
							{value}
						</Table.Td>
					</Table.Tr>
				))}
			</tbody>
		</Table>
	);
}

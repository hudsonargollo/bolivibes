/**
 * Standard fixed official Bolivian exchange rate (USD to BOB) with KV support.
 */
export const DEFAULT_USD_TO_BOB_RATE = 6.96;

export async function getUsdToBobRate(kv?: { get: (key: string) => Promise<string | null> }): Promise<number> {
  if (!kv) return DEFAULT_USD_TO_BOB_RATE;
  try {
    const raw = await kv.get("current_usd_bob_rate");
    if (!raw) return DEFAULT_USD_TO_BOB_RATE;
    const data = JSON.parse(raw);
    return typeof data.rate === "number" ? data.rate : DEFAULT_USD_TO_BOB_RATE;
  } catch {
    return DEFAULT_USD_TO_BOB_RATE;
  }
}

export function convertUsdToBob(usd: number, rate = DEFAULT_USD_TO_BOB_RATE): number {
  return Number((usd * rate).toFixed(2));
}

export function formatUsd(usd: number): string {
  return `$${usd.toFixed(2)} USD`;
}

export function formatBob(bob: number): string {
  return `${bob.toFixed(2)} BOB`;
}

export function formatDualPrice(usd: number, rate = DEFAULT_USD_TO_BOB_RATE): string {
  const bob = convertUsdToBob(usd, rate);
  return `$${usd.toFixed(2)} USD (~${bob} BOB)`;
}

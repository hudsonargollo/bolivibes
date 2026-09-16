/**
 * Standard fixed official Bolivian exchange rate (USD to BOB).
 * Can be overridden or synchronized daily.
 */
export const USD_TO_BOB_RATE = 6.96;

export function convertUsdToBob(usd: number): number {
  return Number((usd * USD_TO_BOB_RATE).toFixed(2));
}

export function formatUsd(usd: number): string {
  return `$${usd.toFixed(2)} USD`;
}

export function formatBob(bob: number): string {
  return `${bob.toFixed(2)} BOB`;
}

export function formatDualPrice(usd: number): string {
  const bob = convertUsdToBob(usd);
  return `$${usd.toFixed(2)} USD (~${bob} BOB)`;
}

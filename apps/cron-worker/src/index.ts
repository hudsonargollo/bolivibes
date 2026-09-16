import { createDb } from "@bolivibes/db";
import { sendWeeklyDigest, sendWeekendRoundup } from "@bolivibes/notifications";

const TUESDAY_DIGEST_CRON = "0 13 * * 2";
const WEEKEND_ROUNDUP_CRON = "0 13 * * 5";
const EXCHANGE_RATE_CRON_1 = "0 14 * * *"; // 10:00 AM local Santa Cruz (UTC-4) = 14:00 UTC
const EXCHANGE_RATE_CRON_2 = "0 21 * * *"; // 5:00 PM local Santa Cruz (UTC-4) = 21:00 UTC

async function updateUsdBobRate(env: CloudflareEnv) {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("Failed to fetch forex rates");
    const data = (await res.json()) as { rates?: { BOB?: number } };
    const rate = data?.rates?.BOB ?? 6.96;

    await env.BOLIVIBES_KV.put(
      "current_usd_bob_rate",
      JSON.stringify({ rate, updatedAt: new Date().toISOString() }),
    );
    console.log(`[cron] USD to BOB exchange rate updated: 1 USD = ${rate} BOB`);
  } catch (err) {
    console.error("[cron] failed to update exchange rate, keeping fallback 6.96", err);
  }
}

export default {
  async scheduled(controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    const db = createDb(env.DB);

    switch (controller.cron) {
      case TUESDAY_DIGEST_CRON:
        ctx.waitUntil(
          sendWeeklyDigest(db, env.RESEND_API_KEY).then((r) =>
            console.log(`[cron] weekly digest sent to ${r.sent} recipients`),
          ),
        );
        break;
      case WEEKEND_ROUNDUP_CRON:
        ctx.waitUntil(
          sendWeekendRoundup(db, env.RESEND_API_KEY).then((r) =>
            console.log(`[cron] weekend roundup sent to ${r.sent} recipients`),
          ),
        );
        break;
      case EXCHANGE_RATE_CRON_1:
      case EXCHANGE_RATE_CRON_2:
        ctx.waitUntil(updateUsdBobRate(env));
        break;
      default:
        console.warn(`[cron] no handler registered for schedule "${controller.cron}"`);
    }
  },
} satisfies ExportedHandler<CloudflareEnv>;

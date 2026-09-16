import { cf } from "@/lib/cloudflare";
import AssetManagerClient from "./asset-manager-client";

async function listRecentAssets() {
  const { env } = cf();
  const result = await env.EVENT_ASSETS.list({ limit: 100 });
  return result.objects.sort((a, b) => new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime());
}

export default async function AdminAssetsPage() {
  const assets = await listRecentAssets();
  return <AssetManagerClient initialAssets={assets} />;
}

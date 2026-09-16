"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cf } from "@/lib/cloudflare";
import { requireAdminAction, formString } from "./require-admin";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_FOLDERS = new Set(["brand", "events", "payment", "documents", "misc"]);
const ALLOWED_TYPES = new Set([
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/svg+xml",
  "application/pdf",
]);

function slugFileName(name: string) {
  const trimmed = name.trim().toLowerCase();
  const dot = trimmed.lastIndexOf(".");
  const base = dot > 0 ? trimmed.slice(0, dot) : trimmed;
  const ext = dot > 0 ? trimmed.slice(dot + 1) : "";
  const safeBase = base.replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "asset";
  const safeExt = ext.replace(/[^a-z0-9]+/g, "");
  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}

function contentTypeFor(file: File, filename: string) {
  if (file.type && ALLOWED_TYPES.has(file.type)) return file.type;
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  if (filename.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}

function normalizeAssetKey(key: string) {
  const normalized = key.trim();
  const [folder] = normalized.split("/");
  if (!folder || !ALLOWED_FOLDERS.has(folder)) return null;
  if (!normalized.includes("/") || normalized.includes("..") || normalized.startsWith("/") || normalized.endsWith("/")) return null;
  return normalized;
}

function asciiOnly(str: string) {
  return str.replace(/[^\x20-\x7E]/g, "").slice(0, 120);
}

export async function uploadAdminAssets(formData: FormData) {
  const session = await requireAdminAction();
  const folder = formString(formData, "folder") || "misc";
  if (!ALLOWED_FOLDERS.has(folder)) throw new Error("Invalid asset folder");

  const files = formData.getAll("assets").filter((v): v is File => v instanceof File && v.size > 0);
  if (files.length === 0) {
    const single = formData.get("asset");
    if (single instanceof File && single.size > 0) files.push(single);
  }
  if (files.length === 0) throw new Error("Choose at least one file to upload");

  const { env } = cf();
  const uploadedUrls: string[] = [];

  for (const file of files) {
    if (file.size > MAX_UPLOAD_BYTES) continue;
    const originalName = file.name || "asset";
    const filename = slugFileName(originalName);
    const contentType = contentTypeFor(file, filename);
    if (!ALLOWED_TYPES.has(contentType)) continue;

    const key = `${folder}/${crypto.randomUUID()}-${filename}`;
    const bytes = await file.arrayBuffer();

    await env.EVENT_ASSETS.put(key, bytes, {
      httpMetadata: { contentType },
      customMetadata: {
        originalName: asciiOnly(originalName),
        uploadedBy: asciiOnly(session.email ?? session.userId),
        uploadedAt: new Date().toISOString(),
      },
    });
    uploadedUrls.push(`/api/assets/${key}`);
  }

  revalidatePath("/admin/assets");
  return { success: true, count: uploadedUrls.length, urls: uploadedUrls };
}

export async function deleteAdminAsset(formData: FormData) {
  await requireAdminAction();
  const key = normalizeAssetKey(formString(formData, "key"));
  if (!key) throw new Error("Invalid asset key");

  const { env } = cf();
  await env.EVENT_ASSETS.delete(key);

  revalidatePath("/admin/assets");
  redirect(`/admin/assets?deleted=${encodeURIComponent(key)}`);
}

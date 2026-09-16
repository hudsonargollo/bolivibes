"use client";

import { useState, useTransition } from "react";
import { uploadAdminAssets, deleteAdminAsset } from "../actions/assets";

interface AssetObject {
  key: string;
  size: number;
  uploaded: string | Date;
  httpMetadata?: { contentType?: string };
  customMetadata?: { originalName?: string };
}

const FOLDERS = ["all", "brand", "events", "payment", "documents", "misc"] as const;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AssetManagerClient({ initialAssets }: { initialAssets: AssetObject[] }) {
  const [assets] = useState<AssetObject[]>(initialAssets);
  const [selectedFolder, setSelectedFolder] = useState<string>("brand");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  async function handleFilesUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError(null);
    setSuccessMsg(null);
    setUploading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await uploadAdminAssets(formData);
      if (res.success) {
        setSuccessMsg(`Successfully uploaded ${res.count} file(s)!`);
        form.reset();
        window.location.reload();
      }
    } catch (err: any) {
      setUploadError(err?.message || "Upload failed. Please check file size (max 10MB) and format.");
    } finally {
      setUploading(false);
    }
  }

  async function handleCopyUrl(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      alert("Failed to copy URL");
    }
  }

  const filteredAssets = assets.filter((obj) => {
    const [folder] = obj.key.split("/");
    const matchesFolder = selectedFolder === "all" || folder === selectedFolder;
    const matchesSearch = obj.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (obj.customMetadata?.originalName ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="a-card space-y-4" style={{ padding: 24 }}>
        <h2 className="text-base font-bold text-stone-100">Upload Multiple Assets</h2>
        <p className="a-muted text-xs">
          Select one or multiple files (WEBP, PNG, JPG, SVG, PDF up to 10 MB each). Stored securely in Cloudflare R2.
        </p>

        {uploadError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
            {uploadError}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleFilesUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300">Target Folder</label>
              <select name="folder" defaultValue="brand" className="a-select w-full text-xs">
                <option value="brand">Brand</option>
                <option value="events">Events</option>
                <option value="payment">Payment</option>
                <option value="documents">Documents</option>
                <option value="misc">Misc</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300">Choose Files (Multiple allowed)</label>
              <input
                type="file"
                name="assets"
                multiple
                accept="image/webp,image/png,image/jpeg,image/svg+xml,application/pdf"
                className="a-input text-xs"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="clay-btn text-xs"
            style={{ padding: "10px 20px" }}
          >
            {uploading ? "Uploading files..." : "Upload Selected Files ⚡"}
          </button>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {FOLDERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedFolder === f
                  ? "bg-amber-500 text-stone-950 shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="a-input text-xs w-48 sm:w-64"
          />

          <div className="bg-stone-900 border border-stone-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === "grid" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === "table" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="a-card text-center py-16 text-stone-400 space-y-2">
          <p className="font-semibold text-stone-300">No assets found</p>
          <p className="text-xs">Upload files above or change your folder filter.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((obj) => {
            const url = `/api/assets/${obj.key}`;
            const isImage = obj.httpMetadata?.contentType?.startsWith("image/");
            const isCopied = copiedKey === obj.key;

            return (
              <div key={obj.key} className="a-card flex flex-col justify-between overflow-hidden group" style={{ padding: 14 }}>
                <div className="space-y-3">
                  <div className="w-full h-36 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center overflow-hidden relative">
                    {isImage ? (
                      <img src={url} alt={obj.key} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="text-stone-400 font-bold text-xs uppercase tracking-wider">
                        📄 {obj.httpMetadata?.contentType?.split("/")[1] || "file"}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block truncate">
                      {obj.key}
                    </span>
                    <p className="text-xs text-stone-300 truncate mt-0.5" title={obj.customMetadata?.originalName}>
                      {obj.customMetadata?.originalName ?? obj.key.split("/").pop()}
                    </p>
                    <p className="text-[10px] text-stone-500 mt-1">
                      {formatBytes(obj.size)} · {new Date(obj.uploaded).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyUrl(url, obj.key)}
                    className="clay-btn clay-btn-sm flex-1 text-center text-[11px]"
                    style={{ background: isCopied ? "#1e9e45" : undefined }}
                  >
                    {isCopied ? "Copied!" : "Copy URL"}
                  </button>
                  <form action={deleteAdminAsset}>
                    <input type="hidden" name="key" value={obj.key} />
                    <button type="submit" className="clay-btn clay-btn-sm text-[11px]" style={{ background: "#c83727", color: "#fff" }}>
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="a-table-wrap">
          <table className="a-table">
            <thead>
              <tr>
                <th>Key / Name</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((obj) => {
                const url = `/api/assets/${obj.key}`;
                const isCopied = copiedKey === obj.key;
                return (
                  <tr key={obj.key}>
                    <td>
                      <a href={url} target="_blank" rel="noreferrer" className="a-link" style={{ fontWeight: 700 }}>
                        {obj.key}
                      </a>
                      {obj.customMetadata?.originalName && (
                        <span className="a-muted" style={{ display: "block", fontSize: 11 }}>
                          {obj.customMetadata.originalName}
                        </span>
                      )}
                    </td>
                    <td>{formatBytes(obj.size)}</td>
                    <td>{new Date(obj.uploaded).toLocaleString()}</td>
                    <td>{obj.httpMetadata?.contentType ?? "—"}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyUrl(url, obj.key)}
                          className="clay-btn clay-btn-sm"
                          style={{ background: isCopied ? "#1e9e45" : undefined }}
                        >
                          {isCopied ? "Copied!" : "Copy URL"}
                        </button>
                        <form action={deleteAdminAsset} style={{ display: "inline" }}>
                          <input type="hidden" name="key" value={obj.key} />
                          <button type="submit" className="clay-btn clay-btn-sm" style={{ background: "#c83727", color: "#fff" }}>
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATALOG_TABS = [
  { href: "/admin/venues", label: "Venues" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/places", label: "Places" },
  { href: "/admin/assets", label: "Assets" },
];

const COMMERCE_TABS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/vouchers", label: "Vouchers" },
  { href: "/admin/payment-methods", label: "Payment Methods" },
];

const COMMUNITY_TABS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/moderation", label: "Moderation" },
  { href: "/admin/social", label: "Social & Zernio" },
  { href: "/admin/push", label: "Push Notifications" },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  return (parts[0] ?? "BV").slice(0, 2).toUpperCase();
}

function avatarDataUri(label: string) {
  const initials = getInitials(label || "BoliVibes Admin");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" role="img" aria-label="Admin profile"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f8efdc"/><stop offset="1" stop-color="#d47735"/></linearGradient></defs><rect width="96" height="96" rx="48" fill="url(#g)"/><circle cx="48" cy="34" r="17" fill="#3a352f" opacity="0.9"/><path d="M21 82c4.8-17.2 18.2-27 27-27s22.2 9.8 27 27" fill="#3a352f" opacity="0.9"/><text x="48" y="91" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#fff8ea">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function AdminHeaderSession({ email, fullName }: { email: string; fullName?: string | null }) {
  const pathname = usePathname();
  const label = fullName || email || "Admin";

  const isCatalog = CATALOG_TABS.some((t) => pathname.startsWith(t.href));
  const isCommerce = COMMERCE_TABS.some((t) => pathname.startsWith(t.href));
  const isCommunity = COMMUNITY_TABS.some((t) => pathname.startsWith(t.href));

  const activeTabs = isCatalog ? CATALOG_TABS : isCommerce ? COMMERCE_TABS : isCommunity ? COMMUNITY_TABS : null;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
    window.location.href = "/login";
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full" aria-label="Admin header controls">
      {/* Subtab Pills in Header */}
      <div className="flex flex-wrap items-center gap-2">
        {activeTabs?.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                active
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "bg-stone-900/95 text-stone-300 hover:bg-stone-800 hover:text-stone-100 border border-stone-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Profile & Logout */}
      <div className="a-session-actions ml-auto flex items-center gap-3" aria-label="Admin account controls">
        <a href="/profile" className="a-profile-link" aria-label="Open profile">
          <img className="a-profile-avatar" src={avatarDataUri(label)} alt="Admin profile" width={36} height={36} />
        </a>
        <button type="button" className="a-logout-btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  href: string;
  label: string;
}

export const CATALOG_TABS: Tab[] = [
  { href: "/admin/venues", label: "Venues" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/places", label: "Places" },
  { href: "/admin/assets", label: "Assets" },
];

export const COMMERCE_TABS: Tab[] = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/vouchers", label: "Vouchers" },
  { href: "/admin/payment-methods", label: "Payment Methods" },
];

export const COMMUNITY_TABS: Tab[] = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/moderation", label: "Moderation" },
  { href: "/admin/social", label: "Social & Zernio" },
  { href: "/admin/push", label: "Push Notifications" },
];

export function AdminHubNav({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-800/80 pb-4">
      {tabs.map((tab) => {
        const active = pathname === tab.href || (tab.href !== "/admin" && pathname === tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              active
                ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                : "bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-stone-100 border border-stone-800"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

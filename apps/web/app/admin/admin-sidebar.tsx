"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  iconSvg: React.ReactNode;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: "/admin/hermes-reports",
    label: "Hermes Reports",
    highlight: true,
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/prompt-engineer",
    label: "Prompt Engineer",
    highlight: true,
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    href: "/admin/venues",
    label: "Catalog (Venues/Events)",
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Commerce (Products/Orders)",
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Community & Users",
    iconSvg: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className="a-sidebar transition-all duration-300 relative flex flex-col border-r border-stone-800 bg-[#16120f]"
      style={{ width: collapsed ? 72 : 260 }}
    >
      {/* Top Header with Logo and Collapse Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-stone-800/80">
        <Link href="/admin" className="a-wordmark flex items-center gap-3 overflow-hidden" aria-label="BoliVibes admin home">
          {collapsed ? (
            <div className="flex flex-col items-center gap-1 w-full">
              <img
                src="/api/assets/brand/logo-icon.webp"
                alt="BoliVibes"
                width={32}
                height={32}
                className="rounded-lg object-contain flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = "/imgs/logo-icon.webp"; }}
              />
              <span className="text-[9px] text-amber-400 font-extrabold tracking-widest uppercase">ADMIN</span>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-1 w-full">
              <img
                src="/api/assets/brand/logo-clay.webp"
                alt="BoliVibes"
                width={120}
                height={36}
                className="object-contain flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = "/imgs/logo-clay.webp"; }}
              />
              <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                ADMIN
              </span>
            </div>
          )}
        </Link>

        {/* Retract / Expand Toggle Button up on top */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-all cursor-pointer flex-shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="a-nav p-2 space-y-1.5 overflow-y-auto flex-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                active
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-extrabold"
                  : item.highlight
                  ? "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30"
                  : "text-stone-300 hover:bg-stone-800/80 hover:text-stone-100"
              }`}
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6">{item.iconSvg}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoGrid,
  IoBagHandle,
  IoCart,
  IoPeople,
  IoBarChart,
  IoImage,
  IoVideocam,
  IoImages,
  IoFolder,
  IoLogOut,
} from "react-icons/io5";
import { signOut } from "next-auth/react";

const links = [
  { label: "Dashboard", href: "/admin", icon: IoGrid },
  { label: "Products", href: "/admin/products", icon: IoBagHandle },
  { label: "Orders", href: "/admin/orders", icon: IoCart },
  { label: "Customers", href: "/admin/customers", icon: IoPeople },
  { label: "Analytics", href: "/admin/analytics", icon: IoBarChart },
  { label: "Coupons", href: "/admin/coupons", icon: IoImage },
  { label: "Banners", href: "/admin/banners", icon: IoImage },
  { label: "Media Library", href: "/admin/media", icon: IoFolder },
  { label: "Hero Slides", href: "/admin/hero-slides", icon: IoImages },
  { label: "Videos", href: "/admin/videos", icon: IoVideocam },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-neutral-900 text-neutral-300 min-h-screen flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <Link href="/admin" className="text-xl font-bold tracking-[0.2em] text-white">
          GEEKED ADMIN
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          <IoBagHandle size={18} />
          View Store
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:text-white transition-colors w-full"
        >
          <IoLogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

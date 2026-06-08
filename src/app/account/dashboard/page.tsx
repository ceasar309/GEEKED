"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Welcome, {session?.user?.name || "Customer"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-neutral-500">Orders</p>
          <Link href="/account/orders" className="text-xs text-black dark:text-white underline mt-2 inline-block">
            View Orders
          </Link>
        </div>
        <div className="p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-neutral-500">Wishlist Items</p>
          <Link href="/account/wishlist" className="text-xs text-black dark:text-white underline mt-2 inline-block">
            View Wishlist
          </Link>
        </div>
        <div className="p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-neutral-500">Saved Addresses</p>
          <Link href="/account/addresses" className="text-xs text-black dark:text-white underline mt-2 inline-block">
            Manage Addresses
          </Link>
        </div>
      </div>
    </div>
  );
}

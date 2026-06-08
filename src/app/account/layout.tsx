"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  IoGrid,
  IoBagHandle,
  IoLocation,
  IoHeart,
  IoPerson,
  IoLogOut,
} from "react-icons/io5";

const links = [
  { label: "Dashboard", href: "/account/dashboard", icon: IoGrid },
  { label: "Orders", href: "/account/orders", icon: IoBagHandle },
  { label: "Addresses", href: "/account/addresses", icon: IoLocation },
  { label: "Wishlist", href: "/account/wishlist", icon: IoHeart },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!session) return null;

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-8">
            <IoPerson size={24} />
            <div>
              <h1 className="text-xl font-bold">My Account</h1>
              <p className="text-sm text-neutral-500">{session.user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <nav className="md:col-span-1 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-3 px-4 py-3 text-sm transition-colors w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left"
              >
                <IoLogOut size={18} />
                Sign Out
              </button>
            </nav>
            <main className="md:col-span-3">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

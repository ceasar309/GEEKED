"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useTheme } from "@/store/theme";
import {
  IoSearch,
  IoHeartOutline,
  IoBagOutline,
  IoPersonOutline,
  IoMenu,
  IoClose,
  IoMoon,
  IoSunny,
} from "react-icons/io5";

const navLinks = [
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Women", href: "/shop?gender=women" },
  { label: "Men", href: "/shop?gender=men" },
  { label: "Collections", href: "/shop" },
  { label: "Sale", href: "/shop?sale=true" },
  { label: "Videos", href: "/videos" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const { mode, toggle } = useTheme();
  const itemCount = useCart((s) => s.itemCount());
  const wishlistCount = useWishlist((s) => s.items.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>

          <Link href="/" className="text-2xl font-bold tracking-[0.2em]">
            GEEKED
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <IoSearch size={20} />
            </button>
            <button
              onClick={toggle}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors hidden sm:block"
            >
              {mode === "dark" ? <IoSunny size={18} /> : <IoMoon size={18} />}
            </button>
            <Link
              href="/account/wishlist"
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors relative hidden sm:block"
            >
              <IoHeartOutline size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors relative"
            >
              <IoBagOutline size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            {session ? (
              <div className="relative group hidden sm:block">
                <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                  <IoPersonOutline size={20} />
                </button>
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link href="/account/dashboard" className="block px-4 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">My Account</Link>
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin" className="block px-4 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Admin</Link>
                  )}
                  <button onClick={() => signOut()} className="block w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">Sign Out</button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors hidden sm:block"
              >
                <IoPersonOutline size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-neutral-100 dark:border-neutral-800">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center border border-neutral-300 dark:border-neutral-600">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-3 bg-transparent outline-none text-sm"
                autoFocus
              />
              <button type="submit" className="px-4 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium tracking-wider uppercase">
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-black">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm tracking-wider uppercase border-b border-neutral-100 dark:border-neutral-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account/wishlist"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm tracking-wider uppercase border-b border-neutral-100 dark:border-neutral-800"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              href={session ? "/account/dashboard" : "/login"}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm tracking-wider uppercase"
            >
              {session ? "My Account" : "Sign In"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

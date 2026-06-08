"use client";

import Link from "next/link";
import {
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoYoutube,
  IoLogoTwitter,
  IoLogoFacebook,
} from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-white tracking-[0.2em] mb-4">GEEKED</h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              Premium fashion for the modern individual. Discover luxury streetwear that defines your style.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <IoLogoInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <IoLogoTiktok size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <IoLogoYoutube size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <IoLogoTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-neutral-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <IoLogoFacebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[0.15em] uppercase mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/shop?gender=women" className="text-sm hover:text-white transition-colors">Women</Link></li>
              <li><Link href="/shop?gender=men" className="text-sm hover:text-white transition-colors">Men</Link></li>
              <li><Link href="/shop?sort=newest" className="text-sm hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?sale=true" className="text-sm hover:text-white transition-colors">Sale</Link></li>
              <li><Link href="/videos" className="text-sm hover:text-white transition-colors">Videos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[0.15em] uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[0.15em] uppercase mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} GEEKED THREADS. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-neutral-500">
            <span className="tracking-wider">Visa</span>
            <span className="tracking-wider">Mastercard</span>
            <span className="tracking-wider">PayPal</span>
            <span className="tracking-wider">Stripe</span>
            <span className="tracking-wider">M-Pesa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

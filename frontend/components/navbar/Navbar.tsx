'use client';

import Link from 'next/link';
import { ShoppingBag, Zap, MapPin, User, ShieldAlert, Store, Bike } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tag */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-slate-900 leading-none">
                  Swift<span className="text-brand-600">Delivery</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                  Super Fast Delivery
                </span>
              </div>
            </Link>

            {/* Location selector indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-full border border-slate-200 text-slate-700 cursor-pointer transition-colors">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span className="font-semibold text-slate-900">Dwarka Mor, Delhi</span>
              <span className="text-xs text-slate-400">· 12 mins</span>
            </div>
          </div>

          {/* Quick Role Portals & Customer Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick role switcher dropdown/links */}
            <div className="hidden lg:flex items-center space-x-1 text-xs bg-slate-100 p-1 rounded-lg">
              <Link
                href="/admin"
                className="px-2.5 py-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-1"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
                <span>Admin</span>
              </Link>
              <Link
                href="/store"
                className="px-2.5 py-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-1"
              >
                <Store className="w-3.5 h-3.5 text-amber-500" />
                <span>Store</span>
              </Link>
              <Link
                href="/delivery"
                className="px-2.5 py-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-1"
              >
                <Bike className="w-3.5 h-3.5 text-emerald-500" />
                <span>Rider</span>
              </Link>
            </div>

            <Link
              href="/login"
              className="flex items-center space-x-1.5 text-sm font-semibold text-slate-700 hover:text-brand-600 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold py-2 px-4 rounded-xl shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart (0)</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

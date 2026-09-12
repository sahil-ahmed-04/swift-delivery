'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Lock, ArrowRight, Zap } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState('CUSTOMER');

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
          <Zap className="w-6 h-6 fill-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Sign in to Swift Delivery</h1>
        <p className="text-xs text-slate-500">Choose your role to access your dedicated console</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        {/* Role tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Sign in as</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {['CUSTOMER', 'STORE_MANAGER', 'DELIVERY_BOY', 'ADMIN'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 px-3 rounded-lg font-bold border transition-all text-center ${
                  role === r
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Phone</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="name@example.com or +91..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-400">
          Full JWT authentication and RBAC guards will be wired.
        </p>
      </div>

      <p className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href="/" className="font-bold text-brand-600 hover:underline">
          Return Home
        </Link>
      </p>
    </div>
  );
}

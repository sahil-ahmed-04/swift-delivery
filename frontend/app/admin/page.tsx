import { ShieldAlert, Store, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-indigo-600" />
            <span>Admin Control Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global governance, store dark-hub deployments, catalog categorization, and partner KYC.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
          Role: ADMIN
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Active Dark Stores</span>
            <Store className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">3</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% operational</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Registered Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">1,248</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 4 roles</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">8,490</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+14% this week</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Gross Merchandise Value</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">₹4,28,400</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+18.2% mom</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 py-10">
        <p className="text-sm font-semibold text-slate-700">Admin Modules</p>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Deep metrics, dark-store CRUD, category taxonomy manager, and delivery boy payout reconciliations.
        </p>
        <Link href="/" className="inline-block text-xs font-bold text-brand-600 hover:underline">
          ← Back to Customer Home
        </Link>
      </div>
    </div>
  );
}

import { Store, Package, Bell, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function StorePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <Store className="w-6 h-6 text-amber-600" />
            <span>Store Manager Console</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dark Store: <span className="font-semibold text-slate-800">Indiranagar Hub #04</span> • Order dispatch & inventory count
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
          Role: STORE_MANAGER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-amber-500/10 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-center justify-between text-amber-900 text-xs font-bold uppercase">
            <span>Incoming Orders</span>
            <Bell className="w-4 h-4 text-amber-600 animate-bounce" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">2</div>
          <p className="text-xs text-amber-700 mt-1">Pending store confirmation</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-center justify-between text-blue-900 text-xs font-bold uppercase">
            <span>Packing in Progress</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">4</div>
          <p className="text-xs text-blue-700 mt-1">Avg picking speed: 1.8 mins</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex items-center justify-between text-emerald-900 text-xs font-bold uppercase">
            <span>Ready for Pickup</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">3</div>
          <p className="text-xs text-emerald-700 mt-1">Riders notified</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 py-10">
        <p className="text-sm font-semibold text-slate-700">Store Packing Flow (Scheduled for Phase 8)</p>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Sound-alert dispatch system, barcode scanning, item substitution handling, and handover to delivery boys.
        </p>
        <Link href="/" className="inline-block text-xs font-bold text-brand-600 hover:underline">
          ← Back to Customer Home
        </Link>
      </div>
    </div>
  );
}

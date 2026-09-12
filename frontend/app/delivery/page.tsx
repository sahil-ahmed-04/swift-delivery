import { Bike, Navigation, CheckCircle, MapPin, Store } from 'lucide-react';
import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <Bike className="w-5 h-5 text-emerald-600" />
            <span>Delivery Partner Hub</span>
          </h1>
          <p className="text-xs text-slate-500">Rider: Rajesh K. • Status: Online</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          DELIVERY_BOY
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Trip</span>
          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">PICKED UP</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 text-xs">
            <Store className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">Indiranagar Hub #04</p>
              <p className="text-slate-400">100 ft Road, Indiranagar</p>
            </div>
          </div>

          <div className="border-l-2 border-dashed border-slate-200 ml-2 h-4" />

          <div className="flex items-start space-x-3 text-xs">
            <MapPin className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">Apt 402, Green Glen Heights</p>
              <p className="text-slate-400">ETA: 6 mins (1.2 km away)</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors">
          <Navigation className="w-4 h-4" />
          <span>Open Turn-by-Turn GPS</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
        <p className="text-xs font-semibold text-slate-700">Rider App</p>
        <p className="text-[11px] text-slate-400">
          Socket.IO location emitter, OTP verification, trip history, and daily earnings ledger.
        </p>
        <Link href="/" className="inline-block text-xs font-bold text-brand-600 hover:underline">
          ← Back to Customer Home
        </Link>
      </div>
    </div>
  );
}

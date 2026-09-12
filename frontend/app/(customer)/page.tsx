import Link from 'next/link';
import {
  Zap,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Store,
  Bike,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const sampleCategories = [
    { name: 'Fresh Fruits', icon: '🍎', items: '24 items' },
    { name: 'Vegetables', icon: '🥦', items: '38 items' },
    { name: 'Dairy & Bread', icon: '🥛', items: '42 items' },
    { name: 'Snacks & Munchies', icon: '🍿', items: '65 items' },
    { name: 'Cold Drinks & Juices', icon: '🧃', items: '31 items' },
    { name: 'Instant & Frozen', icon: '🍜', items: '29 items' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-brand-600 to-teal-700 p-8 sm:p-12 text-white shadow-xl shadow-brand-600/10">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-accent-yellow fill-accent-yellow" />
            <span>Hyperlocal Quick Commerce</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Groceries delivered in <span className="text-accent-yellow underline decoration-wavy decoration-2">10 minutes</span>.
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Your neighborhood dark store is stocked and ready. Experience ultra-fast delivery,
            transparent order tracking, and reliable inventory management.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center space-x-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-xl text-sm transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <span>Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center space-x-2 bg-emerald-800/60 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors border border-white/20"
            >
              <Store className="w-4 h-4" />
              <span>Store Manager Portal</span>
            </Link>
            <Link
              href="/delivery"
              className="inline-flex items-center space-x-2 bg-emerald-800/60 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors border border-white/20"
            >
              <Bike className="w-4 h-4" />
              <span>Rider App</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow circles */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Feature Value Props */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">10-15 Min Delivery</h3>
            <p className="text-xs text-slate-500 mt-1">
              Geofenced micro-fulfillment centers ensure your order arrives fresh in minutes.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Live GPS Tracking</h3>
            <p className="text-xs text-slate-500 mt-1">
              Real-time Socket.IO coordination from order pack to customer doorstep delivery.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Role-Based Security</h3>
            <p className="text-xs text-slate-500 mt-1">
              Dedicated interfaces and scoped JWT permissions for Admin, Store, Rider, and Customer.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
            <p className="text-xs text-slate-500">Explore items stocked at nearby dark stores</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {sampleCategories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-md transition-all cursor-pointer text-center group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <p className="text-xs font-bold text-slate-800 leading-tight">{cat.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{cat.items}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        Explore dark store items on the home page and add your essentials for ultra-fast 10-minute delivery.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

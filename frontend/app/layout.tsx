import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

export const metadata: Metadata = {
  title: 'Swift Delivery | Super-Fast Hyperlocal Grocery Delivery',
  description: 'Ultra-fast hyperlocal delivery platform connecting local dark stores to customers in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>© 2026 Swift Delivery Platform. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

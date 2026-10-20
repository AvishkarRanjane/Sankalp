'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface NavbarCurrencyToggleProps {
  className?: string;
}

export default function NavbarCurrencyToggle({ className = '' }: NavbarCurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-slate-100/90 border border-slate-200 shadow-2xs ${className}`}
      role="group"
      aria-label="Currency selection"
    >
      <button
        type="button"
        onClick={() => setCurrency('USDC')}
        title="View all amounts in USDC ($)"
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
          currency === 'USDC'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs scale-100'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        $ USD
      </button>

      <button
        type="button"
        onClick={() => setCurrency('INR')}
        title="View all amounts in Indian Rupee (₹)"
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
          currency === 'INR'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs scale-100'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        ₹ INR
      </button>
    </div>
  );
}

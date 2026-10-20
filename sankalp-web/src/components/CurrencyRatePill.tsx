'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { ArrowLeftRight } from 'lucide-react';

interface CurrencyRatePillProps {
  className?: string;
  showSwitchHint?: boolean;
}

export default function CurrencyRatePill({
  className = '',
  showSwitchHint = true,
}: CurrencyRatePillProps) {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <button
      type="button"
      onClick={toggleCurrency}
      title={`Click to switch website currency to ${currency === 'USDC' ? 'Indian Rupee (₹)' : 'USDC ($)'}`}
      aria-label={`Current currency: ${currency}. Click to switch to ${currency === 'USDC' ? 'INR' : 'USDC'}`}
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
        currency === 'INR'
          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs hover:shadow-xs'
          : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs hover:shadow-xs'
      } ${className}`}
    >
      <span className="font-medium tracking-tight">1 USDC ≈ ₹85</span>

      {showSwitchHint && (
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
            currency === 'INR'
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 text-white'
          }`}
        >
          <ArrowLeftRight className="w-2.5 h-2.5" />
          <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
        </span>
      )}
    </button>
  );
}

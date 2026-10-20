'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { USDC_INR_RATE } from '@/lib/monad';

export type Currency = 'USDC' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  rate: number;
  currencySymbol: string;
  currencyCode: string;
  formatAmount: (usdcAmount: number, options?: { compact?: boolean }) => string;
  formatSecondary: (usdcAmount: number) => string;
  formatExact: (usdcAmount: number) => string;
  toCurrent: (usdcAmount: number) => number;
  toUSDC: (currentAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = 'sankalp_currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USDC');

  // Load from localStorage on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'INR' || saved === 'USDC') {
          setCurrencyState(saved);
        }
      } catch {
        // ignore localStorage errors (e.g. SSR / private browsing)
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrencyState((prev) => {
      const next = prev === 'USDC' ? 'INR' : 'USDC';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const formatAmount = useCallback(
    (usdcAmount: number, options: { compact?: boolean } = {}) => {
      // Return safe fallback for invalid numbers
      const safeUSDC = Number.isFinite(usdcAmount) ? usdcAmount : 0;

      if (currency === 'INR') {
        const inr = safeUSDC * USDC_INR_RATE;
        if (options.compact) {
          if (inr >= 10000000) {
            return `₹${(inr / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
          }
          if (inr >= 100000) {
            return `₹${(inr / 100000).toFixed(2).replace(/\.00$/, '')} L`;
          }
        }
        if (inr >= 10000000) {
          return `₹${(inr / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
        }
        if (inr >= 100000) {
          return `₹${(inr / 100000).toFixed(2).replace(/\.00$/, '')} lakh`;
        }
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(inr);
      }

      // Default: USDC ($)
      if (options.compact) {
        if (safeUSDC >= 1000000) {
          return `$${(safeUSDC / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
        }
        if (safeUSDC >= 1000) {
          return `$${(safeUSDC / 1000).toFixed(1).replace(/\.0$/, '')}k`;
        }
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(safeUSDC);
    },
    [currency]
  );

  const formatSecondary = useCallback(
    (usdcAmount: number) => {
      const safeUSDC = Number.isFinite(usdcAmount) ? usdcAmount : 0;
      if (currency === 'INR') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(safeUSDC) + ' USDC';
      }

      // If in USDC mode, secondary is INR
      const inr = safeUSDC * USDC_INR_RATE;
      if (inr >= 10000000) {
        return `₹${(inr / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
      }
      if (inr >= 100000) {
        return `₹${(inr / 100000).toFixed(2).replace(/\.00$/, '')} lakh`;
      }
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(inr);
    },
    [currency]
  );

  const formatExact = useCallback(
    (usdcAmount: number) => {
      const safeUSDC = Number.isFinite(usdcAmount) ? usdcAmount : 0;
      if (currency === 'INR') {
        const inr = Math.round(safeUSDC * USDC_INR_RATE);
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(inr);
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(safeUSDC);
    },
    [currency]
  );

  const toCurrent = useCallback(
    (usdcAmount: number) => {
      return currency === 'INR' ? Math.round(usdcAmount * USDC_INR_RATE) : usdcAmount;
    },
    [currency]
  );

  const toUSDC = useCallback(
    (currentAmount: number) => {
      if (currency === 'INR') {
        return Math.round((currentAmount / USDC_INR_RATE) * 100) / 100;
      }
      return currentAmount;
    },
    [currency]
  );

  const currencySymbol = currency === 'INR' ? '₹' : '$';
  const currencyCode = currency === 'INR' ? 'INR' : 'USDC';

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        rate: USDC_INR_RATE,
        currencySymbol,
        currencyCode,
        formatAmount,
        formatSecondary,
        formatExact,
        toCurrent,
        toUSDC,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

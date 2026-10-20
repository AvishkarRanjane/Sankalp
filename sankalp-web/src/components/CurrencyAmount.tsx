'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface CurrencyAmountProps {
  amount: number;
  className?: string;
  showSecondary?: boolean;
  secondaryClassName?: string;
  compact?: boolean;
}

export default function CurrencyAmount({
  amount,
  className = '',
  showSecondary = false,
  secondaryClassName = 'text-xs text-slate-500 font-normal ml-1.5',
  compact = false,
}: CurrencyAmountProps) {
  const { formatAmount, formatSecondary } = useCurrency();

  return (
    <span className={className}>
      {formatAmount(amount, { compact })}
      {showSecondary && (
        <span className={secondaryClassName}>
          ({formatSecondary(amount)})
        </span>
      )}
    </span>
  );
}

import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Refund Policy | Sankalp',
  description: 'Smart-contract refund policy: when refunds apply, how to claim, and pull-payment mechanics.',
  canonical: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#4B5563]">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          Trust & Guarantees
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Refund Policy
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          Sankalp enforces an automated, on-chain refund mechanism. Our refund rules match the smart
          contract code deployed on Monad.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            1. Failed Campaigns (100% Full Refund)
          </h2>
          <p className="text-[#4B5563]">
            If a campaign does not reach 100% of its funding goal by the deadline, the contract marks
            the campaign as Failed. Every backer can pull 100% of their contributed USDC directly from
            the smart contract. Zero platform fees are deducted.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-indigo-600 shrink-0" />
            2. Cancelled Campaigns (Pro-Rata Milestone Refund)
          </h2>
          <p className="text-[#4B5563]">
            If a campaign is cancelled due to creator abandonment or milestone breach, any funds remaining
            unreleased in the contract are proportionally returned to all backers. Previously released
            milestones that were already proven and approved cannot be clawed back.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            3. How to Claim Your Refund (Pull-Payment)
          </h2>
          <p className="text-[#4B5563]">
            Refunds are not pushed into wallets to prevent malicious smart contract reentrancy. Backers
            simply navigate to their Donor Dashboard or the project page, connect their wallet, and click
            <strong className="text-slate-900"> Claim Refund</strong>. The transaction processes in less than 1 second on Monad.
          </p>
        </section>
      </div>
    </div>
  );
}

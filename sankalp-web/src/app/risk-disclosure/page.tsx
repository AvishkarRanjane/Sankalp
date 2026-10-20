import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Risk Disclosure | Sankalp',
  description: 'Comprehensive risk disclosure regarding crowdfunding, smart contracts, and crypto assets.',
  canonical: '/risk-disclosure',
});

export default function RiskDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#374151]">
      <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-8">
        Risk Disclosure Statement
      </h1>

      <div className="space-y-8 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <h2 className="text-base font-bold text-[#111827]">1. Project Execution & Timeline Delays</h2>
          <p className="text-[#4B5563]">
            Hardware fabrication, school curriculum approvals, civic permissions, and artisan production
            can be impacted by external factors such as weather, supply shortages, or logistical
            bottlenecks. Creators may experience delivery delays.
          </p>
        </section>

        <section className="space-y-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <h2 className="text-base font-bold text-[#111827]">2. Smart Contract Technology Risk</h2>
          <p className="text-[#4B5563]">
            While Sankalp contracts utilize standard OpenZeppelin libraries, pull-payments, and extensive
            testing, software code on any blockchain can be subject to undiscovered edge-case bugs or
            network-level halts.
          </p>
        </section>

        <section className="space-y-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <h2 className="text-base font-bold text-[#111827]">3. Self-Custody and Private Key Responsibility</h2>
          <p className="text-[#4B5563]">
            You are exclusively responsible for securing your wallet seed phrase and private keys. Sankalp
            cannot recover lost passwords, reverse unauthorized transactions, or access your self-custody
            funds.
          </p>
        </section>

        <section className="space-y-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <h2 className="text-base font-bold text-[#111827]">4. Regulatory & Tax Considerations in India</h2>
          <p className="text-[#4B5563]">
            In India, transactions involving Virtual Digital Assets (VDAs) may attract applicable TDS (1%)
            and income taxation under the Income Tax Act. Users must ensure compliance with their own tax
            obligations.
          </p>
        </section>

        <section className="space-y-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <h2 className="text-base font-bold text-[#111827]">5. No Investment, Securities, or Guaranteed Returns</h2>
          <p className="text-[#4B5563]">
            Backing a campaign is a donation or reward pre-purchase. You do not acquire shares, equity,
            debt interest, royalties, or rights to future company profits.
          </p>
        </section>
      </div>
    </div>
  );
}

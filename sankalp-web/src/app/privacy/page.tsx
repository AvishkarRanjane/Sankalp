import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy | Sankalp',
  description: 'Privacy policy aligned with India’s Digital Personal Data Protection (DPDP) Act.',
  canonical: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#4B5563]">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          Compliance & Protection
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Privacy Policy (India DPDP Act Alignment)
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          How we handle off-chain data and protect user privacy in accordance with Indian regulations.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">1. Principles of Data Collection</h2>
          <p className="text-[#4B5563]">
            Sankalp adheres to the principles of purpose limitation, data minimization, and user consent
            under India&apos;s Digital Personal Data Protection (DPDP) Act, 2023. We collect only minimal off-chain
            profile information (such as display names and optional notification emails).
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">2. Creator Identity Documents (Zero-Storage Policy)</h2>
          <p className="text-[#4B5563]">
            Creator identity verification is executed directly by certified third-party verification
            vendors. Sankalp never stores, receives, or views government ID documents (Aadhaar, PAN,
            Passport). We receive and store only a cryptographic status verification flag.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">3. On-Chain Data Immutability</h2>
          <p className="text-[#4B5563]">
            Transactions confirmed on the Monad blockchain (including wallet addresses, transaction hashes,
            timestamps, and contribution amounts) are permanent, public, and mathematically immutable.
            Under blockchain technology, on-chain ledger entries cannot be altered, modified, or deleted.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">4. Your Right to Erasure (Off-Chain)</h2>
          <p className="text-[#4B5563]">
            You have the right to request deletion of all off-chain profile data and email preferences by
            contacting privacy@sankalp.fund or clicking Delete Profile in your dashboard settings.
          </p>
        </section>
      </div>
    </div>
  );
}

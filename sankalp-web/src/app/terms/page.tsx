import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service | Sankalp',
  description: 'Terms of service governing use of the Sankalp milestone crowdfunding protocol on Monad.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#4B5563]">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          Legal Framework
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          Please read these terms carefully before accessing or using the Sankalp decentralized platform.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">1. Nature of the Platform</h2>
          <p className="text-[#4B5563]">
            Sankalp is a decentralized milestone-based crowdfunding platform operating on the Monad
            blockchain. Sankalp is strictly reward and donation-based. In accordance with regulations in
            India, including SEBI guidelines, Sankalp does not support equity crowdfunding, profit
            shares, debt instruments, or guaranteed financial returns.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">2. User Roles and Eligibility</h2>
          <p className="text-[#4B5563]">
            You must be at least 18 years of age and possess the legal capacity to enter into these terms.
            Creators must complete identity verification prior to campaign deployment. Backers connect
            via self-custodial Web3 wallets and are solely responsible for transaction signing.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">3. Smart Contract Escrow and Platform Fees</h2>
          <p className="text-[#4B5563]">
            All funds pledged to campaigns are held in immutable smart contracts on the Monad network.
            A flat 3% platform fee applies only to campaigns that successfully hit 100% of their goal,
            deducted proportionally as milestone funds are unlocked. If a campaign fails, 100% of
            contributions are claimable by backers without platform deductions.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">4. Milestone Verification and Disclaimers</h2>
          <p className="text-[#4B5563]">
            Milestone approval is conducted based on evidence submitted by the creator. While platform
            moderators inspect submitted proofs, Sankalp cannot guarantee the perfection or commercial
            success of real-world physical projects. Users are advised to review the Risk Disclosure.
          </p>
        </section>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { AlertTriangle, Wallet, Compass } from 'lucide-react';

import BlurSlideHeading from '@/components/animations/BlurSlideHeading';
import CurrencyRatePill from '@/components/CurrencyRatePill';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';

export const metadata: Metadata = constructMetadata({
  title: 'Back Projects with Confidence | Donor & Backer Safeguards',
  description:
    'Contribute in USDC with complete peace of mind. Every rupee is locked in smart-contract escrow, released only when creators deliver tangible milestones, with 1-click refunds if campaigns fall short.',
  keywords: [
    'donor safeguards',
    'safe crowdfunding India',
    'backer protection protocol',
    'USDC crypto donations',
    'refund guarantee crowdfunding',
    'Monad testnet donor rights',
    'transparent charity verification',
  ],
  canonical: '/for-donors',
});

export default function ForDonorsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For Backers', url: '/for-donors' },
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16 relative overflow-hidden">
      {/* Creative Emerald-Teal Background Lines & Floating Icons */}
      <SectionCreativeLines variant="emerald-teal" showIcons={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mb-16 relative z-10">
        <BlurSlideHeading
          as="h1"
          align="left"
          primaryText="Back projects with"
          accentText="total confidence"
          className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6"
          accentClassName="bg-gradient-to-r from-[#059669] via-[#10B981] to-[#D97706] bg-clip-text text-transparent"
        />
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8">
          Contribute in USDC, follow every milestone and claim a refund if a goal is missed. Learn how
          Sankalp protects backers on Monad.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition active:scale-95"
        >
          <Compass className="w-4 h-4" />
          Explore campaigns worth backing
        </Link>
      </div>

      {/* New to crypto? Start here */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16">
        <h2 className="text-2xl font-bold text-[#111827] mb-2 flex items-center gap-2 font-editorial">
          <Wallet className="w-5 h-5 text-indigo-600" />
          New to crypto? Start here in 10 minutes
        </h2>
        <p className="text-sm text-[#4B5563] mb-8">
          You don&apos;t need to be a blockchain expert to back ideas you believe in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-[#111827] text-sm">Install a wallet</h3>
            <p className="text-[#4B5563]">Download MetaMask or Rabby browser extension for free.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-[#111827] text-sm">Add USDC</h3>
            <p className="text-[#4B5563] flex items-center gap-1.5 flex-wrap">
              Acquire stablecoins via popular Indian on-ramps <CurrencyRatePill className="text-[11px] py-0.5" />.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-[#111827] text-sm">Switch to Monad</h3>
            <p className="text-[#4B5563]">Click our one-click banner to add Monad Testnet (Chain ID 10143).</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="font-bold text-[#111827] text-sm">Contribute safely</h3>
            <p className="text-[#4B5563]">Back your project. Funds remain protected by the smart contract.</p>
          </div>
        </div>
      </div>

      {/* Honest Risks */}
      <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-xs">
        <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2 mb-4 font-editorial">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Honest limits & what backers should know
        </h2>
        <div className="space-y-3 text-xs text-[#4B5563] leading-relaxed">
          <p>
            Crowdfunding projects are real human endeavors and can suffer delays, supply-chain
            shortages, or unexpected scope changes. While smart contracts guarantee that money cannot be
            withdrawn without verified milestone completion, no platform can completely eliminate the
            possibility of project delays or imperfect outcomes.
          </p>
          <p>
            You are always responsible for safeguarding your private keys and seed phrase. Never share
            your seed phrase with anyone, including Sankalp administrators.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/risk-disclosure" className="text-xs text-[#D97706] font-bold hover:underline">
            Read the full Risk Disclosure policy →
          </Link>
        </div>
      </div>
    </div>
  );
}

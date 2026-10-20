import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import {
  Lock,
  CheckCircle2,
  RotateCcw,
  UserCheck,
  Search,
  PauseOctagon,
  FileCode,
  Flag,
  AlertTriangle,
} from 'lucide-react';

import VaultLockHeading from '@/components/animations/VaultLockHeading';

export const metadata: Metadata = constructMetadata({
  title: 'Trust & Safety: How Sankalp Protects Backers',
  description:
    'Smart-contract escrow, milestone release, creator verification and public audits. See exactly how we protect contributions.',
  canonical: '/trust-and-safety',
});

export default function TrustAndSafetyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Trust & Safety', url: '/trust-and-safety' },
  ]);

  const protections = [
    {
      num: 1,
      icon: Lock,
      title: 'Smart-contract escrow',
      text: 'Your contribution is held by the project’s contract, not by Sankalp staff or the creator. The code is published and verified on the Monad block explorer.',
    },
    {
      num: 2,
      icon: CheckCircle2,
      title: 'Milestone release',
      text: 'The creator withdraws only the share linked to an approved milestone. Anything not yet released stays locked securely in the contract.',
    },
    {
      num: 3,
      icon: RotateCcw,
      title: 'Automatic refunds',
      text: 'If a campaign misses its goal by the deadline, each backer can claim a full refund directly from the contract. If a campaign is cancelled, unreleased funds are returned.',
    },
    {
      num: 4,
      icon: UserCheck,
      title: 'Creator verification',
      text: 'Creators complete an identity check through a regulated verification provider. We do not store sensitive identity documents on Sankalp or on the blockchain.',
    },
    {
      num: 5,
      icon: Search,
      title: 'Project review',
      text: 'Every project is reviewed against our rules before launch. We check that the budget is realistic, the milestones are verifiable and the project is permitted.',
    },
    {
      num: 6,
      icon: PauseOctagon,
      title: 'Emergency pause',
      text: 'If we find a problem, a multi-signature admin wallet can pause new contributions. Refund and withdrawal rules cannot be changed arbitrarily by one person.',
    },
    {
      num: 7,
      icon: FileCode,
      title: 'Audited smart contracts',
      text: 'Sankalp contracts are modeled with OpenZeppelin security standards, pull-payments, and invariant assertions tested against reentrancy.',
    },
    {
      num: 8,
      icon: Flag,
      title: 'Report a project',
      text: 'Every campaign page has a Report button. Our moderation team reviews flagged reports within 48 hours.',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mb-16">
        <VaultLockHeading
          as="h1"
          prefixText="How we protect"
          secureText="every contribution"
          className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6"
        />
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          Smart-contract escrow, milestone release, creator verification and public audits. See exactly
          how we protect contributions on the Monad network.
        </p>
      </div>

      {/* 8 Protection Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {protections.map((p) => (
          <div
            key={p.num}
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
              <p.icon className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <span>{p.num}. {p.title}</span>
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Honest Limits Box */}
      <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-xs max-w-3xl">
        <h2 className="text-base font-bold text-amber-950 flex items-center gap-2 mb-2 font-editorial">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Honest limits
        </h2>
        <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
          No platform can remove all risk. Projects can be late, change scope or fail in the physical
          world. Smart contracts can contain bugs even after audits. You are responsible for the
          security of your own wallet and private keys.
        </p>
        <Link
          href="/risk-disclosure"
          className="text-xs text-[#D97706] font-bold hover:underline inline-flex items-center gap-1"
        >
          Read the full Risk Disclosure policy →
        </Link>
      </div>
    </div>
  );
}

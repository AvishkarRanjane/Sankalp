import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import {
  RotateCcw,
  ArrowRight,
  HelpCircle,
  FileCheck,
  Lock,
  Unlock,
  Compass,
  Sparkles,
  ShieldCheck,
  Percent,
} from 'lucide-react';

import MilestoneStepHeading from '@/components/animations/MilestoneStepHeading';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';

export const metadata: Metadata = constructMetadata({
  title: 'How Sankalp Works: Milestone Escrow Protocol Explained',
  description:
    'Learn how Sankalp eliminates crowdfunding fraud. Contributions are locked in immutable Monad smart contracts, released only upon verified milestone proof, with 100% automated refunds if goals fall short.',
  keywords: [
    'how milestone crowdfunding works',
    'smart contract escrow protocol',
    'Monad blockchain verification',
    'crowdfunding fraud protection',
    'automated backer refunds',
    'transparent proof of delivery',
    'phased milestone disbursements',
  ],
  canonical: '/how-it-works',
});

export default function HowItWorksPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How It Works', url: '/how-it-works' },
  ]);

  const faqs = [
    {
      question: 'Why not send funds directly to the creator up front?',
      answer:
        'Releasing all funds at launch creates a moral hazard and risks incomplete projects. Phased milestone release aligns incentives: creators get funding as they make progress, and backers know their funds are protected.',
    },
    {
      question: 'Who verifies the milestones?',
      answer:
        'Creators submit public proof (receipts, photos, videos, code commits). For the MVP, platform reviewers verify evidence. Backers can review all submissions transparently.',
    },
    {
      question: 'Can the platform take my money?',
      answer:
        'No. Sankalp smart contracts hold the escrowed tokens on Monad. Even platform admins cannot transfer backer funds to themselves; rules only allow release to creator upon approval or refunds to backers.',
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Back and Create Campaigns on Sankalp',
    description: 'Guide to milestone-based escrow crowdfunding on Monad blockchain.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose a project',
        text: 'Browse student ideas, community causes, hardware, art and small businesses. Read the story, milestones and risks.',
      },
      {
        '@type': 'HowToStep',
        name: 'Connect your wallet',
        text: 'Use MetaMask, Rabby, WalletConnect or another supported wallet. You keep control of your keys.',
      },
      {
        '@type': 'HowToStep',
        name: 'Contribute in USDC',
        text: 'Confirm one transaction. Your contribution appears on the project page and is held by the escrow smart contract.',
      },
      {
        '@type': 'HowToStep',
        name: 'Follow progress',
        text: 'Get updates, see each milestone released, or claim a refund if the goal is missed.',
      },
    ],
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16 relative overflow-hidden">
      {/* Creative Violet Monad Background Lines & Floating Icons */}
      <SectionCreativeLines variant="violet-monad" showIcons={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero Header with Typewriter + 3D Roll */}
      <div className="max-w-3xl mb-16 relative z-10">
        <MilestoneStepHeading
          as="h1"
          leadText="How Sankalp works:"
          milestoneText="Milestone Escrow"
          className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6"
        />
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          Sankalp is crowdfunding with one big difference. Contributions don&apos;t go straight to the
          creator. They are held by a smart contract, a small program on the Monad blockchain, which
          follows rules everyone can read.
        </p>
      </div>

      {/* Visual Life of a Contribution Diagram */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16">
        <h2 className="text-xs font-bold text-[#D97706] uppercase tracking-widest mb-6">
          Lifecycle of Every Rupee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs relative">
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-[#111827] text-sm">Contribute</h3>
            <p className="text-[#4B5563]">Backer confirms 1 tx in USDC on Monad testnet.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm">Escrow Locked</h3>
            <p className="text-[#4B5563]">Tokens held in immutable contract. Creator cannot withdraw.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm">Proof & Approval</h3>
            <p className="text-[#4B5563]">Creator uploads receipts & photos. Deliverables verified.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Unlock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-[#111827] text-sm">Stage Release</h3>
            <p className="text-[#4B5563]">Creator pulls approved milestone share. 3% fee to treasury.</p>
          </div>
        </div>
      </div>

      {/* Two Column Steps: Backers vs Creators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* For Backers: 4 Steps */}
        <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#111827]">For Backers: 4 Steps</h2>
            <Link href="/for-donors" className="text-xs font-semibold text-[#D97706] hover:underline">
              Backer guide →
            </Link>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Choose a project</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Read the story, milestones, budget breakdown, and identified risks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Connect your wallet</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Use MetaMask, Rabby, or WalletConnect on Monad. You keep total control of your keys.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Contribute in USDC</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Confirm one transaction. Your contribution appears immediately on the project page and Monad chain.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                4
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Follow progress & inspect releases</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Get updates, inspect evidence for each milestone, or claim a 100% refund if the goal is missed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Creators: 5 Steps */}
        <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
            <h2 className="text-xl font-bold text-[#111827]">For Creators: 5 Steps</h2>
            <Link href="/for-creators" className="text-xs font-semibold text-[#D97706] hover:underline">
              Creator guide →
            </Link>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Apply & verify</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Create a profile and complete a one-time identity verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Plan your milestones</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Break your budget into 2 to 5 verifiable stages with clear evidence requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                3
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Submit for review</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Our team checks your budget realism and category compliance within 2 to 5 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                4
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Go live on Monad</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Your campaign smart contract is created and accepts contributions until the deadline.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs shrink-0">
                5
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Deliver & withdraw</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Submit proof for each milestone. Once approved, that portion unlocks for withdrawal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What if something goes wrong? */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16">
        <h2 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-rose-500" />
          What if something goes wrong?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4B5563]">
          <div>
            <h3 className="font-bold text-[#111827] mb-1 text-sm">Campaign misses goal</h3>
            <p className="leading-relaxed">
              The contract marks the project Failed. Every backer can call the refund function to withdraw 100% of their funds.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#111827] mb-1 text-sm">Creator stops delivering</h3>
            <p className="leading-relaxed">
              Future milestone funds stay locked in the contract. Backers can dispute or request a cancellation of remaining unreleased funds.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#111827] mb-1 text-sm">Emergency pause</h3>
            <p className="leading-relaxed">
              If fraud is suspected, the platform multisig can pause contributions while keeping refund paths open.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
          <Link
            href="/trust-and-safety"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D97706] hover:text-[#B45309]"
          >
            Learn more about our Trust & Safety architecture <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-8 font-editorial text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <h3 className="text-base font-bold text-[#111827] mb-2 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                {f.question}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed pl-7.5">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Guides & Documentation Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center shrink-0 shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-editorial text-base font-bold text-[#111827]">
              Explore guides & documentation
            </h3>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Deep dive into platform rules, milestone verification, and smart contract protections.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/for-creators"
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF6] hover:bg-amber-50 border border-[#E5E7EB] hover:border-amber-300 text-xs font-semibold text-slate-700 hover:text-amber-900 transition flex items-center gap-1.5 shadow-2xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>For creators</span>
          </Link>
          <Link
            href="/for-donors"
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF6] hover:bg-amber-50 border border-[#E5E7EB] hover:border-amber-300 text-xs font-semibold text-slate-700 hover:text-amber-900 transition flex items-center gap-1.5 shadow-2xs group"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>For backers</span>
          </Link>
          <Link
            href="/trust-and-safety"
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF6] hover:bg-amber-50 border border-[#E5E7EB] hover:border-amber-300 text-xs font-semibold text-slate-700 hover:text-amber-900 transition flex items-center gap-1.5 shadow-2xs group"
          >
            <Lock className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span>Trust & safety</span>
          </Link>
          <Link
            href="/fees"
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF6] hover:bg-amber-50 border border-[#E5E7EB] hover:border-amber-300 text-xs font-semibold text-slate-700 hover:text-amber-900 transition flex items-center gap-1.5 shadow-2xs group"
          >
            <Percent className="w-3.5 h-3.5 text-purple-500 group-hover:scale-110 transition-transform" />
            <span>Fees & pricing</span>
          </Link>
          <Link
            href="/faq"
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF6] hover:bg-amber-50 border border-[#E5E7EB] hover:border-amber-300 text-xs font-semibold text-slate-700 hover:text-amber-900 transition flex items-center gap-1.5 shadow-2xs group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span>Help center & FAQ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

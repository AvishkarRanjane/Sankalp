import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Coins,
} from 'lucide-react';

import HighlighterHeading from '@/components/animations/HighlighterHeading';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';

export const metadata: Metadata = constructMetadata({
  title: 'Start a Crowdfunding Campaign | Transparent 3% Flat Fee',
  description:
    'Turn your ambition into reality. Raise funds with a community that rewards authentic progress. Zero upfront fees, a flat 3% platform fee only on full success, and immutable milestone release rules on Monad.',
  keywords: [
    'start crowdfunding campaign',
    'fundraising for Indian creators',
    'student startup fundraising',
    'low fee crowdfunding platform',
    'milestone funding for innovators',
    'launch community project',
    'Monad grant and crowdfunding',
  ],
  canonical: '/for-creators',
});

export default function ForCreatorsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For Creators', url: '/for-creators' },
  ]);

  const faqs = [
    {
      question: 'How much does it cost to launch on Sankalp?',
      answer:
        'Zero upfront cost. We only charge a 3% platform fee if your campaign successfully hits 100% of its funding goal.',
    },
    {
      question: 'Can I edit my milestones after going live?',
      answer:
        'No. Smart contracts fix milestone targets and amounts at deployment to preserve backer trust. You can publish progress updates at any time.',
    },
    {
      question: 'How long does creator verification take?',
      answer:
        'Identity checks are processed by our verification partner within 24 to 48 hours.',
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16 relative overflow-hidden">
      {/* Creative Saffron-Violet Background Lines & Floating Icons */}
      <SectionCreativeLines variant="saffron-violet" showIcons={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl mb-16 relative z-10">
        <HighlighterHeading
          as="h1"
          prefixText="Raise funds with a community that"
          highlightedText="sees your progress"
          className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6"
        />
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8">
          Raise funds with a community that sees your progress. Milestone-based release, a flat 3% fee
          and no upfront cost. Start in minutes.
        </p>
        <Link
          href="/creator/new"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          Start your project now
        </Link>
      </div>

      {/* Why Creators Choose Sankalp */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[#111827] mb-6 font-editorial">Why creators choose Sankalp</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <Coins className="w-6 h-6 text-[#D97706] mb-2" />
            <h3 className="text-sm font-bold text-[#111827]">No upfront cost</h3>
            <p className="text-xs text-[#4B5563]">Launch completely free. A flat 3% only applies to successfully funded campaigns.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="text-sm font-bold text-[#111827]">Earn backer trust</h3>
            <p className="text-xs text-[#4B5563]">Funds released as you hit milestones, eliminating suspicion and attracting larger pledges.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <Clock className="w-6 h-6 text-indigo-600 mb-2" />
            <h3 className="text-sm font-bold text-[#111827]">Fast Monad payouts</h3>
            <p className="text-xs text-[#4B5563]">Withdraw approved milestone funds in seconds with ultra-low sub-cent Monad gas fees.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <Sparkles className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="text-sm font-bold text-[#111827]">Own your community</h3>
            <p className="text-xs text-[#4B5563]">Build long-term reputation with verified public creator profiles and milestone proof.</p>
          </div>
        </div>
      </div>

      {/* Checklist: What makes a campaign succeed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Success checklist for creators
          </h2>
          <ul className="space-y-3 text-xs text-[#4B5563]">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Clear one-line summary:</strong> Explain what you are building and why it matters in 15 words.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Verifiable milestones:</strong> Break your budget into 2 to 5 clear stages with demonstrable proof.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Honest risks:</strong> Explain how you will handle supply delays, exams, or price changes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>First 30 supporters:</strong> Share your preview link with mentors, friends, or club members before public launch.</span>
            </li>
          </ul>
        </div>

        {/* What you cannot fundraise for */}
        <div className="p-8 rounded-3xl bg-rose-50/50 border border-rose-200 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-rose-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            What you cannot fundraise for
          </h2>
          <ul className="space-y-3 text-xs text-rose-950/80">
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Investment or profit-sharing:</strong> No equity, dividends, or promised monetary returns (SEBI compliance).</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Individual medical treatment:</strong> Personal medical bills are not supported due to high fraud risk.</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Illegal goods, weapons, gambling:</strong> Strictly prohibited. Violations result in wallet blacklisting.</span>
            </li>
          </ul>
          <Link
            href="/prohibited-projects"
            className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:underline pt-2 font-bold"
          >
            Review the complete Prohibited Projects policy →
          </Link>
        </div>
      </div>
    </div>
  );
}

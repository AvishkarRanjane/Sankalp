import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { ShieldCheck, Eye, HeartHandshake, Zap } from 'lucide-react';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';

export const metadata: Metadata = constructMetadata({
  title: 'About Sankalp: Our Mission, Team & Monad Blockchain Architecture',
  description:
    'Sankalp was founded on a simple premise: make it easy to fund good ideas and hard to misuse the money. Discover our story, our team, and how we are building crowdfunding India can trust on Monad.',
  keywords: [
    'about Sankalp',
    'blockchain crowdfunding mission',
    'web3 public goods India',
    'Monad EVM escrow architecture',
    'Sankalp founding team',
    'transparent community finance',
  ],
  canonical: '/about',
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16 relative overflow-hidden">
      {/* Creative Background Lines & Floating Mission Icons */}
      <SectionCreativeLines variant="saffron-violet" showIcons={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="max-w-3xl mb-16 relative z-10">
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
          We’re building crowdfunding people can trust
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          Sankalp is a milestone-based crowdfunding platform built on blockchain to make community
          funding more transparent, accountable, and trustworthy across India and beyond.
        </p>
      </div>

      {/* Mission Statement Callout */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-indigo-600/10 to-purple-600/10 border border-[#E5E7EB] mb-16 relative overflow-hidden shadow-xs">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          The Core Mission
        </span>
        <blockquote className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-snug">
          &ldquo;Make it easy to fund good ideas and hard to misuse the money.&rdquo;
        </blockquote>
      </div>

      {/* Why We Started & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#111827] font-editorial">Why we started</h2>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Many traditional crowdfunding campaigns collect money first and explain later. In conventional
            systems, donors often have no idea if their money was spent on promised equipment, and
            creators who genuinely deliver have no standardized, tamper-proof way to build a reputation.
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            We wanted a model where promises are tied to immutable rules that anyone can inspect. With
            smart-contract escrow on Monad, backers see what is delivered before each milestone is
            unlocked, and creators earn trust step by step.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#111827] font-editorial">Our 4 Core Principles</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3">
              <Eye className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#111827]">Radical Transparency</h4>
                <p className="text-xs text-[#4B5563]">All rules, releases, and milestones are on a public block explorer.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#111827]">Shared Responsibility</h4>
                <p className="text-xs text-[#4B5563]">Aligning creators and backers so both share the incentive of real delivery.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#111827]">Speed & Simplicity</h4>
                <p className="text-xs text-[#4B5563]">Instant finality, 1-click backing, and sub-cent fees powered by Monad EVM.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#111827]">Honesty About Risk</h4>
                <p className="text-xs text-[#4B5563]">No hype, no false promises. Real human projects with transparent safeguards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Built for Monad section */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Infrastructure Partner
          </span>
          <h3 className="text-xl font-bold text-[#111827] font-editorial">Why Monad Blockchain?</h3>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Monad provides 10,000 TPS with 1-second single-slot finality and full EVM compatibility.
            This allows Sankalp to offer sub-cent gas fees so micro-donations of even ₹100 are economically
            viable without getting eaten up by network fees.
          </p>
        </div>
        <Link
          href="/how-it-works"
          className="px-5 py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-semibold shrink-0 transition"
        >
          Explore Protocol Details →
        </Link>
      </div>
    </div>
  );
}

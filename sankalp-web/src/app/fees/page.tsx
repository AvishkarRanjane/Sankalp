import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { Coins } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Fees & Pricing: Flat 3% Platform Fee | Sankalp',
  description:
    'No setup cost. Sankalp charges a flat 3% only on successfully funded campaigns. See a clear example and what network fees to expect.',
  canonical: '/fees',
});

export default function FeesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Fees & Pricing', url: '/fees' },
  ]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
          Simple, transparent fees
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          No setup cost. Sankalp charges a flat 3% only on successfully funded campaigns. See a clear
          worked example and what network fees to expect.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16 max-w-4xl">
        <h2 className="text-xl font-bold text-[#111827] mb-6 font-editorial">Fee Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="text-[#64748B] border-b border-[#E5E7EB]">
              <tr>
                <th className="pb-4 font-semibold">Service</th>
                <th className="pb-4 font-semibold text-center">Backers</th>
                <th className="pb-4 font-semibold text-center">Creators</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#374151]">
              <tr>
                <td className="py-4 font-semibold text-[#111827]">Account creation</td>
                <td className="py-4 text-center font-bold text-emerald-600">Free</td>
                <td className="py-4 text-center font-bold text-emerald-600">Free</td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-[#111827]">Platform fee</td>
                <td className="py-4 text-center font-bold text-emerald-600">None (0%)</td>
                <td className="py-4 text-center text-[#D97706] font-semibold">
                  3% of funds raised (only if goal is reached)
                </td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-[#111827]">Network (gas) fee</td>
                <td className="py-4 text-center text-[#64748B]">
                  Sub-cent, paid in MON to confirm tx
                </td>
                <td className="py-4 text-center text-[#64748B]">
                  Sub-cent, paid in MON when withdrawing
                </td>
              </tr>
              <tr>
                <td className="py-4 font-semibold text-[#111827]">Failed campaign</td>
                <td className="py-4 text-center font-bold text-emerald-600">
                  Full 100% refund of contribution
                </td>
                <td className="py-4 text-center text-[#64748B]">No fee charged</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Worked Example */}
      <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-16 max-w-3xl space-y-4">
        <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2 font-editorial">
          <Coins className="w-5 h-5 text-[#D97706]" />
          Worked Example: A $10,000 Campaign
        </h2>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          A campaign reaches its target and raises <strong>10,000 USDC</strong> (approx. ₹8.5 lakh):
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-[#4B5563] pl-4 border-l-2 border-[#F59E0B]">
          <li>
            • The 3% platform fee equals <strong>300 USDC</strong>, allocated to protocol upkeep and audits.
          </li>
          <li>
            • The creator receives <strong>9,700 USDC</strong> released across their approved milestones.
          </li>
          <li>
            • A backer who contributed <strong>100 USDC</strong> pays exactly 100 USDC—no additional platform charges.
          </li>
        </ul>
        <p className="text-xs text-[#64748B] pt-2">
          Notes: Network transaction fees on Monad are fractions of a cent, determined directly by the Monad decentralized network, not by Sankalp.
        </p>
      </div>

      <div className="max-w-3xl flex items-center justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
        <div>
          <h3 className="text-base font-bold text-[#111827]">Ready to start?</h3>
          <p className="text-xs text-[#4B5563]">Create your campaign without any upfront cost.</p>
        </div>
        <Link
          href="/creator/new"
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xs transition"
        >
          Start a project
        </Link>
      </div>
    </div>
  );
}

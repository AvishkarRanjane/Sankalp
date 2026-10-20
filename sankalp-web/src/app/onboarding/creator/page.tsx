'use client';

import React from 'react';
import Link from 'next/link';
import { UserCheck, ArrowRight } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export default function CreatorVerificationPage() {
  const { address } = useWallet();
  const status: 'not-started' | 'in-review' | 'verified' = 'verified';

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <UserCheck className="w-6 h-6" />
        </div>
        <h1 className="font-editorial text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
          Verify your identity to start projects
        </h1>
        <p className="text-xs text-[#4B5563] max-w-md mx-auto leading-relaxed">
          Backers trust verified creators more. Verification is done by a regulated provider. We
          receive only the result (verified or not), never your documents.
        </p>
      </div>

      {/* Status Chips */}
      <div className="flex items-center justify-center gap-2 mb-8 text-xs flex-wrap">
        <span
          className={`px-3 py-1 rounded-full font-semibold border ${
            status === 'verified'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          ✓ Verified (Demo)
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-medium">
          In review
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-medium">
          Not started
        </span>
      </div>

      {/* 4 Step Process Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#111827]">Accept Creator Terms & SEBI Compliance</h4>
              <p className="text-[11px] text-[#4B5563] mt-0.5 leading-relaxed">
                Acknowledge that Sankalp is strictly reward/donation crowdfunding and no securities or profit shares are offered.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#111827]">Identity Verification (Vendor Sandbox)</h4>
              <p className="text-[11px] text-[#4B5563] mt-0.5 leading-relaxed">
                Automated check verifies student/maker legal status via regulated identity partners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#111827]">Add Monad Wallet for Withdrawals</h4>
              <p className="text-[11px] text-[#4B5563] font-mono mt-0.5">
                Connected address: {address || '0x0000...03e8'}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
          <Link
            href="/creator/new"
            className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition flex items-center justify-center gap-2 shadow-xs"
          >
            Launch Project Wizard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/creator"
            className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition flex items-center justify-center"
          >
            View Creator Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

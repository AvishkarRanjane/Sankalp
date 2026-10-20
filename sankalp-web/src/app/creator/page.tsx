'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { useCurrency } from '@/context/CurrencyContext';
import { PlusCircle, CheckCircle2, Download, ArrowUpRight, Clock, Award } from 'lucide-react';

export default function CreatorDashboardPage() {
  const { user } = useWallet();
  const { formatAmount, formatSecondary } = useCurrency();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'milestones' | 'updates' | 'withdrawals' | 'backers' | 'analytics'>('overview');

  const [withdrawn, setWithdrawn] = useState(false);
  const [updatePosted, setUpdatePosted] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateBody, setUpdateBody] = useState('');

  // Sample data from PDF page 17
  const stats = {
    raised: 8400,
    backers: 213,
    withdrawable: withdrawn ? 0 : 3492,
    nextMilestoneDue: 12,
  };

  const handleWithdraw = () => {
    setWithdrawn(true);
  };

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle || !updateBody) return;
    setUpdatePosted(true);
    setUpdateTitle('');
    setUpdateBody('');
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
            Creator Studio
          </span>
          <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Your projects at a glance
          </h1>
          <p className="text-xs text-[#4B5563] mt-1">
            Creator: <strong className="text-slate-900">{user?.name || 'Aarav Kulkarni'}</strong> • Nashik, India
          </p>
        </div>

        <Link
          href="/creator/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          Create new campaign
        </Link>
      </div>

      {/* Top 4 Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-[#D97706]">{formatAmount(stats.raised)}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Total raised ({formatSecondary(stats.raised)})</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-[#111827]">{stats.backers}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Backers pledged</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-emerald-600">{formatAmount(stats.withdrawable)}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Available to withdraw ({formatSecondary(stats.withdrawable)})</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-indigo-600">{stats.nextMilestoneDue} days</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Next milestone due</div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'projects', label: 'My Projects (2)' },
          { id: 'milestones', label: 'Milestones Proof' },
          { id: 'withdrawals', label: 'Withdrawals' },
          { id: 'updates', label: 'Post Update' },
          { id: 'backers', label: 'Backers & Export' },
          { id: 'analytics', label: 'Analytics' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-500 text-[#D97706]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview / My Projects */}
      {(activeTab === 'overview' || activeTab === 'projects') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Campaign
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  17 days remaining
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111827]">
                Pocket Lab: Low-Cost Science Kits for 40 Village Schools
              </h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span className="font-medium">Progress (70%)</span>
                  <span className="font-bold text-slate-900">$8,400 of $12,000</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[70%]" />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">213 Backers</span>
                <Link
                  href="/projects/pocket-lab-science-kits-village-schools"
                  className="text-amber-600 hover:text-amber-700 hover:underline font-bold inline-flex items-center gap-1"
                >
                  View public campaign <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Completed
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-indigo-500" />
                  Delivered
                </span>
              </div>
              <h3 className="text-base font-bold text-[#111827]">LED Lantern Kit for Exam Season</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600">
                  <span className="font-medium">Funded (111%)</span>
                  <span className="font-bold text-slate-900">{formatAmount(4310)} of {formatAmount(3900)}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full w-full" />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500">126 Backers</span>
                <Link
                  href="/projects/led-lantern-kit-for-exam-season"
                  className="text-indigo-600 hover:text-indigo-700 hover:underline font-bold inline-flex items-center gap-1"
                >
                  View completed project <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Milestones */}
      {activeTab === 'milestones' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Submit Milestone Proof (Pocket Lab)</h3>
            <p className="text-xs text-slate-500 mt-1">Upload on-chain proof documents for community and moderator review.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-emerald-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Milestone 1: Kits built and tested (30%)</span>
                <span className="text-emerald-700 font-medium">✓ Verified & Approved on-chain ({formatAmount(3600)})</span>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                Released
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-amber-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">
                    Milestone 2: Delivery & Teacher Training (50% - {formatAmount(6000)})
                  </span>
                  <span className="text-slate-500">Target date: 75 days after funding</span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] bg-amber-100 text-amber-900 font-semibold">
                  Pending Submission
                </span>
              </div>
              <p className="text-slate-600">
                Required proof: Signed receipts from 40 schools and workshop training photos.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="text"
                  placeholder="Enter IPFS CID or proof documentation link..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                />
                <button className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition text-xs shadow-xs">
                  Submit Proof
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Withdrawals */}
      {activeTab === 'withdrawals' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111827]">Milestone Fund Withdrawals</h3>
              <p className="text-xs text-slate-500">Pull-payment smart contract model</p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              Monad Escrow
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#111827]">Milestone 1 Release (Pocket Lab)</h4>
                <p className="text-slate-500">Approved by platform reviewers</p>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono text-emerald-700">
                  {withdrawn ? formatAmount(0) : formatAmount(3492)}
                </span>
                <span className="block text-[10px] text-slate-400">Net of 3% ({formatAmount(108)}) platform fee</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              {withdrawn ? (
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-mono border border-slate-200">
                  Withdrawn • Tx: 0x98f4...11ea
                </span>
              ) : (
                <button
                  onClick={handleWithdraw}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
                >
                  Withdraw $3,492 USDC to Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Updates */}
      {activeTab === 'updates' && (
        <form onSubmit={handlePostUpdate} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs max-w-2xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#111827]">Post Backer Update</h3>
            <p className="text-xs text-slate-500">All 213 backers will be notified of your progress.</p>
          </div>

          {updatePosted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Update published successfully!
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Update Title</label>
            <input
              type="text"
              required
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              placeholder="e.g. Day 24: First batch of 20 lab kits assembled"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Update Content</label>
            <textarea
              rows={4}
              required
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
              placeholder="Share your progress, photos, and next steps with your backers..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-xs"
          >
            Publish Update
          </button>
        </form>
      )}

      {/* Tab: Backers */}
      {activeTab === 'backers' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111827]">Your Backers (213)</h3>
              <p className="text-xs text-slate-500">Public pledge ledger from smart contract</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold border border-slate-200 flex items-center gap-1.5 transition">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { addr: '0x4B20...02db', amt: 50, date: '02 Sep 2026' },
              { addr: '0x12c4...88ef', amt: 100, date: '01 Sep 2026' },
              { addr: '0x99a2...34bc', amt: 25, date: '30 Aug 2026' },
            ].map((b, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB] flex items-center justify-between">
                <span className="font-mono text-slate-900 font-medium">{b.addr}</span>
                <span className="font-bold text-emerald-700 font-mono">${b.amt} USDC</span>
                <span className="text-slate-500">{b.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-xs text-slate-500 mb-1 font-medium">Total Page Views</div>
            <div className="text-2xl font-black text-[#111827]">3,420</div>
            <div className="text-[11px] text-emerald-700 mt-1 font-semibold">↑ 18% this week</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-xs text-slate-500 mb-1 font-medium">Conversion Rate</div>
            <div className="text-2xl font-black text-[#D97706]">6.2%</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Industry avg: 2.8%</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-xs text-slate-500 mb-1 font-medium">Avg Contribution</div>
            <div className="text-2xl font-black text-indigo-600">$39.40</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">Approx. ₹3,350 INR</div>
          </div>
        </div>
      )}
    </div>
  );
}

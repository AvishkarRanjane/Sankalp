'use client';

import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { useCurrency } from '@/context/CurrencyContext';
import { CheckCircle2, PauseOctagon, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdminPanelPage() {
  const { user, approveMilestone, approvedMilestones } = useWallet();
  const { formatAmount, formatSecondary } = useCurrency();

  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'users' | 'settings'>('overview');

  // Interactive local states for admin actions
  const [reviewedProjects, setReviewedProjects] = useState<Record<string, 'approved' | 'rejected'>>({});
  const [platformPaused, setPlatformPaused] = useState(false);

  // Stats from PDF page 18
  const adminStats = {
    pendingReviews: 7,
    openReports: 3,
    milestonesAwaiting: 5,
    liveCampaigns: 24,
    totalVolume: 412600,
  };

  const handleApproveProject = (id: string) => {
    setReviewedProjects({ ...reviewedProjects, [id]: 'approved' });
  };

  const handleRejectProject = (id: string) => {
    setReviewedProjects({ ...reviewedProjects, [id]: 'rejected' });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-1">
            Super Admin & Moderation Panel
          </span>
          <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Protocol Overview
          </h1>
          <p className="text-xs text-[#4B5563] mt-1">
            Role: Multisig Admin • Connected as <strong className="text-slate-900">{user?.name || 'Protocol Admin'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            Monad Safe Active
          </span>
        </div>
      </div>

      {/* Top 5 Stat Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10 text-center">
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-[#D97706]">{adminStats.pendingReviews}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Pending reviews</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-rose-600">{adminStats.openReports}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Open reports</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-indigo-600">{adminStats.milestonesAwaiting}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Milestones awaiting</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-xl sm:text-2xl font-black text-[#111827]">{adminStats.liveCampaigns}</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Live campaigns</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xl sm:text-2xl font-black text-emerald-700">
            {formatAmount(adminStats.totalVolume)}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">Total volume ({formatSecondary(adminStats.totalVolume)})</div>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Review Queue' },
          { id: 'milestones', label: 'Milestone Approvals (5)' },
          { id: 'users', label: 'Users & Creators' },
          { id: 'settings', label: 'Contract & Fee Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Review Queue */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
            <h3 className="text-base font-bold text-[#111827] mb-4">Project Review Queue</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-slate-500 border-b border-[#E5E7EB]">
                  <tr>
                    <th className="pb-3 font-semibold">Project</th>
                    <th className="pb-3 font-semibold">Creator</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Submitted</th>
                    <th className="pb-3 font-semibold">Risk Flags</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[
                    {
                      id: 'rev_1',
                      title: 'Kolhapur Bio-Acoustic Bird Call Sensors',
                      creator: 'Dr. Rahul Deshmukh',
                      category: 'Science & Research',
                      date: '16 Oct 2026',
                      flags: ['First campaign', 'Specialized gear'],
                    },
                    {
                      id: 'rev_2',
                      title: 'Kalyan Artisan Sourdough Community Oven',
                      creator: 'Sunita Naik',
                      category: 'Small Business',
                      date: '17 Oct 2026',
                      flags: ['Commercial pre-orders'],
                    },
                  ].map((row) => {
                    const status = reviewedProjects[row.id];
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-4 font-bold text-slate-900">{row.title}</td>
                        <td className="py-4 font-medium">{row.creator}</td>
                        <td className="py-4 text-slate-500">{row.category}</td>
                        <td className="py-4 text-slate-500">{row.date}</td>
                        <td className="py-4">
                          <div className="flex gap-1.5 flex-wrap">
                            {row.flags.map((f, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          {status === 'approved' ? (
                            <span className="text-emerald-700 font-bold">Approved ✓</span>
                          ) : status === 'rejected' ? (
                            <span className="text-rose-600 font-bold">Rejected ✗</span>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApproveProject(row.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectProject(row.id)}
                                className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold transition"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Milestone Approvals */}
      {activeTab === 'milestones' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6 max-w-3xl">
          <h3 className="text-base font-bold text-[#111827]">Pending Milestone Proof Approvals</h3>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">
                    Pocket Lab: Milestone 2 (Delivery & Teacher Training)
                  </h4>
                  <p className="text-slate-500 font-medium">Creator: Aarav Kulkarni • Amount: $6,000 USDC</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                  Awaiting Review
                </span>
              </div>
              <p className="text-[#4B5563] leading-relaxed">
                <strong className="text-slate-900">Submitted evidence:</strong> 40 signed delivery acknowledgments from school
                headmasters in Nashik district + 16 workshop training photographs.
              </p>
              <div className="pt-2 flex items-center justify-end gap-3">
                {approvedMilestones['pr_01_2'] ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Released to creator
                  </span>
                ) : (
                  <button
                    onClick={() => approveMilestone('pr_01', 2)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
                  >
                    Approve & Unlock Release ($6,000)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#111827]">Verified Users & Creators</h3>
          <div className="space-y-2 text-xs">
            {[
              { name: 'Aarav Kulkarni', handle: 'aarav-kulkarni', role: 'Creator', kyc: 'Verified', reports: 0 },
              { name: 'Meera Iyer', handle: 'meera-iyer', role: 'Creator', kyc: 'Verified', reports: 0 },
              { name: 'Priya Sharma', handle: 'priya-sharma', role: 'Backer', kyc: 'Standard', reports: 0 },
            ].map((u, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{u.name} (@{u.handle})</span>
                  <span className="text-slate-500">{u.role} • KYC: {u.kyc}</span>
                </div>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Active Status</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs max-w-2xl space-y-6 text-xs text-slate-600">
          <h3 className="text-base font-bold text-[#111827]">Contract & Fee Configuration</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB]">
              <span className="text-slate-500 font-medium">Platform Fee:</span>
              <span className="font-bold text-slate-900">3.00% (300 BPS)</span>
            </div>
            <div className="flex justify-between p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB]">
              <span className="text-slate-500 font-medium">Treasury Address (Monad Safe):</span>
              <span className="font-mono text-slate-900 font-medium">0x70997970C51812dc3A010C7d01b50e0d17dc79C8</span>
            </div>
            <div className="flex justify-between p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB]">
              <span className="text-slate-500 font-medium">Global Emergency Pause Status:</span>
              <span className={platformPaused ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                {platformPaused ? 'PAUSED' : 'ACTIVE'}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <button
              onClick={() => setPlatformPaused(!platformPaused)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                platformPaused
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <PauseOctagon className="w-4 h-4" />
              {platformPaused ? 'Unpause Protocol' : 'Emergency Pause'}
            </button>
            <a
              href="https://testnet.monadexplorer.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
            >
              Open Safe on Monad Explorer <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

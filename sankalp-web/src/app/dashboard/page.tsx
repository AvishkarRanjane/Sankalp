'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { useCurrency } from '@/context/CurrencyContext';
import { shortenAddress, getExplorerTxUrl } from '@/lib/monad';
import {
  Wallet,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  Bell,
  Settings,
  Bookmark,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export default function DonorDashboardPage() {
  const { user, address, contributions } = useWallet();
  const { formatAmount, formatSecondary } = useCurrency();

  const [activeTab, setActiveTab] = useState<'overview' | 'contributions' | 'refunds' | 'saved' | 'notifications' | 'settings'>('overview');

  // Seed sample rows from PDF page 17
  const baseContributions = [
    {
      id: 'tx_p1',
      projectName: 'Pocket Lab: Low-Cost Science Kits',
      projectSlug: 'pocket-lab-science-kits-village-schools',
      amountUSDC: 50,
      date: '02 Sep 2026',
      status: 'Active',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000001',
    },
    {
      id: 'tx_p2',
      projectName: 'Harbour Light Library: Reading Room',
      projectSlug: 'harbour-light-library',
      amountUSDC: 25,
      date: '18 Aug 2026',
      status: 'Active',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000002',
    },
    {
      id: 'tx_p3',
      projectName: 'LED Lantern Kit for Exam Season',
      projectSlug: 'led-lantern-kit-for-exam-season',
      amountUSDC: 20,
      date: '11 Jun 2026',
      status: 'Completed',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000003',
    },
    {
      id: 'tx_p4',
      projectName: 'SolarStack Mini Charging Stations',
      projectSlug: 'solarstack-mini-phone-charging-stations',
      amountUSDC: 100,
      date: '25 Aug 2026',
      status: 'Funded',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000004',
    },
    {
      id: 'tx_p5',
      projectName: 'Chai & Chords: Community Album',
      projectSlug: 'chai-and-chords-community-album',
      amountUSDC: 25,
      date: '01 Sep 2026',
      status: 'Active',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000005',
    },
    {
      id: 'tx_p6',
      projectName: 'Uran Mangrove Nursery Project',
      projectSlug: 'mangrove-nursery-uran-coast',
      amountUSDC: 25,
      date: '10 Sep 2026',
      status: 'Active',
      txHash: '0x0000000000000000000000000000000000000000000000000000000000000006',
    },
  ];

  // Dynamic additions
  const sessionTotal = contributions.reduce((acc, c) => acc + c.amountUSDC, 0);
  const totalContributed = 245 + sessionTotal;
  const projectsBacked = 6 + contributions.length;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
            Backer Dashboard (Private)
          </span>
          <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Priya'}
          </h1>
          <p className="text-xs text-[#4B5563] font-mono mt-1">
            Connected: <strong className="text-slate-900">{shortenAddress(address || '0x4B20...02db')}</strong> • Monad Testnet (10143)
          </p>
        </div>

        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-xs"
        >
          Explore more campaigns →
        </Link>
      </div>

      {/* Top 4 Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-[#111827]">{formatAmount(totalContributed)}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Total contributed ({formatSecondary(totalContributed)})</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-[#D97706]">{projectsBacked}</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Projects backed</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-indigo-600">4</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Active milestones in progress</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
          <div className="text-2xl font-black text-emerald-600">0</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Refunds available</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Layers },
          { id: 'contributions', label: `My Contributions (${projectsBacked})`, icon: Wallet },
          { id: 'refunds', label: 'Refunds (0)', icon: RotateCcw },
          { id: 'saved', label: 'Saved Projects (2)', icon: Bookmark },
          { id: 'notifications', label: 'Notifications (2)', icon: Bell },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-500 text-[#D97706]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview or Contributions */}
      {(activeTab === 'overview' || activeTab === 'contributions') && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
            <h3 className="text-base font-bold text-[#111827] mb-4">Your Contributions Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-slate-500 border-b border-[#E5E7EB]">
                  <tr>
                    <th className="pb-3 font-semibold">Project</th>
                    <th className="pb-3 font-semibold text-right">Amount (USDC)</th>
                    <th className="pb-3 font-semibold text-center">Date</th>
                    <th className="pb-3 font-semibold text-center">Status</th>
                    <th className="pb-3 font-semibold text-right">Monad Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {/* Newly added contributions */}
                  {contributions.map((c) => (
                    <tr key={c.id} className="bg-amber-50/50">
                      <td className="py-3.5 font-medium text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Campaign {c.projectId}
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold text-emerald-700">
                        {formatAmount(c.amountUSDC)}
                        <span className="block text-[10px] text-slate-400 font-normal">({formatSecondary(c.amountUSDC)})</span>
                      </td>
                      <td className="py-3.5 text-center text-slate-500">
                        {new Date(c.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                          Active
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <a
                          href={getExplorerTxUrl(c.txHash)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                        >
                          {shortenAddress(c.txHash)} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}

                  {/* Base sample rows */}
                  {baseContributions.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 font-semibold text-slate-900">
                        <Link href={`/projects/${row.projectSlug}`} className="hover:text-amber-600">
                          {row.projectName}
                        </Link>
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                        {formatAmount(row.amountUSDC)}
                        <span className="block text-[10px] text-slate-400 font-normal">({formatSecondary(row.amountUSDC)})</span>
                      </td>
                      <td className="py-3.5 text-center text-slate-500">{row.date}</td>
                      <td className="py-3.5 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            row.status === 'Completed'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <a
                          href={getExplorerTxUrl(row.txHash)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                        >
                          {shortenAddress(row.txHash)} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Refunds */}
      {activeTab === 'refunds' && (
        <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">No refunds currently pending</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            All projects you have backed are either active and meeting milestones, or successfully
            completed. If any project ever fails to reach its goal by deadline, you can pull a full 100%
            refund right here.
          </p>
        </div>
      )}

      {/* Tab: Saved */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#111827]">Pocket Lab: Science Kits</h4>
              <p className="text-xs text-slate-500">Education • 70% funded</p>
            </div>
            <Link
              href="/projects/pocket-lab-science-kits-village-schools"
              className="text-xs text-amber-600 font-bold hover:underline inline-flex items-center gap-0.5"
            >
              View <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#111827]">Harbour Light Library</h4>
              <p className="text-xs text-slate-500">Community • 68% funded</p>
            </div>
            <Link href="/projects/harbour-light-library" className="text-xs text-amber-600 font-bold hover:underline inline-flex items-center gap-0.5">
              View <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-3 max-w-2xl">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#111827]">Pocket Lab: Milestone 1 released</span>
              <span className="text-[11px] text-slate-400">2 days ago</span>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Aarav submitted batch soldering photos and PCB test results. 30% ($3,600 USDC) released.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#111827]">Harbour Light Library: new update</span>
              <span className="text-[11px] text-slate-400">5 days ago</span>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Meera shared photos of the refurbished reading desks and shelving installation.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs max-w-xl space-y-6 text-xs text-slate-600">
          <div>
            <h4 className="font-bold text-[#111827] mb-1">Connected Monad Wallet</h4>
            <p className="font-mono text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {address || '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#111827] mb-1">Email Notifications</h4>
            <p className="text-slate-500 mb-2">Receive milestone release emails for backed campaigns.</p>
            <input
              type="email"
              defaultValue="priya@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-4 border-t border-rose-200">
            <h4 className="font-bold text-rose-600 mb-1">Danger Zone</h4>
            <p className="text-slate-500 mb-3 leading-relaxed">
              Delete off-chain profile data. Note: On-chain contributions and contract logs cannot be erased from the Monad blockchain.
            </p>
            <button className="px-3.5 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition font-semibold">
              Delete off-chain profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Project, Creator, Category, Milestone, ProjectUpdate, Comment, Contribution } from '@/types';
import { shortenAddress, getExplorerAddressUrl, getExplorerTxUrl } from '@/lib/monad';
import { useWallet } from '@/context/WalletContext';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyRatePill from '@/components/CurrencyRatePill';
import ProjectCard from '@/components/ProjectCard';
import {
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Coins,
  FileCheck,
  AlertCircle,
  Copy,
  Check,
  HelpCircle,
  MessageSquare,
  Gift,
  Award,
  Share2,
} from 'lucide-react';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';

interface ProjectDetailClientProps {
  project: Project;
  creator?: Creator;
  category?: Category;
  milestones: Milestone[];
  updates: ProjectUpdate[];
  comments: Comment[];
  contributions: Contribution[];
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  creator,
  category,
  milestones,
  updates,
  comments,
  contributions,
  relatedProjects,
}: ProjectDetailClientProps) {
  const { isConnected, openConnectModal, addContribution, approvedMilestones } = useWallet();
  const { currency, formatAmount, formatSecondary, currencySymbol, currencyCode, rate } = useCurrency();

  const [activeTab, setActiveTab] = useState<'story' | 'milestones' | 'updates' | 'backers' | 'comments' | 'proof'>('story');
  const [contributeUSDC, setContributeUSDC] = useState<number>(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const contributeBoxRef = useRef<HTMLDivElement>(null);

  // Local additions for dynamic interaction
  const [localRaised, setLocalRaised] = useState(project.raisedUSDC);
  const [localBackers, setLocalBackers] = useState(project.backersCount);
  const [localComments, setLocalComments] = useState(comments);
  const [newCommentText, setNewCommentText] = useState('');

  const percentFunded = Math.round((localRaised / project.goalUSDC) * 100);

  const handleSelectTier = (amount: number) => {
    setContributeUSDC(amount);
    if (contributeBoxRef.current) {
      contributeBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleShareTwitter = () => {
    if (typeof window === 'undefined') return;
    const text = `Supporting "${project.title}" on @SankalpCrowd on Monad! Back milestone-verified projects:`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleShareWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const text = `Check out this project on Sankalp: "${project.title}" - ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const handleContribute = async () => {
    if (!isConnected) {
      openConnectModal();
      return;
    }

    if (contributeUSDC <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = addContribution(project.id, contributeUSDC);
      setLocalRaised((prev) => prev + contributeUSDC);
      setLocalBackers((prev) => prev + 1);
      setTxSuccess(res.txHash);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(project.contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      projectId: project.id,
      authorName: 'You (Backer)',
      authorWallet: '0x4B20...02db',
      body: newCommentText.trim(),
      timestamp: new Date().toISOString(),
    };
    setLocalComments([newComment, ...localComments]);
    setNewCommentText('');
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 lg:py-12 relative overflow-hidden">
      {/* Creative Flowing Background Lines & Floating Icons */}
      <SectionCreativeLines variant="amber-orange" showIcons={true} />

      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap relative z-10">
        <Link href="/" className="hover:text-[#EA580C] transition">
          Home
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-[#EA580C] transition">
          Explore
        </Link>
        <span>/</span>
        <Link href={`/category/${project.categorySlug}`} className="hover:text-[#EA580C] transition">
          {category?.name || project.categorySlug}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-xs">{project.title}</span>
      </div>

      {/* Main Unified 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
        {/* Left Column (lg:col-span-7 xl:col-span-8): Hero content + Tabs navigation + Active Tab Content */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-8">
          {/* Header Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {category?.name || project.categorySlug}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              Sample Project
            </span>
            {project.status === 'live' ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Campaign
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 capitalize">
                {project.status}
              </span>
            )}
          </div>

          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Media / Cover Container */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 border border-[#E5E7EB] shadow-sm">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${project.coverImage || '/demo/default-project.jpg'})`,
              }}
            />
          </div>

          {/* Creator Byline Bar */}
          <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] flex items-center justify-center font-bold text-white text-base shadow-xs shrink-0">
                {creator?.displayName?.charAt(0) || 'C'}
              </div>
              <div>
                <Link
                  href={`/creators/${creator?.handle || 'creator'}`}
                  className="text-sm font-bold text-[#111827] hover:text-[#EA580C] transition flex items-center gap-1.5"
                >
                  {creator?.displayName || 'Verified Creator'}
                  {creator?.verified && (
                    <span className="inline-flex items-center text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      ✓ Verified
                    </span>
                  )}
                </Link>
                <p className="text-xs text-slate-500 mt-0.5">
                  {creator?.city} • Joined {creator?.joined}
                </p>
              </div>
            </div>

            <Link
              href={`/creators/${creator?.handle || 'creator'}`}
              className="text-xs text-[#EA580C] hover:text-[#C2410C] font-bold bg-amber-50 hover:bg-amber-100/70 border border-amber-200 px-3.5 py-1.5 rounded-xl transition"
            >
              View profile →
            </Link>
          </div>

          {/* Tabs Navigation Bar */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none pt-2">
            {[
              { id: 'story', label: 'Story' },
              { id: 'milestones', label: `Milestones (${milestones.length})` },
              { id: 'updates', label: `Updates (${updates.length})` },
              { id: 'backers', label: `Backers (${localBackers})` },
              { id: 'comments', label: `Comments (${localComments.length})` },
              { id: 'proof', label: 'On-chain Proof' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#EA580C] text-[#EA580C]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Story */}
          {activeTab === 'story' && (
            <div className="space-y-8">
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] shadow-xs">
                {project.story}
              </div>

              {/* Budget Breakdown Table */}
              {project.budgetBreakdown && project.budgetBreakdown.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-editorial">
                    <Coins className="w-5 h-5 text-amber-500" />
                    What the money pays for
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="pb-3">Item</th>
                          <th className="pb-3 text-right">Amount ({currencyCode})</th>
                          <th className="pb-3 text-right">Approx. ({currency === 'INR' ? 'USDC' : 'INR'})</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {project.budgetBreakdown.map((b, i) => (
                          <tr key={i} className="hover:bg-slate-50/60 transition">
                            <td className="py-3 font-medium">{b.item}</td>
                            <td className="py-3 text-right font-mono font-bold text-slate-900">
                              {formatAmount(b.amount)}
                            </td>
                            <td className="py-3 text-right text-slate-500">{formatSecondary(b.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Risks & Challenges */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-editorial">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Risks and challenges
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{project.risks}</p>
              </div>

              {/* Project FAQs Accordion / Cards */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 font-editorial">
                  <HelpCircle className="w-5 h-5 text-amber-500" />
                  Project FAQ
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1 text-sm">Who gets the money?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      The project&apos;s smart contract holds it. The creator can only withdraw released milestones
                      after approval.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1 text-sm">What if the goal is not reached?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Every backer can claim a full refund directly from the smart contract.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1 text-sm">Can I see where my contribution went?</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Yes, every contribution and release is shown in the On-chain proof tab with a block-explorer link.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Milestones */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 mb-6 flex items-center justify-between">
                <span>
                  Funds are unlocked in stages. Creators must submit verifiable proof before each release.
                </span>
                <span className="font-bold text-[#D97706]">{milestones.length} Milestones</span>
              </div>

              {milestones.map((m, idx) => {
                const isApproved = approvedMilestones[`${project.id}_${m.index}`] || m.status === 'released';
                return (
                  <div
                    key={m.id}
                    className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-[#D97706] text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                        {isApproved ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Released / Approved
                          </span>
                        ) : m.status === 'pending' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Pending Review
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        <strong className="text-slate-700 font-semibold">Proof required:</strong> {m.proofRequired}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <div className="text-base font-bold text-slate-900 font-mono">
                        {formatAmount(m.amountUSDC)}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {m.percent}% of total goal{' '}
                        <span className="text-[11px] text-slate-400">({formatSecondary(m.amountUSDC)})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Updates */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              {updates.length > 0 ? (
                updates.map((u) => (
                  <div key={u.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                        Day {u.dayNumber} Update
                      </span>
                      <span className="text-slate-500 font-medium">{new Date(u.timestamp).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 font-editorial">{u.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{u.body}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-slate-500 rounded-2xl bg-white border border-[#E5E7EB]">
                  No project updates posted yet. Creator will post updates as work progresses!
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Backers */}
          {activeTab === 'backers' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-4">
                All contributions are permanently recorded on the Monad testnet ledger.
              </p>
              {contributions.length > 0 ? (
                contributions.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-600 font-bold">
                        0x
                      </div>
                      <div>
                        <span className="font-mono text-slate-900 font-bold">{shortenAddress(c.backerWallet)}</span>
                        <p className="text-[11px] text-slate-500">
                          {new Date(c.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 font-mono text-sm block">
                        +{formatAmount(c.amountUSDC)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        ({formatSecondary(c.amountUSDC)})
                      </span>
                      <a
                        href={getExplorerTxUrl(c.txHash)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium hover:underline inline-flex items-center gap-0.5"
                      >
                        Inspect tx ↗
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-slate-500 rounded-2xl bg-white border border-[#E5E7EB]">
                  Be the first backer for this campaign!
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Comments */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <form onSubmit={handleAddComment} className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-3.5">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  Ask a question or leave encouragement
                </label>
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share your thoughts with the creator and community..."
                  className="w-full p-3.5 rounded-xl bg-[#FCFAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {localComments.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{c.authorName}</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {shortenAddress(c.authorWallet)}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: On-chain Proof */}
          {activeTab === 'proof' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-editorial">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  Verified Monad EVM Smart Contract
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This project is bound by an immutable Campaign contract. Rules cannot be modified
                  by the platform, creator, or any backer.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 block text-[11px] font-semibold uppercase">Campaign Contract Address</span>
                      <span className="font-mono text-slate-900 text-xs font-bold">{project.contractAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyContract}
                        className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                        title="Copy Address"
                      >
                        {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={getExplorerAddressUrl(project.contractAddress)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                        title="View on Explorer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold uppercase">Network & Chain ID</span>
                      <span className="text-slate-900 font-bold text-sm">Monad Testnet (10143)</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#FCFAF6] border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-semibold uppercase">IPFS Metadata CID</span>
                      <span className="font-mono text-slate-900 text-xs truncate block font-bold">{project.metadataCID}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (lg:col-span-5 xl:col-span-4): Sticky Funding Card + Support Tiers + Creator Profile + Escrow Shield + Share */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* 1. Main Funding & Contribution Card */}
          <div ref={contributeBoxRef} className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Goal & Raised */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                    {formatAmount(localRaised)}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    approx. <strong className="text-slate-800 font-semibold">{formatSecondary(localRaised)}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-[#EA580C]">{percentFunded}%</div>
                  <div className="text-xs text-slate-500">of {formatAmount(project.goalUSDC)} goal</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#10B981] transition-all duration-700"
                  style={{ width: `${Math.min(percentFunded, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <strong className="text-slate-900 font-bold">{localBackers}</strong> backers
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <strong className="text-slate-900 font-bold">
                    {project.daysLeft > 0 ? `${project.daysLeft} days left` : 'Completed'}
                  </strong>
                </span>
              </div>
            </div>

            {/* Contribute Box */}
            <div className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-4">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider">
                  Contribute Amount ({currencyCode})
                </span>
                <CurrencyRatePill />
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((amt) => {
                  const isSelected = contributeUSDC === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setContributeUSDC(amt)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#EA580C] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-400'
                      }`}
                    >
                      {currency === 'INR' ? `₹${amt * rate}` : `$${amt}`}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="space-y-1.5">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={
                      currency === 'INR'
                        ? Math.round(contributeUSDC * rate) || ''
                        : contributeUSDC || ''
                    }
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (currency === 'INR') {
                        setContributeUSDC(val > 0 ? Math.round((val / rate) * 100) / 100 : 0);
                      } else {
                        setContributeUSDC(val);
                      }
                    }}
                    className="w-full pl-8 pr-16 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs"
                    placeholder="Custom amount"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500">
                    {currencyCode}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 text-right pr-1">
                  {currency === 'INR' ? (
                    <span>
                      ≈ ${contributeUSDC.toFixed(2)} USDC on Monad testnet
                    </span>
                  ) : (
                    <span>
                      ≈ ₹{Math.round(contributeUSDC * rate).toLocaleString('en-IN')} INR
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleContribute}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EA580C] hover:brightness-105 shadow-md shadow-amber-500/25 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>Confirming Monad Transaction...</>
                ) : !isConnected ? (
                  <>Connect Wallet & Back Project</>
                ) : currency === 'INR' ? (
                  <>Contribute ₹{Math.round(contributeUSDC * rate).toLocaleString('en-IN')} (≈ ${contributeUSDC} USDC)</>
                ) : (
                  <>Contribute ${contributeUSDC} USDC</>
                )}
              </button>

              {/* Microcopy */}
              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                You will confirm one transaction in your wallet. You can claim a refund if the goal
                is not met by the deadline.
              </p>
            </div>

            {/* Success Notification */}
            {txSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Contribution confirmed on Monad!
                </div>
                <p className="text-[11px] text-emerald-700">
                  Your funds are secured in the campaign escrow contract.
                </p>
                <div className="flex items-center justify-between font-mono text-[10px] pt-1.5 border-t border-emerald-200">
                  <span className="truncate">{shortenAddress(txSuccess)}</span>
                  <a
                    href={getExplorerTxUrl(txSuccess)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
                  >
                    View on Explorer <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Smart Contract Escrow Guarantee Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Sankalp Escrow Guarantee
              </div>
              <ul className="space-y-1.5 text-[11px] text-emerald-800/90 leading-relaxed">
                <li>• Funds held in smart contract until milestones are approved</li>
                <li>• 100% refund available if campaign misses deadline</li>
                <li>• Platform fee is only 3% upon successful delivery</li>
              </ul>
            </div>
          </div>

          {/* 2. Support Tiers / Rewards Card */}
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#EA580C]" />
                <h3 className="font-editorial text-lg font-bold text-[#111827]">Support Tiers</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Pledge & Perks
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select a pledge tier to support this project and receive verified backer perks.
            </p>

            <div className="space-y-3 pt-1">
              {/* Tier 1 */}
              <div
                onClick={() => handleSelectTier(6)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  contributeUSDC === 6
                    ? 'border-[#EA580C] bg-orange-50/40 ring-1 ring-[#EA580C]'
                    : 'border-slate-200 bg-[#FCFAF6] hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Community Backer</h4>
                    <span className="text-xs font-mono font-bold text-[#EA580C]">
                      {formatAmount(6)}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
                      ({formatSecondary(6)})
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`text-[11px] font-bold px-3 py-1 rounded-lg transition ${
                      contributeUSDC === 6
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {contributeUSDC === 6 ? 'Selected' : 'Select'}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  Join the backer community and help this initiative get off the ground.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    On-chain Backer Badge on Monad
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Exclusive milestone release updates
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Name listed in project backer registry
                  </li>
                </ul>
              </div>

              {/* Tier 2: Most Popular */}
              <div
                onClick={() => handleSelectTier(30)}
                className={`p-4 rounded-2xl border transition relative cursor-pointer ${
                  contributeUSDC === 30
                    ? 'border-[#EA580C] bg-orange-50/40 ring-1 ring-[#EA580C]'
                    : 'border-amber-300 bg-amber-50/20 hover:border-amber-400 hover:bg-amber-50/40'
                }`}
              >
                <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                  Most Popular
                </span>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Early Adopter</h4>
                    <span className="text-xs font-mono font-bold text-[#EA580C]">
                      {formatAmount(30)}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
                      ({formatSecondary(30)})
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`text-[11px] font-bold px-3 py-1 rounded-lg transition ${
                      contributeUSDC === 30
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {contributeUSDC === 30 ? 'Selected' : 'Select'}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  Directly accelerate milestone delivery with early access to project outputs.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    All Community Backer benefits
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Early prototype CAD / build documentation
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Voting rights on roadmap milestone reviews
                  </li>
                </ul>
              </div>

              {/* Tier 3: Founding Patron */}
              <div
                onClick={() => handleSelectTier(120)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  contributeUSDC === 120
                    ? 'border-[#EA580C] bg-orange-50/40 ring-1 ring-[#EA580C]'
                    : 'border-slate-200 bg-[#FCFAF6] hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Founding Patron</h4>
                    <span className="text-xs font-mono font-bold text-[#EA580C]">
                      {formatAmount(120)}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
                      ({formatSecondary(120)})
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`text-[11px] font-bold px-3 py-1 rounded-lg transition ${
                      contributeUSDC === 120
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {contributeUSDC === 120 ? 'Selected' : 'Select'}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  High-impact patronage with direct recognition and physical project deliverables.
                </p>
                <ul className="text-[11px] text-slate-500 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    All Early Adopter benefits
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    1-on-1 strategy call with creator team
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Physical hardware sample / engraved donor plate
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. About the Creator Detailed Card */}
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-editorial text-lg font-bold text-[#111827]">About the Creator</h3>
              </div>
              {creator?.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                  ✓ Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#EA580C] flex items-center justify-center font-bold text-white text-lg shadow-xs shrink-0">
                {creator?.displayName?.charAt(0) || 'C'}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 hover:text-[#EA580C] transition">
                  <Link href={`/creators/${creator?.handle || 'creator'}`}>
                    {creator?.displayName || 'Verified Creator'}
                  </Link>
                </h4>
                <p className="text-xs text-slate-500">
                  @{creator?.handle || 'creator'} • {creator?.city || 'India'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {creator?.bio || 'Building open, verifiable technology and hardware to empower local communities across India.'}
            </p>

            <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                <span className="block text-slate-400 text-[10px] font-semibold uppercase">Joined</span>
                <span className="font-bold text-slate-800">{creator?.joined || 'Oct 2024'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 text-center">
                <span className="block text-slate-400 text-[10px] font-semibold uppercase">Campaigns</span>
                <span className="font-bold text-slate-800">1 Live</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Link
                href={`/creators/${creator?.handle || 'creator'}`}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition"
              >
                View Profile
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(creator?.walletAddress || project.contractAddress);
                    alert('Creator wallet address copied to clipboard!');
                  }
                }}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Copy Creator Wallet"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Wallet</span>
              </button>
            </div>
          </div>

          {/* 4. Spread the Word / Share Card */}
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#EA580C]" />
              <h3 className="font-editorial text-lg font-bold text-[#111827]">Spread the Word</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Campaigns that get shared across communities reach their milestone goal 4x faster.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Twitter / X */}
              <button
                type="button"
                onClick={handleShareTwitter}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Share on X</span>
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  copiedShareLink
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {copiedShareLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 font-editorial">Similar campaigns you might like</h3>
            <Link href="/explore" className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C]">
              Explore more →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

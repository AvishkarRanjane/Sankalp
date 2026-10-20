'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { useCurrency } from '@/context/CurrencyContext';
import { getCategories } from '@/lib/data';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function CreateProjectWizard() {
  const { address, openConnectModal } = useWallet();
  const { formatAmount, formatSecondary } = useCurrency();
  const categories = getCategories();

  const [step, setStep] = useState<number>(1);

  // Form states
  // Step 1: Basics
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categorySlug, setCategorySlug] = useState('education-students');
  const [location, setLocation] = useState('Pune, Maharashtra');
  const [coverImage, setCoverImage] = useState('/demo/pocket-lab-science-kits-village-schools.jpg');

  // Step 2: Story & Risks
  const [story, setStory] = useState('');
  const [risks, setRisks] = useState('');

  // Step 3: Rewards
  const [rewards, setRewards] = useState<{ title: string; priceUSDC: number; description: string }[]>([
    { title: 'Community Supporter Plaque', priceUSDC: 25, description: 'Your name on our open-source repo and wall of gratitude.' },
  ]);

  // Step 4: Goal & Milestones
  const [goalUSDC, setGoalUSDC] = useState<number>(5000);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [milestones, setMilestones] = useState<{ title: string; percent: number; proofRequired: string }[]>([
    { title: 'Component Procurement & Testing', percent: 40, proofRequired: 'Vendor GST invoices and initial prototype photos.' },
    { title: 'Full Assembly & Quality Checks', percent: 40, proofRequired: 'Video demonstration of 20 assembled units.' },
    { title: 'Field Deployment & Open Documentation', percent: 20, proofRequired: 'Signed receipt from beneficiaries and GitHub link.' },
  ]);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedSuccess, setDeployedSuccess] = useState(false);

  const totalPercent = milestones.reduce((sum, m) => sum + (Number(m.percent) || 0), 0);
  const isMilestonesValid = totalPercent === 100;

  const addMilestone = () => {
    if (milestones.length >= 5) return;
    setMilestones([...milestones, { title: 'New Milestone', percent: 0, proofRequired: 'Documentation and receipts' }]);
  };

  const removeMilestone = (idx: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const updateMilestone = (idx: number, field: string, val: string | number) => {
    const updated = [...milestones];
    updated[idx] = { ...updated[idx], [field]: val };
    setMilestones(updated);
  };

  const handleDeploy = () => {
    if (!address) {
      openConnectModal();
      return;
    }
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedSuccess(true);
    }, 1500);
  };

  const steps = [
    { n: 1, label: 'Basics' },
    { n: 2, label: 'Story' },
    { n: 3, label: 'Rewards' },
    { n: 4, label: 'Milestones' },
    { n: 5, label: 'Review' },
    { n: 6, label: 'Deploy' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Wizard Progress Stepper */}
      <div className="mb-10 text-left">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          Campaign Launch Wizard
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-3">
          Create a milestone-backed campaign
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] mb-8">
          Design your campaign, structure your milestone escrow plan, and launch securely on the Monad blockchain.
        </p>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center text-xs">
          {steps.map((s) => {
            const isCurrent = step === s.n;
            const isCompleted = step > s.n;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => isCompleted && setStep(s.n)}
                className={`py-3 px-2 rounded-2xl border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-bold border-transparent shadow-sm shadow-amber-500/25'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/60 font-semibold cursor-pointer'
                    : 'bg-white text-slate-500 border-slate-200 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s.n}
                  </span>
                )}
                <span className="font-medium truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 1: Basics */}
      {step === 1 && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-[#111827] font-editorial">1. Project Basics</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Set the foundation for your project with a concise title, description, and high-quality cover photo.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Project Title (Max 70 characters)
              </label>
              <input
                type="text"
                maxLength={70}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SolarStack Mini: Solar Phone Chargers for Bus Stops"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm"
              />
              <span className="text-[11px] text-slate-500 font-medium block text-right">{title.length}/70 characters</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                One-Line Summary (Max 140 characters)
              </label>
              <input
                type="text"
                maxLength={140}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="e.g. Ten open-design solar charging stations for bus stops without reliable power."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Image URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://... or /demo/..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              disabled={!title || !summary}
              className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-sm shadow-amber-500/20 transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Continue to Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Story & Risks */}
      {step === 2 && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-[#111827] font-editorial">2. Story & Risks</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Give donors the full context. Detail what makes your project unique and transparently explain anticipated challenges.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Detailed Story (Who you are, what you are building, and why it matters)
              </label>
              <textarea
                rows={7}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Describe the problem, the solution, and who benefits in your community..."
                className="w-full p-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Honest Risks & Contingencies
              </label>
              <textarea
                rows={3}
                value={risks}
                onChange={(e) => setRisks(e.target.value)}
                placeholder="What could delay delivery (e.g. parts lead time, monsoon season, supply chain) and how will you mitigate it?"
                className="w-full p-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs text-sm leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-sm shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Continue to Rewards <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Rewards (Optional) */}
      {step === 3 && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#111827] font-editorial">3. Rewards & Tiers (Optional)</h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Offer tangible perks, digital rewards, or recognition plaques to thank your backers.
              </p>
            </div>
            <button
              onClick={() =>
                setRewards([...rewards, { title: 'Kit Reward', priceUSDC: 50, description: 'One working unit delivered with manual.' }])
              }
              className="text-xs text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1 font-bold bg-amber-50 hover:bg-amber-100/70 border border-amber-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Tier
            </button>
          </div>

          <div className="space-y-4">
            {rewards.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-sm">Tier #{i + 1}</span>
                  {rewards.length > 1 && (
                    <button
                      onClick={() => setRewards(rewards.filter((_, idx) => idx !== i))}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Remove tier"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={r.title}
                    onChange={(e) => {
                      const updated = [...rewards];
                      updated[i].title = e.target.value;
                      setRewards(updated);
                    }}
                    placeholder="Reward title (e.g. Early Bird Device)"
                    className="sm:col-span-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={r.priceUSDC}
                      onChange={(e) => {
                        const updated = [...rewards];
                        updated[i].priceUSDC = Number(e.target.value);
                        setRewards(updated);
                      }}
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  value={r.description}
                  onChange={(e) => {
                    const updated = [...rewards];
                    updated[i].description = e.target.value;
                    setRewards(updated);
                  }}
                  placeholder="Reward details, physical perks & estimated dispatch month"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-sm shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Continue to Milestones <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Goal & Milestones */}
      {step === 4 && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-[#111827] font-editorial">4. Funding Goal & Milestone Escrow Plan</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Funds will be locked in the Monad escrow smart contract and released tranche-by-tranche as you submit verified milestone proofs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Total Goal (USDC)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">$</span>
                <input
                  type="number"
                  min="100"
                  value={goalUSDC}
                  onChange={(e) => setGoalUSDC(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs"
                />
              </div>
              <span className="text-xs text-[#D97706] font-semibold block mt-1">Approx. {formatSecondary(goalUSDC)}</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Campaign Duration (7 to 60 days)</label>
              <input
                type="number"
                min="7"
                max="60"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition shadow-xs"
              />
              <span className="text-xs text-slate-500 block mt-1">Standard recommended duration: 30 days</span>
            </div>
          </div>

          {/* Milestones list with live 100% check */}
          <div className="pt-5 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Milestone Tranches (2 to 5 stages)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The sum of milestone percentages must equal exactly 100%. Current sum:{' '}
                  <strong className={`font-bold ${isMilestonesValid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {totalPercent}%
                  </strong>
                </p>
              </div>
              {milestones.length < 5 && (
                <button
                  onClick={addMilestone}
                  className="text-xs text-[#EA580C] hover:text-[#C2410C] font-bold bg-amber-50 hover:bg-amber-100/70 border border-amber-200 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 w-fit cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Milestone
                </button>
              )}
            </div>

            {/* Validation Banner if not 100% */}
            {!isMilestonesValid && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Adjust the percentage numbers below so the total equals exactly 100%.</span>
              </div>
            )}

            {milestones.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-[#D97706] font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">Milestone #{idx + 1}</span>
                  </div>
                  {milestones.length > 1 && (
                    <button
                      onClick={() => removeMilestone(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Remove milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => updateMilestone(idx, 'title', e.target.value)}
                    placeholder="Milestone title (e.g. Alpha Prototype)"
                    className="sm:col-span-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
                  />
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={m.percent}
                      onChange={(e) => updateMilestone(idx, 'percent', Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:border-amber-500 text-right pr-8"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={m.proofRequired}
                  onChange={(e) => updateMilestone(idx, 'proofRequired', e.target.value)}
                  placeholder="Verifiable proof required (GST invoices, working video link, audit document)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!isMilestonesValid}
              className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-sm shadow-amber-500/20 transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Continue to Review <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-[#111827] font-editorial">5. Preview & Review Checklist</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Verify your campaign parameters before deploying to the Monad smart contract.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB] space-y-4 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Project Title:</span>
              <span className="font-bold text-slate-900 text-right max-w-sm">{title || 'Sample Title'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Funding Goal:</span>
              <span className="font-bold text-[#EA580C] font-mono text-base">
                {formatAmount(goalUSDC)} <span className="text-xs font-normal text-slate-500">({formatSecondary(goalUSDC)})</span>
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Milestones Escrow:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-xs">
                {milestones.length} stages (100% verified)
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 font-medium">Creator Wallet:</span>
              <span className="font-mono text-slate-700 text-xs font-semibold">{address || '0x0000...03e8'}</span>
            </div>
          </div>

          {/* Compliance acceptance */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
              />
              <span className="leading-relaxed">
                I confirm that this campaign offers rewards and pre-orders only, complies with Indian SEBI &
                crowdfunding guidelines (no equity, dividends, or financial profit returns), and that escrow milestone rules
                cannot be modified after deploying to the Monad contract.
              </span>
            </label>
          </div>

          <div className="pt-4 flex justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(4)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(6)}
              disabled={!termsAccepted}
              className="px-7 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-sm shadow-amber-500/20 transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Proceed to Deploy <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Deploy to Monad */}
      {step === 6 && (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-6 text-center">
          {deployedSuccess ? (
            <div className="py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-editorial">Campaign Contract Deployed!</h2>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                Your campaign has been successfully deployed to the Monad Testnet EVM (Chain ID 10143) and
                registered in the Sankalp Factory.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3.5">
                <Link
                  href="/creator"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] text-slate-950 font-bold text-sm shadow-sm transition"
                >
                  Go to Creator Dashboard
                </Link>
                <Link
                  href="/explore"
                  className="px-7 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition"
                >
                  View Public Directory
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 space-y-6 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center mx-auto shadow-sm">
                <Rocket className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-[#111827] font-editorial mb-2">Deploy Campaign to Monad</h2>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  This will generate an immutable escrow contract on Monad Testnet with your {milestones.length} milestones and
                  anchor your project metadata to IPFS.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-700 text-left flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Zero creator platform listing fee. Only standard gas on Monad Testnet is required to sign.</span>
              </div>

              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full py-4 rounded-2xl font-bold text-base text-slate-950 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EA580C] hover:brightness-105 shadow-md shadow-amber-500/25 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isDeploying ? 'Deploying to Monad...' : 'Sign & Deploy Campaign'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

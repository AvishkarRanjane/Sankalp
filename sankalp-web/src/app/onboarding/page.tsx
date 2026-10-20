'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { User, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useWallet();

  const [displayName, setDisplayName] = useState(user?.name || '');
  const [handle, setHandle] = useState('priya-sharma');
  const [bio, setBio] = useState('Tech enthusiast backing hardware and community libraries in Maharashtra.');
  const [intent, setIntent] = useState<'backer' | 'creator' | 'both'>('backer');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      if (intent === 'creator' || intent === 'both') {
        router.push('/onboarding/creator');
      } else {
        router.push('/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <User className="w-6 h-6" />
        </div>
        <h1 className="font-editorial text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
          Tell us a little about you
        </h1>
        <p className="text-xs text-[#4B5563]">
          Set up your public profile on Sankalp. You can edit this anytime.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
        {saved ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-[#111827]">Profile updated!</h3>
            <p className="text-xs text-[#4B5563]">Redirecting to next step...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Priya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Unique Handle</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">@</span>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="priya-sharma"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Short Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell the community what kinds of ideas you support..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">I want to</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'backer', label: 'Back projects' },
                  { id: 'creator', label: 'Start a project' },
                  { id: 'both', label: 'Both' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntent(item.id as typeof intent)}
                    className={`py-2 rounded-xl font-semibold border transition ${
                      intent === item.id
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Email for updates <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-xs"
            >
              Save Profile & Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

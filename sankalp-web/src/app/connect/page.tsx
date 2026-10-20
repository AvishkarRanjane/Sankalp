'use client';

import React from 'react';
import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';
import { Wallet, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MONAD_TESTNET } from '@/lib/monad';

export default function ConnectPage() {
  const { isConnected, address, connect, disconnect, isWrongNetwork, switchNetwork, user } = useWallet();

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
        <Wallet className="w-7 h-7" />
      </div>

      <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
        Connect your wallet
      </h1>

      <p className="text-sm text-[#4B5563] mb-8 leading-relaxed max-w-md mx-auto">
        Choose a wallet to continue. You will be asked to sign a message to prove ownership. This is
        free and does not move any funds.
      </p>

      {isWrongNetwork && isConnected && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-6 text-left flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#111827]">Wrong Network Detected</p>
            <p className="text-slate-600">
              Sankalp runs on Monad Testnet (Chain ID {MONAD_TESTNET.id}). Click below to switch automatically.
            </p>
            <button
              onClick={switchNetwork}
              className="mt-2 px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition hover:bg-amber-300 shadow-xs"
            >
              Switch to Monad
            </button>
          </div>
        </div>
      )}

      {isConnected ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200 shadow-xs text-left space-y-4 mb-6">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Wallet connected successfully!
          </div>
          <div className="p-3.5 rounded-xl bg-[#FCFAF6] border border-[#E5E7EB] font-mono text-xs text-slate-900 break-all font-medium">
            {address}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Role: <strong className="text-slate-900 capitalize">{user?.role}</strong></span>
            <span>Network: <strong className="text-indigo-600">Monad Testnet</strong></span>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex-1 py-2.5 rounded-xl font-bold text-xs text-center text-slate-950 bg-amber-400 hover:bg-amber-300 transition shadow-xs"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={disconnect}
              className="px-4 py-2.5 rounded-xl text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition font-semibold"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          <button
            onClick={() => connect('metamask')}
            className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-amber-400 text-left flex items-center justify-between transition group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center font-bold text-lg">
                🦊
              </div>
              <div>
                <div className="text-sm font-bold text-[#111827] group-hover:text-amber-600 transition">
                  MetaMask
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Connect using browser extension</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => connect('rabby')}
            className="w-full p-4 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-indigo-400 text-left flex items-center justify-between transition group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-lg">
                🐰
              </div>
              <div>
                <div className="text-sm font-bold text-[#111827] group-hover:text-indigo-600 transition">
                  Rabby Wallet
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Fast EVM multi-chain connector</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Quick Demo Personas */}
          <div className="pt-6 border-t border-[#E5E7EB] text-left">
            <span className="text-[11px] font-bold uppercase text-[#D97706] tracking-wider block mb-3">
              Instant Hackathon Demo Login (No extension required)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => connect('demo-backer')}
                className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-amber-400 text-left transition shadow-xs group"
              >
                <div className="text-xs font-bold text-[#111827] group-hover:text-amber-600">Backer</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Priya Sharma ($245)</div>
              </button>
              <button
                onClick={() => connect('demo-creator')}
                className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-amber-400 text-left transition shadow-xs group"
              >
                <div className="text-xs font-bold text-[#111827] group-hover:text-amber-600">Creator</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Aarav K. ($8.4k)</div>
              </button>
              <button
                onClick={() => connect('demo-admin')}
                className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#E5E7EB] hover:border-amber-400 text-left transition shadow-xs group"
              >
                <div className="text-xs font-bold text-[#111827] group-hover:text-amber-600">Admin</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Monad Multisig</div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Non-custodial. You maintain 100% control over your funds and keys.</span>
      </div>
    </div>
  );
}

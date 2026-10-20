'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { MONAD_TESTNET, getExplorerAddressUrl } from '@/lib/monad';
import {
  Wallet,
  X,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export default function ConnectWalletModal() {
  const {
    isConnectModalOpen,
    closeConnectModal,
    isConnected,
    isConnecting,
    address,
    user,
    role,
    isWrongNetwork,
    connect,
    disconnect,
    switchNetwork,
  } = useWallet();

  const [activeTab, setActiveTab] = useState<'wallets' | 'sandbox' | 'custom'>('wallets');
  const [customInput, setCustomInput] = useState('');
  const [customError, setCustomError] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasInjected, setHasInjected] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);

  // Check for window.ethereum on mount safely
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        setHasInjected(Boolean((window as unknown as { ethereum?: unknown }).ethereum));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConnectModalOpen) {
        closeConnectModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConnectModalOpen, closeConnectModal]);

  if (!isConnectModalOpen) return null;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnectProvider = async (provider: 'metamask' | 'coinbase' | 'rabby' | 'phantom') => {
    setConnectingProvider(provider);
    try {
      await connect(provider);
    } finally {
      setConnectingProvider(null);
    }
  };

  const handleCustomConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(clean)) {
      setCustomError('Please enter a valid 42-character EVM address (starts with 0x)');
      return;
    }
    setCustomError('');
    await connect('custom-address', clean);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={closeConnectModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-purple-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center shadow-xs">
              <Wallet className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#111827] font-sans-modern">
                {isConnected ? (user?.name || 'Connected Account') : 'Connect to Sankalp'}
              </h2>
              <p className="text-xs text-[#6B7280]">
                {isConnected ? 'Monad Testnet EVM Session' : 'Escrow crowdfunding on Monad'}
              </p>
            </div>
          </div>

          <button
            onClick={closeConnectModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition active:scale-90"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* If already connected, show account manager */}
          {isConnected ? (
            <div className="space-y-5">
              {/* Connected Address Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Wallet Address
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700">Monad Testnet</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-slate-900 break-all font-semibold">
                  <span>{address}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition shrink-0"
                    title="Copy address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Role: <strong className="capitalize text-slate-900">{role}</strong></span>
                  <span>Balance: <strong className="text-slate-900">500.00 USDC</strong></span>
                </div>
              </div>

              {/* Wrong Network Banner */}
              {isWrongNetwork && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Wrong Network Detected</p>
                    <p className="text-[11px] text-amber-800">
                      Please switch to Monad Testnet (Chain ID {MONAD_TESTNET.id}) to sign escrow transactions.
                    </p>
                    <button
                      onClick={switchNetwork}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition"
                    >
                      <RefreshCw className="w-3 h-3" /> Switch to Monad
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={getExplorerAddressUrl(address || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View on Explorer
                </a>

                <button
                  onClick={() => {
                    disconnect();
                    closeConnectModal();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold text-rose-700 transition"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Tabs Bar */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 mb-6">
                <button
                  onClick={() => setActiveTab('wallets')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    activeTab === 'wallets'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EVM Wallets
                </button>
                <button
                  onClick={() => setActiveTab('sandbox')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'sandbox'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Testnet Roles
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    activeTab === 'custom'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Custom 0x
                </button>
              </div>

              {/* Tab 1: Web3 Injected Wallets */}
              {activeTab === 'wallets' && (
                <div className="space-y-3">
                  {/* MetaMask */}
                  <button
                    onClick={() => handleConnectProvider('metamask')}
                    disabled={isConnecting}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center font-bold text-orange-600 text-sm">
                        🦊
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">MetaMask</span>
                          {hasInjected && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                              Detected
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">Connect with browser extension</span>
                      </div>
                    </div>
                    {connectingProvider === 'metamask' ? (
                      <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>

                  {/* Coinbase Wallet */}
                  <button
                    onClick={() => handleConnectProvider('coinbase')}
                    disabled={isConnecting}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-600 text-sm">
                        🔵
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-900 block">Coinbase Wallet</span>
                        <span className="text-xs text-slate-500">Self-custodial mobile or extension</span>
                      </div>
                    </div>
                    {connectingProvider === 'coinbase' ? (
                      <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>

                  {/* Rabby / Phantom */}
                  <button
                    onClick={() => handleConnectProvider('rabby')}
                    disabled={isConnecting}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center font-bold text-purple-600 text-sm">
                        🐰
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-900 block">Rabby / Phantom</span>
                        <span className="text-xs text-slate-500">Multi-chain EVM Web3 wallet</span>
                      </div>
                    </div>
                    {connectingProvider === 'rabby' ? (
                      <RefreshCw className="w-4 h-4 text-purple-500 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                    )}
                  </button>

                  {!hasInjected && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                      <p className="text-xs text-slate-600">
                        No EVM extension found in this tab? You can use the{' '}
                        <button
                          onClick={() => setActiveTab('sandbox')}
                          className="font-bold text-amber-600 underline hover:text-amber-700"
                        >
                          Testnet Roles
                        </button>{' '}
                        tab for instant 1-click testnet simulation!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Testnet Roles Sandbox */}
              {activeTab === 'sandbox' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 mb-2">
                    Select a pre-funded testnet account tailored for hackathon evaluation:
                  </p>

                  {/* Backer Role */}
                  <button
                    onClick={() => connect('demo-backer')}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex items-center justify-between group text-left active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">Priya Sharma</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                            Verified Backer
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block">500 USDC balance • 3 active pledges</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* Creator Role */}
                  <button
                    onClick={() => connect('demo-creator')}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between group text-left active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">Aarav Kulkarni</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase">
                            Project Creator
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block">Creator of Pocket Lab Kits • Milestone author</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </button>

                  {/* Admin Role */}
                  <button
                    onClick={() => connect('demo-admin')}
                    className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex items-center justify-between group text-left active:scale-[0.99] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-800">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">Monad Protocol Admin</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold uppercase">
                            Admin Verifier
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block">Can approve milestone proof deliverables</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              )}

              {/* Tab 3: Custom Address */}
              {activeTab === 'custom' && (
                <form onSubmit={handleCustomConnect} className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Paste any 0x Monad or EVM wallet address to view dashboard and simulation:
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="0x71C...394A"
                      value={customInput}
                      onChange={(e) => {
                        setCustomInput(e.target.value);
                        setCustomError('');
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                    {customError && <p className="text-[11px] text-rose-600 mt-1.5">{customError}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 font-bold text-slate-950 text-xs transition shadow-sm"
                  >
                    Connect Address
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 text-center text-[11px] text-[#6B7280]">
          Secured by smart contract on <span className="font-semibold text-slate-900">Monad Blockchain</span>. No private keys are ever stored.
        </div>
      </div>
    </div>
  );
}

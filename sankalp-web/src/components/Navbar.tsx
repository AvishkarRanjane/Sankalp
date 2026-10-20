'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { shortenAddress, MONAD_TESTNET } from '@/lib/monad';
import { SankalpRibbonLogo } from '@/components/Doodles';
import {
  Wallet,
  ChevronDown,
  AlertTriangle,
  PlayCircle,
  LayoutDashboard,
  ShieldCheck,
  Compass,
  HelpCircle,
  BookOpen,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

import NavbarCurrencyToggle from '@/components/NavbarCurrencyToggle';

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected, isWrongNetwork, user, role, connect, openConnectModal, disconnect, switchNetwork } = useWallet();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'How It Works', href: '/how-it-works', icon: HelpCircle },
    { label: 'For Creators', href: '/for-creators', icon: Sparkles },
    { label: 'Trust & Safety', href: '/trust-and-safety', icon: ShieldCheck },
    { label: 'Blog', href: '/blog', icon: BookOpen },
  ];

  return (
    <>
      {isWrongNetwork && isConnected && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-900 text-xs sm:text-sm flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2 w-full justify-between px-2 sm:px-4 lg:px-6">
            <span className="flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Sankalp runs on Monad Testnet (Chain ID {MONAD_TESTNET.id}). Please switch network to interact.
            </span>
            <button
              onClick={switchNetwork}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1 rounded text-xs transition"
            >
              Switch to Monad
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB]/80 bg-[#FCFAF6]/90 backdrop-blur-xl transition-colors">
        <div className="w-full flex h-18 items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <SankalpRibbonLogo className="w-11 h-11 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#111827] font-sans-modern">
                  Sankalp
                </span>
                <span className="text-xs text-[#6B7280] font-medium -mt-0.5 hidden sm:block">
                  Crowdfunding platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link-sunset group relative px-4 py-2 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                      isActive
                        ? 'is-active bg-amber-500/10'
                        : 'text-[#4B5563] hover:bg-amber-500/10'
                    }`}
                  >
                    <span
                      className={`nav-text-sunset inline-block transition-all duration-200 ${
                        isActive
                          ? 'font-bold bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent'
                          : 'group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:via-[#EA580C] group-hover:to-[#F59E0B] group-hover:bg-clip-text group-hover:text-transparent'
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive ? (
                      <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C]" />
                    ) : (
                      <span className="absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-center opacity-70" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Global Currency Switcher */}
            <NavbarCurrencyToggle className="hidden sm:inline-flex" />

            <Link
              href="/creator/new"
              className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1F2937] hover:text-[#EA580C] bg-white hover:bg-amber-50/40 border border-slate-300 hover:border-amber-400 px-4.5 py-2 rounded-full shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 text-[#F59E0B] group-hover:text-[#EA580C] group-hover:scale-105 transition-all duration-200" />
              <span className="tracking-tight transition-colors duration-200">
                Start Project
              </span>
            </Link>

            {/* Wallet Button */}
            {!isConnected ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={openConnectModal}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#6366F1] hover:bg-[#4F46E5] px-4.5 py-2 rounded-xl shadow-xs hover:shadow-md hover:shadow-indigo-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-medium text-slate-800 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold">{shortenAddress(address || '')}</span>
                  <span className="capitalize px-1.5 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 font-semibold">
                    {user?.name?.split(' ')[0] || role}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user?.name || 'Connected User'}</p>
                      <p className="text-[11px] font-mono text-slate-500 truncate">{address}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          Monad Testnet
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold capitalize">
                          {role}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
                        Donor Dashboard
                      </Link>
                      <Link
                        href="/creator"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Creator Dashboard
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Admin Panel
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <p className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        Switch Demo Role
                      </p>
                      <div className="grid grid-cols-3 gap-1 px-1">
                        <button
                          onClick={() => connect('demo-backer')}
                          className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition text-center"
                        >
                          Backer
                        </button>
                        <button
                          onClick={() => connect('demo-creator')}
                          className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition text-center"
                        >
                          Creator
                        </button>
                        <button
                          onClick={() => connect('demo-admin')}
                          className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition text-center"
                        >
                          Admin
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-100">
                      <button
                        onClick={disconnect}
                        className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold rounded-lg transition"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`nav-link-sunset group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'is-active bg-amber-500/10'
                      : 'hover:bg-amber-500/10 text-slate-700'
                  }`}
                >
                  <link.icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#EA580C]' : 'text-slate-400 group-hover:text-[#EA580C]'
                    }`}
                  />
                  <span
                    className={`nav-text-sunset transition-all duration-200 ${
                      isActive
                        ? 'font-bold bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent'
                        : 'group-hover:bg-gradient-to-r group-hover:from-[#F59E0B] group-hover:via-[#EA580C] group-hover:to-[#F59E0B] group-hover:bg-clip-text group-hover:text-transparent'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link
              href="/creator/new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-[#EA580C] bg-amber-50/70 hover:bg-amber-100/60 font-semibold transition"
            >
              <PlayCircle className="w-4 h-4 text-[#EA580C]" />
              Start a Project
            </Link>

            {/* Mobile Wallet Button */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {!isConnected ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openConnectModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold shadow-xs transition active:scale-98"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openConnectModal();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono">{shortenAddress(address || '')}</span>
                    <span className="capitalize px-1.5 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700">
                      {role}
                    </span>
                  </div>
                  <span className="text-indigo-600 font-bold">Manage Account →</span>
                </button>
              )}

              {/* Mobile Currency Switcher */}
              <div className="flex items-center justify-between px-1 pt-1">
                <span className="text-xs font-semibold text-slate-500">Website Currency:</span>
                <NavbarCurrencyToggle />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

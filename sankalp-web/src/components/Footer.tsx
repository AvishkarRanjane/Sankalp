'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SankalpRibbonLogo } from '@/components/Doodles';
import CurrencyRatePill from '@/components/CurrencyRatePill';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F7F4EE] text-[#4B5563] text-sm mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <SankalpRibbonLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
              <span className="text-2xl font-black tracking-tight text-[#111827] font-sans-modern">
                Sankalp
              </span>
            </Link>
            <p className="text-sm text-[#4B5563] max-w-sm mb-4 leading-relaxed">
              Decentralized, milestone-based crowdfunding built on the high-performance Monad blockchain.
              Funds are protected by smart contracts and released only when creators prove progress.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <CurrencyRatePill />
            </div>
          </div>

          {/* Column: Discover */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] tracking-wider uppercase mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/explore" className="hover:text-amber-600 transition">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-600 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/category/education-students" className="hover:text-amber-600 transition">
                  Student & Education
                </Link>
              </li>
              <li>
                <Link href="/category/technology-hardware" className="hover:text-amber-600 transition">
                  Tech & Hardware
                </Link>
              </li>
              <li>
                <Link href="/category/community-social" className="hover:text-amber-400 transition">
                  Community Causes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Platform */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] tracking-wider uppercase mb-4 text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/for-creators" className="hover:text-amber-600 transition">
                  For Creators
                </Link>
              </li>
              <li>
                <Link href="/for-donors" className="hover:text-amber-600 transition">
                  For Backers
                </Link>
              </li>
              <li>
                <Link href="/trust-and-safety" className="hover:text-amber-600 transition">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/fees" className="hover:text-amber-600 transition">
                  Fees & Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-600 transition">
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-600 transition">
                  Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Legal */}
          <div>
            <h4 className="text-sm font-bold text-[#111827] tracking-wider uppercase mb-4 text-[11px]">
              Governance & Legal
            </h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/risk-disclosure" className="text-amber-700 hover:text-amber-600 font-semibold transition">
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link href="/prohibited-projects" className="hover:text-amber-600 transition">
                  Prohibited Projects
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-amber-600 transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-600 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-600 transition">
                  Privacy Policy (DPDP)
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-amber-600 transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-600 transition">
                  About Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 transition">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 font-medium">
          <p>
            © 2026 Sankalp Protocol. Built on Monad. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://testnet.monadexplorer.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#111827] transition"
            >
              Monad Explorer <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#111827] transition"
            >
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#111827] transition"
            >
              X (Twitter) <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

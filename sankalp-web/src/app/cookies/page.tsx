import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Cookie Policy | Sankalp',
  description: 'Cookie policy and local storage usage on Sankalp.',
  canonical: '/cookies',
});

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#4B5563]">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
          Storage & Privacy
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Cookie Policy
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          How Sankalp uses local browser storage strictly for application operations.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">1. How We Use Storage</h2>
          <p className="text-[#4B5563]">
            Sankalp uses essential browser local storage strictly for wallet session continuity, active
            theme preferences, and caching public contract reads for fast user experience. We do not use
            third-party invasive tracking cookies or commercial ad network pixels.
          </p>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2.5">
          <h2 className="text-base font-bold text-[#111827]">2. Managing Preferences</h2>
          <p className="text-[#4B5563]">
            You can clear local storage and browser cookies at any time via your browser settings.
          </p>
        </section>
      </div>
    </div>
  );
}

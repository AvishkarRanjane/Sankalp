import React from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { XCircle } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Prohibited Projects | Sankalp',
  description: 'List of disallowed campaigns and prohibited fundraising activities on Sankalp.',
  canonical: '/prohibited-projects',
});

export default function ProhibitedProjectsPage() {
  const disallowed = [
    {
      title: '1. Securities, Financial Returns, and Equity Offers',
      desc: 'Campaigns offering shares, profit sharing, dividends, interest yields, ICOs, or financial returns. Prohibited by SEBI.',
    },
    {
      title: '2. Personal Medical Fundraising',
      desc: 'Individual medical bills or surgical treatments for personal family members. (Community wellness clinics or school labs are permitted).',
    },
    {
      title: '3. Weapons, Munitions, and Hazardous Materials',
      desc: 'Firearms, ammunition, explosive devices, chemical weapons, or toxic materials.',
    },
    {
      title: '4. Gambling, Lotteries, and Betting Schemes',
      desc: 'Games of chance, raffles, sweepstakes, betting pools, or casino software.',
    },
    {
      title: '5. Adult Content and Explicit Media',
      desc: 'Pornographic material, sexually explicit services, or age-restricted adult products.',
    },
    {
      title: '6. Hate Speech, Defamation, and Harassment',
      desc: 'Campaigns targeting individuals or marginalized groups with discriminatory or unlawful conduct.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-[#4B5563]">
      <div className="mb-8">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block mb-2">
          Safety & Compliance
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Prohibited Projects Policy
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          To maintain trust and ensure compliance with Indian law, Sankalp maintains strict standards
          on prohibited activities. Projects violating these guidelines are immediately rejected.
        </p>
      </div>

      <div className="space-y-4">
        {disallowed.map((item, idx) => (
          <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
            <h2 className="text-base font-bold text-rose-600 flex items-center gap-2">
              <XCircle className="w-5 h-5 shrink-0" />
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed pl-7">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

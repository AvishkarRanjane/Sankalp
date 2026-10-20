import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import { HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'FAQ: Crowdfunding on Sankalp Answered | Sankalp',
  description:
    'Answers to common questions about contributions, refunds, wallets, fees, milestones and how to start a project on Sankalp.',
  canonical: '/faq',
});

export default function FAQPage() {
  const backerFaqs = [
    {
      question: 'Is my money safe?',
      answer:
        'Your contribution is held by a smart contract on the Monad blockchain and released to the creator only after milestones are approved. No system is 100% risk-free; see our Risk Disclosure for full transparency.',
    },
    {
      question: 'What happens if a project doesn’t reach its goal?',
      answer:
        'The campaign fails and every backer can claim a full 100% refund directly from the smart contract.',
    },
    {
      question: 'What happens if a creator doesn’t deliver a milestone?',
      answer:
        'Funds for that milestone stay locked. Our team reviews the case, and backers can be refunded the unreleased balance if the project is cancelled.',
    },
    {
      question: 'Do I need to understand crypto to contribute?',
      answer:
        'You only need a browser wallet and USDC. Our simple 4-step backer guide walks you through it in about 10 minutes.',
    },
    {
      question: 'Which wallets work with Sankalp?',
      answer:
        'MetaMask, Rabby, Coinbase Wallet, and all WalletConnect-compatible Web3 wallets. We test thoroughly on desktop and mobile.',
    },
    {
      question: 'Why do I need MON as well as USDC?',
      answer:
        'USDC is the stable token used for funding the project. A fraction of a cent of MON pays the Monad network gas fee to record your transaction on-chain.',
    },
    {
      question: 'Can I contribute in rupees directly?',
      answer:
        'Not directly through a bank account yet. You can easily purchase USDC through supported Indian on-ramps and transfer it to your wallet.',
    },
    {
      question: 'Can I get a refund after the campaign is funded?',
      answer:
        'Contributions to a successful campaign are held for the project. Unreleased funds are refunded only if the project is cancelled due to breach of milestones.',
    },
    {
      question: 'Are contributions tax-deductible?',
      answer:
        'Not generally. Tax treatment depends on your personal situation and local jurisdiction, so please consult a qualified tax adviser.',
    },
  ];

  const creatorFaqs = [
    {
      question: 'How much does it cost to start a project?',
      answer:
        'Nothing upfront. We charge a flat 3% fee only on successfully funded campaigns that reach 100% of their goal.',
    },
    {
      question: 'How are funds released to me as a creator?',
      answer:
        'You submit proof for each milestone (receipts, photos, videos, code). After review approval, that portion becomes withdrawable directly from the contract.',
    },
    {
      question: 'Can I change my goal or deadline after launch?',
      answer:
        'No. Smart contract rules are fixed at launch to protect backer trust. You can post updates and, in exceptional circumstances, request cancellation.',
    },
    {
      question: 'Who can start a project on Sankalp?',
      answer:
        'Anyone aged 18 or older who passes identity verification and whose project adheres to our community rules.',
    },
    {
      question: 'What projects are not allowed?',
      answer:
        'Illegal items, weapons, gambling, adult content, investment or equity offers, and individual personal medical treatments.',
    },
    {
      question: 'How long does project review take?',
      answer:
        'Typically 2 to 5 working days for our moderation team to evaluate budget realism and milestone verification criteria.',
    },
  ];

  const allFaqs = [...backerFaqs, ...creatorFaqs];
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ]);
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-6">
          Frequently asked questions
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
          Answers to common questions about contributions, refunds, wallets, fees, milestones and
          how to start a project on Sankalp.
        </p>
      </div>

      {/* Backer Questions Section */}
      <div className="max-w-4xl mb-16">
        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#E5E7EB]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Section 1</span>
          <h2 className="text-2xl font-bold text-[#111827] font-editorial">Questions from Backers</h2>
        </div>
        <div className="space-y-4">
          {backerFaqs.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
              <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                {i + 1}. {f.question}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed pl-7">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Questions Section */}
      <div className="max-w-4xl mb-16">
        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-[#E5E7EB]">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Section 2</span>
          <h2 className="text-2xl font-bold text-[#111827] font-editorial">Questions from Creators</h2>
        </div>
        <div className="space-y-4">
          {creatorFaqs.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
              <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#6366F1] shrink-0" />
                {i + 10}. {f.question}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed pl-7">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Need more help */}
      <div className="max-w-4xl p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#111827] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amber-500" />
            Have a question not listed here?
          </h3>
          <p className="text-xs text-[#4B5563]">Our support team responds within one working day.</p>
        </div>
        <Link
          href="/contact"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#111827] hover:bg-[#1F2937] transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

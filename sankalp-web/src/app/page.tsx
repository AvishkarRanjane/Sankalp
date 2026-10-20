import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  getStats,
  getCategories,
  getFeaturedProjects,
  getTestimonials,
  getFAQs,
  getProjects,
} from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import AnimatedHeroHeadline from '@/components/AnimatedHeroHeadline';
import DecryptText from '@/components/animations/DecryptText';
import BlurSlideHeading from '@/components/animations/BlurSlideHeading';
import FlowingGradientHeading from '@/components/animations/FlowingGradientHeading';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';
import { constructMetadata, generateFAQSchema } from '@/lib/seo';
import {
  VineDoodleLeft,
  VineDoodleRight,
  BurstTicks,
  SketchyButtonLoop,
  HandDrawnRupeeCircle,
  StatDoodlesLeft,
  StatDoodlesRight,
  ZigzagDoodle,
  SwoopDoodle,
  CurlyLoopDoodle,
} from '@/components/Doodles';
import {
  RotateCcw,
  Eye,
  Coins,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import CurrencyAmount from '@/components/CurrencyAmount';

export const metadata: Metadata = constructMetadata({
  title: 'Sankalp - Crowdfunding platform',
  description:
    'Sankalp is India’s milestone-based crowdfunding platform built on the Monad blockchain. Back grassroots student innovations, social ventures, and creative projects with 100% smart-contract escrow protection.',
  keywords: [
    'milestone crowdfunding',
    'blockchain escrow India',
    'Monad testnet crowdfunding',
    'smart contract donation protection',
    'grassroots student innovations',
    'community fundraisers Maharashtra',
    'transparent funding protocol',
    'refund guarantee crowdfunding',
  ],
  canonical: '/',
});

export default function HomePage() {
  const stats = getStats();
  const categories = getCategories();
  const featuredProjects = getFeaturedProjects();
  const testimonials = getTestimonials();
  const faqTeaser = getFAQs('backers').slice(0, 3);
  const allProjects = getProjects();

  const faqSchema = generateFAQSchema(faqTeaser);

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFAF6] text-[#1F2937]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-16 lg:pb-24">
        {/* Creative Moving Background Lines & Floating Elements */}
        <SectionCreativeLines variant="amber-orange" showIcons={true} />

        {/* Soft Warm Ambient Radial Glows */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-orange-100/25 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-10 right-1/4 translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-bl from-purple-200/35 via-indigo-100/25 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />

        {/* Hand-Drawn Floral & Floating Doodles in Margins with Gentle Ambient Floating Motion */}
        <VineDoodleLeft className="absolute top-4 left-0 sm:left-4 w-32 sm:w-44 h-auto pointer-events-none -z-10 hidden lg:block opacity-90 animate-float-slow" />
        <VineDoodleRight className="absolute top-4 right-0 sm:right-4 w-32 sm:w-44 h-auto pointer-events-none -z-10 hidden lg:block opacity-90 animate-float-delayed" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 text-center relative z-10 pt-2 lg:pt-4">
          {/* Animated Hero Headline: typewriter effect for 'Crowdfunding that' + 3D roll for 'keeps its promises' */}
          <AnimatedHeroHeadline />

          {/* Subtitle / Copy */}
          <p className="mt-7 text-lg sm:text-xl lg:text-[21px] text-[#4B5563] max-w-3xl mx-auto leading-relaxed font-normal">
            Back projects you believe in. Your contribution is held by a smart contract on the Monad
            blockchain and released to the creator only as they reach agreed milestones. If a project
            falls short, you can claim your refund.
          </p>

          {/* CTAs with Hand-Drawn Sketchy Loop */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-btn-amber transition-all active:scale-95"
            >
              <Compass className="w-5 h-5" />
              Explore projects
            </Link>

            <div className="relative w-full sm:w-auto inline-block">
              <Link
                href="/creator/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-[#111827] bg-white hover:bg-slate-50 border border-[#DDD6FE] shadow-xs transition-all active:scale-95 relative z-10"
              >
                <Sparkles className="w-5 h-5 text-[#6366F1]" />
                Start a project
              </Link>
              {/* Playful hand-drawn purple double circle strictly in the back of the button */}
              <SketchyButtonLoop className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none -z-10" />
            </div>
          </div>

          {/* Trust Strip with Playful Micro-Doodles */}
          <div className="mt-14 pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm sm:text-base font-semibold text-[#1F2937]">
            <span className="relative flex items-center gap-2 py-1">
              <ZigzagDoodle className="absolute -top-4 -left-1 hidden sm:block -z-10 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                Funds held by smart contract
              </span>
            </span>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <span className="relative flex items-center gap-2 py-1">
              <SwoopDoodle className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 hidden sm:block -z-10 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Milestone-based release
              </span>
            </span>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <span className="flex items-center gap-2 py-1">
              <RotateCcw className="w-5 h-5 text-indigo-500 shrink-0" />
              Refunds if the goal isn&apos;t met
            </span>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <span className="relative flex items-center gap-2 py-1">
              <svg
                className="absolute -bottom-1 left-2 w-full h-2 pointer-events-none -z-10"
                viewBox="0 0 100 6"
                fill="none"
              >
                <path d="M0 4 Q 50 1, 100 4" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <BurstTicks className="absolute -top-3 -right-3 w-5 h-5 -z-10 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600 shrink-0" />
                Every transaction publicly verifiable
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Stats Strip with Atmospheric Colored Glows & Margin Doodles */}
      <section className="py-8 relative">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative">
          {/* Doodles below stats - behind cards */}
          <StatDoodlesLeft className="absolute -bottom-7 -left-1 w-32 h-20 pointer-events-none hidden sm:block -z-10" />
          <StatDoodlesRight className="absolute -bottom-7 -right-1 w-32 h-20 pointer-events-none hidden sm:block -z-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
            {/* Card 1: Projects funded (Amber Glow) */}
            <div className="p-7 rounded-[28px] bg-gradient-to-b from-white to-[#FFFDF9] border border-[#FDE68A]/80 shadow-amber-glow transition-all duration-300 hover:-translate-y-1 relative z-10">
              <div className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111827] tabular-nums font-sans-modern leading-tight">
                {stats.projectsFunded}
              </div>
              <div className="text-sm sm:text-base font-semibold text-[#64748B] mt-2">Projects funded</div>
            </div>

            {/* Card 2: Raised by community (Amber Glow) */}
            <div className="p-7 rounded-[28px] bg-gradient-to-b from-white to-[#FFFDF9] border border-[#FDE68A]/80 shadow-amber-glow transition-all duration-300 hover:-translate-y-1 relative z-10">
              <div className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111827] tabular-nums font-sans-modern leading-tight">
                <CurrencyAmount amount={stats.totalRaisedUSDC} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-[#64748B] mt-2">Raised by the community</div>
            </div>

            {/* Card 3: Backers (Indigo Glow) */}
            <div className="p-7 rounded-[28px] bg-gradient-to-b from-white to-[#FFFDF9] border border-[#DDD6FE]/80 shadow-purple-glow transition-all duration-300 hover:-translate-y-1 relative z-10">
              <div className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111827] tabular-nums font-sans-modern leading-tight">
                {stats.backers.toLocaleString()}
              </div>
              <div className="text-sm sm:text-base font-semibold text-[#64748B] mt-2">Backers</div>
            </div>

            {/* Card 4: Milestones on time (Violet Glow) */}
            <div className="p-7 rounded-[28px] bg-gradient-to-b from-white to-[#FFFDF9] border border-[#DDD6FE]/80 shadow-violet-glow transition-all duration-300 hover:-translate-y-1 relative z-10">
              <div className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111827] tabular-nums font-sans-modern leading-tight">
                {stats.milestonesOnTimePercent}%
              </div>
              <div className="text-sm sm:text-base font-semibold text-[#64748B] mt-2">Milestones delivered on time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works (The Sankalp Escrow Model with Doodle Rupee) */}
      <section className="py-20 lg:py-28 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <CurlyLoopDoodle className="w-6 h-6 text-[#F59E0B] shrink-0" />
            <h2 className="text-sm font-extrabold text-[#D97706] uppercase tracking-widest">
              The Sankalp Escrow Model
            </h2>
          </div>
          <DecryptText
            as="h3"
            targetText={'How blockchain protects\nevery'}
            badgeNode={<HandDrawnRupeeCircle>rupee</HandDrawnRupeeCircle>}
            totalDurationMs={3500}
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight whitespace-pre-line"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center font-extrabold text-xl mb-6 shadow-xs">
              1
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 font-sans-modern">Find a project</h4>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Browse student ideas, community causes, hardware, art and small businesses. Read the story,
              the milestones, and the risks before committing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center justify-center font-extrabold text-xl mb-6 shadow-xs">
              2
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 font-sans-modern">Contribute from your wallet</h4>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Connect a wallet and contribute in USDC. Your money goes into the project&apos;s smart contract,
              never directly into the creator&apos;s personal bank account.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-extrabold text-xl mb-6 shadow-xs">
              3
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#111827] mb-3 font-sans-modern">Watch it get built</h4>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Creators unlock funds only by submitting verifiable proof for each milestone. You see every
              update and every release on the Monad block explorer.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#6366F1] hover:text-[#4F46E5] transition"
          >
            Read the complete guide to how Sankalp works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white/70 border-y border-[#E5E7EB]">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-widest mb-2.5">
                Curated Campaigns
              </h2>
              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827]">
                Featured projects worth backing
              </h3>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#D97706] hover:text-[#B45309] transition"
            >
              View all {allProjects.length} projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-widest mb-2.5">
            Discover What Inspires You
          </h2>
          <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827]">
            Explore 8 impact categories
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const count = allProjects.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-amber-400 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-amber-600 transition mb-1.5 font-sans-modern">
                    {cat.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] line-clamp-2 leading-relaxed">{cat.description}</p>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs sm:text-sm text-[#6B7280] font-semibold">
                  <span>{count} {count === 1 ? 'project' : 'projects'}</span>
                  <span className="text-[#D97706] group-hover:translate-x-1.5 transition-transform font-bold">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Sankalp (4 Blocks) */}
      <section className="relative overflow-hidden py-20 bg-white/60 border-t border-[#E5E7EB]">
        {/* Creative Saffron-Violet Flowing Ambient Lines */}
        <SectionCreativeLines variant="saffron-violet" showIcons={true} />
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-widest mb-2.5">
              Why Sankalp
            </h2>
            <BlurSlideHeading
              as="h3"
              primaryText="Built on transparency,"
              accentText="not blind trust"
              cursorReveal={true}
              className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight"
              accentClassName="bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-2 font-sans-modern">Milestone protection</h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Creators receive funds in stages as tangible work is submitted and verified, preventing
                premature cash drains.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mb-5">
                <RotateCcw className="w-6 h-6 text-rose-600" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-2 font-sans-modern">Refunds built in</h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                If a campaign misses its funding goal by the deadline, contributors can reclaim 100% of their
                funds directly from the contract.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-2 font-sans-modern">Transparent by default</h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Anyone can inspect campaign balances, milestone disbursements, and backer logs on a public
                Monad block explorer.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                <Coins className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-2 font-sans-modern">Low, simple fees</h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                A flat 3% platform fee applies only to successfully funded campaigns. Zero upfront fees, zero
                hidden transaction taxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827]">
            Voices from early creators & backers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs">
              <p className="text-base sm:text-lg text-[#374151] italic mb-5 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[#111827] text-base">{t.name}</span>
                <span className="text-slate-500 font-medium">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-white/70 border-y border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center mb-12">
            <h2 className="text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-widest mb-2.5">
              Common Questions
            </h2>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827]">
              Frequently asked questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqTeaser.map((item) => (
              <div key={item.id} className="p-7 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs">
                <h4 className="text-base sm:text-lg font-bold text-[#111827] mb-2.5 flex items-center gap-2.5 font-sans-modern">
                  <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  {item.question}
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pl-7">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#D97706] hover:text-[#B45309] transition"
            >
              See all answers in our FAQ center <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-amber-200/50 via-indigo-100/40 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <FlowingGradientHeading
            as="h2"
            prefixText="Have an idea that"
            gradientText="deserves a community?"
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight mb-5"
          />
          <p className="text-base sm:text-lg lg:text-xl text-[#4B5563] mb-9 max-w-2xl mx-auto leading-relaxed">
            Create your campaign in minutes with milestone protection, low 3% platform fees, and
            transparent smart-contract escrow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/creator/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-slate-950 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#EA580C] shadow-btn-amber transition active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              Start a project in minutes
            </Link>
            <Link
              href="/for-creators"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-xs"
            >
              Read creator guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

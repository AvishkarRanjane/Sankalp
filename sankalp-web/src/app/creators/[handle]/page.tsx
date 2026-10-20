import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  seedCreators,
  getCreatorByHandle,
  getCreatorProjects,
  getMilestonesForProject,
} from '@/lib/data';
import { constructMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import ProjectCard from '@/components/ProjectCard';
import CurrencyAmount from '@/components/CurrencyAmount';
import { formatUSDC, shortenAddress, getExplorerAddressUrl } from '@/lib/monad';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Calendar,
} from 'lucide-react';

interface CreatorPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return seedCreators.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { handle } = await params;
  const creator = getCreatorByHandle(handle);

  if (!creator) {
    return constructMetadata({ title: 'Creator Not Found' });
  }

  const projects = getCreatorProjects(creator.id);
  const totalRaised = projects.reduce((acc, p) => acc + p.raisedUSDC, 0);

  return constructMetadata({
    title: `${creator.displayName}: Creator Profile`,
    description: `${creator.displayName} has launched ${projects.length} projects on Sankalp and raised ${formatUSDC(totalRaised)}. See their work, milestones delivered and updates.`,
    canonical: `/creators/${handle}`,
  });
}

export default async function CreatorProfilePage({ params }: CreatorPageProps) {
  const { handle } = await params;
  const creator = getCreatorByHandle(handle);

  if (!creator) {
    notFound();
  }

  const projects = getCreatorProjects(creator.id);
  const totalRaised = projects.reduce((acc, p) => acc + p.raisedUSDC, 0);

  // Calculate milestones stats across projects
  let totalMilestones = 0;
  let deliveredMilestones = 0;
  projects.forEach((p) => {
    const ms = getMilestonesForProject(p.id);
    totalMilestones += ms.length;
    deliveredMilestones += ms.filter((m) => m.status === 'released').length;
  });

  const deliveryRate = totalMilestones > 0 ? Math.round((deliveredMilestones / totalMilestones) * 100) : 100;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Creators', url: '/explore' },
    { name: creator.displayName, url: `/creators/${handle}` },
  ]);

  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: creator.displayName,
      description: creator.bio,
      address: {
        '@type': 'PostalAddress',
        addressLocality: creator.city,
        addressCountry: 'IN',
      },
      url: `https://sankalp.fund/creators/${handle}`,
    },
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      {/* Creator Profile Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs mb-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-slate-950 text-2xl font-black shadow-md shrink-0">
              {creator.displayName.charAt(0)}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#111827]">
                  {creator.displayName}
                </h1>
                {creator.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Creator
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Sample
                </span>
              </div>

              <p className="text-sm text-[#4B5563] max-w-xl leading-relaxed">{creator.bio}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {creator.city}, India
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  Joined {creator.joined}
                </span>
                <a
                  href={getExplorerAddressUrl(creator.walletAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-indigo-600 hover:underline flex items-center gap-1"
                >
                  {shortenAddress(creator.walletAddress)} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#E5E7EB] text-center">
          <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB]">
            <div className="text-xl sm:text-2xl font-black text-[#111827]">{projects.length}</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Campaigns launched</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB]">
            <div className="text-xl sm:text-2xl font-black text-[#D97706]">
              <CurrencyAmount amount={totalRaised} />
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Total funds raised</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB]">
            <div className="text-xl sm:text-2xl font-black text-emerald-700">
              {deliveredMilestones} of {totalMilestones}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Milestones delivered</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#FCFAF6] border border-[#E5E7EB]">
            <div className="text-xl sm:text-2xl font-black text-indigo-600">{deliveryRate}%</div>
            <div className="text-xs text-slate-500 font-medium mt-0.5">Delivery rate</div>
          </div>
        </div>
      </div>

      {/* Trust Panel */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs mb-12">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Trust and Verification Panel
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Identity verified via provider</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Wallet connected and bound</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>0 open reports or disputes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Milestone delivery rate: <strong>{deliveryRate}%</strong></span>
          </div>
        </div>
      </div>

      {/* Creator's Campaigns */}
      <div>
        <h2 className="font-editorial text-2xl font-bold text-[#111827] mb-6">
          Campaigns by {creator.displayName} ({projects.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

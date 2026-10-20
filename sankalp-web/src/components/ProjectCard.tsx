'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { Users, Clock, CheckCircle2 } from 'lucide-react';
import { getCreatorById, getMilestonesForProject, getCategoryBySlug } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { formatAmount, formatSecondary } = useCurrency();
  const creator = getCreatorById(project.creatorId);
  const category = getCategoryBySlug(project.categorySlug);
  const milestones = getMilestonesForProject(project.id);
  const completedMilestones = milestones.filter((m) => m.status === 'released').length;

  const percent = Math.min(project.percentFunded, 100);

  // Status badge styling
  const statusBadge = () => {
    switch (project.status) {
      case 'funded':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-300 backdrop-blur-md">
            Funded
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100/90 text-indigo-800 border border-indigo-300 backdrop-blur-md">
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100/90 text-rose-800 border border-rose-300 backdrop-blur-md">
            Refundable
          </span>
        );
      case 'live':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100/90 text-amber-900 border border-amber-300 backdrop-blur-md">
            Live
          </span>
        );
    }
  };

  return (
    <div className="group rounded-3xl bg-white border border-[#E5E7EB] hover:border-amber-400/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
      {/* Cover Image & Category Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${project.coverImage || '/demo/default-project.jpg'})`,
          }}
        >
          {/* Subtle bottom shadow overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 backdrop-blur-md text-slate-800 shadow-xs border border-white/60">
            {category?.name || project.categorySlug}
          </span>
          {statusBadge()}
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50/90 text-amber-800 border border-amber-200 backdrop-blur-md">
            Sample
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col bg-white">
        {/* Creator byline */}
        <div className="flex items-center justify-between text-xs sm:text-[13px] text-slate-500 mb-2.5">
          <Link
            href={`/creators/${creator?.handle || 'creator'}`}
            className="hover:text-amber-600 transition font-medium flex items-center gap-1.5"
          >
            By {creator?.displayName || 'Verified Creator'}
            {creator?.verified && (
              <span className="text-emerald-600 text-xs font-bold" title="Identity Verified">
                ✓
              </span>
            )}
          </Link>
          <span className="text-xs text-slate-400">{creator?.city}</span>
        </div>

        {/* Title */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-[#111827] group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2.5 font-sans-modern">
            {project.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-sm text-[#4B5563] line-clamp-2 mb-5 leading-relaxed flex-1">
          {project.summary}
        </p>

        {/* Funding Progress Bar */}
        <div className="space-y-2 mb-5">
          <div className="flex items-baseline justify-between text-xs sm:text-sm">
            <span className="font-extrabold text-[#111827] text-base">
              {formatAmount(project.raisedUSDC)}
              <span className="text-xs font-normal text-slate-500 ml-1.5">
                ({formatSecondary(project.raisedUSDC)})
              </span>
            </span>
            <span className="text-slate-500 font-medium text-xs">
              {project.percentFunded}% of {formatAmount(project.goalUSDC)}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#10B981] transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Card Footer Meta */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-[13px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            <span>{project.backersCount} backers</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>
              {completedMilestones} of {milestones.length || 3} milestones
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.daysLeft > 0 ? `${project.daysLeft}d left` : 'Ended'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

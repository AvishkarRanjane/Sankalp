'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Project, Category } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import CatalogRevealHeading from '@/components/animations/CatalogRevealHeading';
import SectionCreativeLines from '@/components/background/SectionCreativeLines';
import { Search, ArrowUpDown, SlidersHorizontal, PlusCircle } from 'lucide-react';

interface ExploreClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export default function ExploreClient({
  initialProjects,
  categories,
}: ExploreClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  // Filter and sort logic
  const filteredProjects = useMemo(() => {
    let list = [...initialProjects];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'ending-soon') {
        list = list.filter((p) => p.status === 'live' && p.daysLeft <= 14);
      } else {
        list = list.filter((p) => p.status === selectedStatus);
      }
    }

    // Filter by search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          (p.creatorId && p.creatorId.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'trending') {
      list.sort((a, b) => b.backersCount - a.backersCount);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else if (sortBy === 'ending-soon') {
      list.sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === 'most-funded') {
      list.sort((a, b) => b.raisedUSDC - a.raisedUSDC);
    }

    return list;
  }, [initialProjects, selectedCategory, selectedStatus, search, sortBy]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 lg:py-16 relative overflow-hidden">
      {/* Creative Flowing Background Lines & Floating Icons */}
      <SectionCreativeLines variant="amber-orange" showIcons={true} />

      {/* Header & Intro */}
      <div className="max-w-3xl mb-10 relative z-10">
        <CatalogRevealHeading
          as="h1"
          leadText="Explore projects"
          focusText="worth backing"
          className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.18] sm:leading-[1.2] mb-4"
        />
        <p className="text-sm text-[#4B5563] leading-relaxed">
          Every project here is reviewed before it goes live, and every contribution is held in a
          smart contract until the creator completes the agreed milestones. Browse by category, see
          how much has been raised, how many milestones are done, and how many days remain. Found
          something you like? Connect a wallet and back it in under a minute.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="p-5 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs space-y-4 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, creators, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Sort Dropdown & Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="trending">Sort: Trending</option>
                <option value="newest">Sort: Newest</option>
                <option value="ending-soon">Sort: Ending soon</option>
                <option value="most-funded">Sort: Most funded</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'live', label: 'Live' },
                { id: 'funded', label: 'Funded' },
                { id: 'ending-soon', label: 'Ending soon' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStatus(s.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    selectedStatus === s.id
                      ? 'bg-white text-[#111827] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-semibold ${
              selectedCategory === 'all'
                ? 'bg-[#111827] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-semibold ${
                selectedCategory === c.slug
                  ? 'bg-[#FDF6ED] text-[#B45309] border border-[#FDE68A]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-medium">
        <span>
          Showing <strong className="text-slate-900">{filteredProjects.length}</strong> projects
        </span>
        {(search || selectedCategory !== 'all' || selectedStatus !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedStatus('all');
            }}
            className="text-amber-600 hover:underline font-bold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs max-w-lg mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-2 font-sans-modern">
            No projects match these filters yet
          </h3>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Try adjusting your search query, selecting another category, or start the very first
            project in this area!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Clear filters
            </button>
            <Link
              href="/creator/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Start a project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

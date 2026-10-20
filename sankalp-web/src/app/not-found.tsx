'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#D97706] border border-amber-200 flex items-center justify-center mx-auto mb-6 shadow-xs">
        <span className="text-2xl font-black">404</span>
      </div>

      <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-3">
        We couldn’t find that page
      </h1>

      <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto mb-8 leading-relaxed">
        The link may be broken or the project may have ended. Try searching for campaigns or return
        to the home directory.
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, categories, or creators..."
          className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 shadow-xs"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition shadow-xs"
        >
          Search
        </button>
      </form>

      <div className="flex items-center gap-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition shadow-xs"
        >
          <Compass className="w-3.5 h-3.5" />
          Explore projects
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-slate-700 font-semibold text-xs hover:bg-slate-50 transition shadow-xs"
        >
          <Home className="w-3.5 h-3.5" />
          Go home
        </Link>
      </div>
    </div>
  );
}

'use client';

import React from 'react';

interface SectionCreativeLinesProps {
  variant?: 'amber-orange' | 'violet-monad' | 'emerald-teal' | 'saffron-violet';
  className?: string;
  showIcons?: boolean;
}

/**
 * SectionCreativeLines
 * Renders localized, highly-stylized flowing colorful wave lines and floating animated icons
 * behind section headers and banners.
 */
export default function SectionCreativeLines({
  variant = 'amber-orange',
  className = '',
  showIcons = true,
}: SectionCreativeLinesProps) {
  // Gradient definitions per variant
  const getGradientColors = () => {
    switch (variant) {
      case 'violet-monad':
        return {
          start: '#6366F1',
          mid: '#7C3AED',
          end: '#A855F7',
          accent: '#EC4899',
          glow: 'from-purple-200/40 via-indigo-100/25 to-transparent',
        };
      case 'emerald-teal':
        return {
          start: '#10B981',
          mid: '#059669',
          end: '#06B6D4',
          accent: '#F59E0B',
          glow: 'from-emerald-200/40 via-teal-100/25 to-transparent',
        };
      case 'saffron-violet':
        return {
          start: '#F59E0B',
          mid: '#EA580C',
          end: '#7C3AED',
          accent: '#6366F1',
          glow: 'from-amber-200/35 via-purple-100/25 to-transparent',
        };
      case 'amber-orange':
      default:
        return {
          start: '#F59E0B',
          mid: '#EA580C',
          end: '#FBBF24',
          accent: '#6366F1',
          glow: 'from-amber-200/45 via-orange-100/30 to-transparent',
        };
    }
  };

  const colors = getGradientColors();
  const gradId = `secGrad-${variant}`;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none ${className}`}
    >
      {/* Soft Ambient Radial Backdrop Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] rounded-full bg-gradient-to-r ${colors.glow} blur-[120px] animate-pulse-glow`}
      />

      {/* Flowing SVG Curved Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} stopOpacity="0.55" />
            <stop offset="50%" stopColor={colors.mid} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colors.end} stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id={`${gradId}-accent`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.start} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Primary Flowing Wave Ribbon (Swaying gently) */}
        <g className="animate-wave-sway">
          {/* Subtle glow blur line */}
          <path
            d="M-40,160 C260,40 500,280 820,140 C1060,50 1180,210 1280,150"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.35"
          />
          {/* Main crisp stroke */}
          <path
            d="M-40,160 C260,40 500,280 820,140 C1060,50 1180,210 1280,150"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        {/* Secondary Counter-Swaying Wave Ribbon */}
        <g className="animate-wave-sway-reverse">
          <path
            d="M-60,260 C220,340 560,120 900,280 C1080,360 1160,200 1260,250"
            fill="none"
            stroke={`url(#${gradId}-accent)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Crawling Dashed Accent Stroke */}
        <path
          d="M-20,210 C320,120 620,320 960,190 C1120,130 1190,260 1240,220"
          fill="none"
          stroke={colors.start}
          strokeWidth="1.5"
          strokeDasharray="6 12"
          strokeOpacity="0.35"
          className="animate-dash-flow"
        />

        {/* Geometric constellation dots with connector */}
        <g opacity="0.4">
          <line x1="180" y1="130" x2="250" y2="180" stroke={colors.start} strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="180" cy="130" r="3" fill={colors.start} />
          <circle cx="250" cy="180" r="2" fill={colors.mid} />

          <line x1="980" y1="220" x2="1050" y2="170" stroke={colors.accent} strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="980" cy="220" r="2.5" fill={colors.accent} />
          <circle cx="1050" cy="170" r="3" fill={colors.end} />
        </g>
      </svg>

      {/* Floating Section Micro-Icons (Borderless, sunk into background) */}
      {showIcons && (
        <>
          {/* Left Floating Accent: Sparkle Starburst (Sunken into background) */}
          <div className="absolute top-10 left-6 sm:left-14 animate-float-slow pointer-events-none">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
              <svg className="w-5 h-5 text-amber-500/55 animate-spin-very-slow drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 C12 7.5 7.5 12 2 12 C7.5 12 12 16.5 12 22 C12 16.5 16.5 12 22 12 C16.5 12 12 7.5 12 2 Z" />
              </svg>
            </div>
          </div>

          {/* Right Floating Accent: Monad / Milestone Token (Sunken into background) */}
          <div className="absolute top-14 right-8 sm:right-16 animate-float-delayed pointer-events-none">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-sm pointer-events-none" />
              <span className="font-editorial text-lg font-bold text-purple-600/55 select-none drop-shadow-[0_2px_8px_rgba(124,58,237,0.2)]">✦</span>
            </div>
          </div>

          {/* Bottom Floating Dots */}
          <div className="absolute bottom-8 left-1/4 w-2 h-2 rounded-full bg-amber-400/35 blur-[0.5px] animate-float-reverse" />
          <div className="absolute bottom-12 right-1/4 w-2 h-2 rounded-full bg-purple-400/30 blur-[0.5px] animate-float-slow" />
        </>
      )}
    </div>
  );
}

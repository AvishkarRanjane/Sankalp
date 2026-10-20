'use client';

import React from 'react';

/**
 * AmbientCreativeBackground
 * Renders global ambient background with colorful flowing lines, subtle moving waves,
 * glowing bokeh orbs, and playful floating Web3/crowdfunding icons that gently drift,
 * rotate, and pulse smoothly across all pages.
 */
export default function AmbientCreativeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* 1. Luminous Atmospheric Radial Glow Blooms (Breathing gently) */}
      <div className="absolute -top-32 left-[10%] w-[580px] h-[480px] rounded-full bg-gradient-to-tr from-amber-200/35 via-orange-100/20 to-transparent blur-[130px] animate-pulse-glow" />
      <div className="absolute top-[20%] right-[-5%] w-[620px] h-[520px] rounded-full bg-gradient-to-bl from-purple-200/30 via-indigo-100/20 to-transparent blur-[140px] animate-pulse-glow [animation-delay:2s]" />
      <div className="absolute top-[55%] left-[-8%] w-[540px] h-[460px] rounded-full bg-gradient-to-tr from-emerald-100/30 via-teal-100/15 to-transparent blur-[120px] animate-pulse-glow [animation-delay:4s]" />
      <div className="absolute bottom-[-10%] right-[15%] w-[650px] h-[500px] rounded-full bg-gradient-to-tl from-amber-100/30 via-rose-100/20 to-transparent blur-[130px] animate-pulse-glow [animation-delay:3s]" />

      {/* 2. Flowing Colourful Ambient Waves & Dynamic Contour Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-65"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          {/* Gradients for vibrant flowing strokes */}
          <linearGradient id="amberSunsetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#EA580C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="monadVioletGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="emeraldTealGrad" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="coralRoseGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FB923C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
          </linearGradient>

          {/* Soft stroke glow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Curved Ribbon 1: Upper Sunset Wave (Swaving smoothly) */}
        <g className="animate-wave-sway">
          {/* Subtle soft glow underlay */}
          <path
            d="M-80,180 C280,60 520,320 880,190 C1200,80 1380,240 1560,160"
            fill="none"
            stroke="url(#amberSunsetGrad)"
            strokeWidth="5"
            filter="url(#softGlow)"
            opacity="0.3"
          />
          {/* Crisp core stroke */}
          <path
            d="M-80,180 C280,60 520,320 880,190 C1200,80 1380,240 1560,160"
            fill="none"
            stroke="url(#amberSunsetGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Dynamic Curved Ribbon 2: Diagonal Monad Violet Wave (Counter swaying) */}
        <g className="animate-wave-sway-reverse">
          <path
            d="M-100,520 C240,420 540,720 960,540 C1300,400 1480,590 1580,480"
            fill="none"
            stroke="url(#monadVioletGrad)"
            strokeWidth="6"
            filter="url(#softGlow)"
            opacity="0.25"
          />
          <path
            d="M-100,520 C240,420 540,720 960,540 C1300,400 1480,590 1580,480"
            fill="none"
            stroke="url(#monadVioletGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* Dynamic Ribbon 3: Emerald & Teal Lower Wave */}
        <g className="animate-wave-sway">
          <path
            d="M-60,780 C320,680 620,920 1020,760 C1340,640 1440,820 1560,780"
            fill="none"
            stroke="url(#emeraldTealGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Dashed flowing contour line with slow crawling dash offset */}
        <path
          d="M-40,300 C360,180 680,440 1060,280 C1320,160 1460,340 1540,260"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          strokeOpacity="0.32"
          className="animate-dash-flow"
        />

        {/* Secondary subtle violet dashed contour line */}
        <path
          d="M-80,680 C340,560 680,820 1100,640 C1360,500 1460,660 1560,600"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.4"
          strokeDasharray="5 14"
          strokeOpacity="0.26"
          className="animate-dash-flow [animation-direction:reverse]"
        />

        {/* Ambient constellation links: faint lines connecting floating nodes */}
        <g opacity="0.35">
          <line x1="160" y1="210" x2="240" y2="280" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="240" y1="280" x2="310" y2="240" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="160" cy="210" r="2.5" fill="#F59E0B" />
          <circle cx="240" cy="280" r="3" fill="#EA580C" />
          <circle cx="310" cy="240" r="2" fill="#FBBF24" />

          <line x1="1200" y1="360" x2="1280" y2="420" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="1280" y1="420" x2="1350" y2="370" stroke="#7C3AED" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="1200" cy="360" r="2" fill="#6366F1" />
          <circle cx="1280" cy="420" r="3.2" fill="#7C3AED" />
          <circle cx="1350" cy="370" r="2.2" fill="#A855F7" />
        </g>
      </svg>

      {/* 3. Floating, Moving Creative Web3 & Crowdfunding Icons (Borderless, sunk into background) */}

      {/* Top-Left: Radiant 4-Point Amber Sparkle */}
      <div className="absolute top-16 left-6 sm:left-12 lg:left-20 animate-float-slow pointer-events-none">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md pointer-events-none" />
          <svg className="w-7 h-7 animate-spin-very-slow text-amber-500/60 drop-shadow-[0_2px_10px_rgba(245,158,11,0.25)]" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 C12 7.5 7.5 12 2 12 C7.5 12 12 16.5 12 22 C12 16.5 16.5 12 22 12 C16.5 12 12 7.5 12 2 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Top-Right: Floating Rupee Token (Sunken with background) */}
      <div className="absolute top-20 right-8 sm:right-16 lg:right-24 animate-float-delayed pointer-events-none">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md pointer-events-none" />
          <span className="font-editorial text-2xl font-bold text-amber-600/60 select-none drop-shadow-[0_2px_10px_rgba(217,119,6,0.2)]">
            ₹
          </span>
        </div>
      </div>

      {/* Mid-Left: Floating Milestone Shield with Emerald Glow */}
      <div className="absolute top-[38%] left-4 sm:left-10 lg:left-16 animate-float-reverse pointer-events-none">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md pointer-events-none" />
          <svg className="w-7 h-7 text-emerald-600/55 drop-shadow-[0_2px_10px_rgba(5,150,105,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      </div>

      {/* Mid-Right: Monad Isometric Hex/Block in Electric Violet */}
      <div className="absolute top-[42%] right-6 sm:right-12 lg:right-20 animate-float-slow pointer-events-none">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-md pointer-events-none" />
          <svg className="w-8 h-8 text-purple-600/55 animate-spin-very-slow [animation-duration:50s] drop-shadow-[0_2px_12px_rgba(124,58,237,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
            <path d="m12 13 9-5" />
            <path d="m12 13-9-5" />
            <path d="M12 13v9" />
          </svg>
        </div>
      </div>

      {/* Lower-Left: Community Backer Heart Badge */}
      <div className="absolute top-[68%] left-8 sm:left-14 lg:left-24 animate-float-delayed pointer-events-none">
        <div className="relative flex items-center justify-center w-9 h-9">
          <div className="absolute inset-0 rounded-full bg-rose-400/20 blur-md pointer-events-none" />
          <svg className="w-6 h-6 text-rose-500/50 animate-pulse-glow drop-shadow-[0_2px_10px_rgba(244,63,94,0.2)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Lower-Right: Creative Rocket / Launch Spark Badge */}
      <div className="absolute top-[72%] right-8 sm:right-16 lg:right-28 animate-float-reverse pointer-events-none">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-orange-400/20 blur-md pointer-events-none" />
          <svg className="w-7 h-7 text-orange-600/55 -rotate-45 drop-shadow-[0_2px_10px_rgba(234,88,12,0.2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
      </div>

      {/* Subtle Micro Floating Particles (Sunken into background) */}
      <div className="absolute top-[28%] left-[24%] w-2 h-2 rounded-full bg-amber-400/35 blur-[0.5px] animate-float-slow" />
      <div className="absolute top-[18%] right-[32%] w-1.5 h-1.5 rounded-full bg-indigo-400/30 blur-[0.5px] animate-float-delayed" />
      <div className="absolute top-[52%] left-[42%] w-2.5 h-2.5 rounded-full bg-orange-400/25 blur-[0.5px] animate-float-reverse" />
      <div className="absolute top-[62%] right-[40%] w-2 h-2 rounded-full bg-emerald-400/30 blur-[0.5px] animate-float-slow" />
      <div className="absolute top-[82%] left-[30%] w-2 h-2 rounded-full bg-purple-400/30 blur-[0.5px] animate-float-delayed" />
      <div className="absolute top-[86%] right-[22%] w-2.5 h-2.5 rounded-full bg-amber-400/30 blur-[0.5px] animate-float-reverse" />
    </div>
  );
}

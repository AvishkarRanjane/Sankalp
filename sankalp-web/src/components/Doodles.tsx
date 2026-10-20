import React from 'react';
import Image from 'next/image';

/**
 * Custom Dynamic Ribbon "S" Logo combining sunset orange, amber, and electric violet
 */
export function SankalpRibbonLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Sankalp Logo"
      width={128}
      height={128}
      priority
      className={`object-contain shrink-0 ${className}`}
    />
  );
}

/**
 * Hand-drawn vine & floral doodle for top-left margin
 */
export function VineDoodleLeft({ className = "w-44 h-64" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      {/* 4-point doodle star above */}
      <path
        d="M58 20 C58 28 53 33 45 33 C53 33 58 38 58 46 C58 38 63 33 71 33 C63 33 58 28 58 20 Z"
        fill="none"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Organic vine stem */}
      <path
        d="M5 230 C18 190 28 140 22 95 C18 65 30 40 45 35"
        stroke="#1E1B4B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Petal 1 */}
      <path
        d="M22 110 C-2 95 2 65 24 75 C30 85 28 100 22 110 Z"
        stroke="#1E1B4B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Petal 2 */}
      <path
        d="M24 140 C-8 135 -4 175 18 170 C24 165 26 150 24 140 Z"
        stroke="#1E1B4B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Orange accent loop */}
      <path
        d="M28 85 C42 60 70 70 55 95 C45 105 32 95 28 85 Z"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 190 C32 175 52 185 45 205 C38 215 22 205 18 190 Z"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn floating doodles for top-right margin
 */
export function VineDoodleRight({ className = "w-44 h-64" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      {/* Curved arcs */}
      <path
        d="M140 10 C125 40 135 80 155 100"
        stroke="#1E1B4B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M110 35 C100 65 110 95 130 115"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Orange circle */}
      <circle
        cx="125"
        cy="150"
        r="8"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Purple leaf flourish */}
      <path
        d="M150 140 C125 155 130 195 155 185 C165 175 160 150 150 140 Z"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Abstract stem */}
      <path
        d="M155 185 C145 210 150 235 158 245"
        stroke="#1E1B4B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Little star */}
      <path
        d="M100 80 L102 88 L110 90 L102 92 L100 100 L98 92 L90 90 L98 88 Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

/**
 * Hand-drawn squiggly underline beneath "promises"
 */
export function SquigglyUnderline({ className = "w-full h-4", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
      preserveAspectRatio="none"
    >
      <path
        d="M2 11 Q 25 3, 50 11 T 100 11 T 150 11 T 198 10"
        stroke="#6366F1"
        strokeWidth="3.2"
        strokeLinecap="round"
        className={animated ? "animate-draw-squiggle" : ""}
      />
    </svg>
  );
}

/**
 * Radiating burst ticks above "promises"
 */
export function BurstTicks({ className = "w-6 h-6", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10 ${animated ? "animate-pop-burst origin-bottom-left" : ""}`}
    >
      <path d="M10 24 L4 28" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 18 L16 8" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 24 L28 28" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Sketchy hand-drawn loop / double circle around "Start a project" button
 */
export function SketchyButtonLoop({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 170 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
      preserveAspectRatio="none"
    >
      {/* Outer hand-drawn loop */}
      <path
        d="M18 5 C70 1, 145 2, 162 14 C172 23, 168 38, 150 46 C115 53, 35 52, 12 43 C-2 36, 1 18, 22 10 C50 3, 130 5, 158 12"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn double ring around the word "rupee" with sunburst rays
 */
export function HandDrawnRupeeCircle({
  children,
  animated,
}: {
  children: React.ReactNode;
  animated?: boolean;
}) {
  const isControlled = typeof animated === 'boolean';
  const isPlaying = animated === true;

  // If statically used (animated === undefined), show normally
  // If controlled (animated passed): hide when false, play animation when true
  const sunburstClass = !isControlled
    ? 'opacity-100'
    : isPlaying
    ? 'animate-pop-sunburst'
    : 'opacity-0';

  const ring1Class = !isControlled
    ? ''
    : isPlaying
    ? 'animate-draw-ring-1'
    : 'opacity-0';

  const ring2Class = !isControlled
    ? ''
    : isPlaying
    ? 'animate-draw-ring-2'
    : 'opacity-0';

  return (
    <span className="relative inline-block px-3.5 py-1">
      {/* Sunburst rays above */}
      <svg
        viewBox="0 0 40 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-4 pointer-events-none -z-10 transition-opacity duration-300 ${sunburstClass}`}
      >
        <path d="M10 12 L4 4" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20 12 L20 2" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M30 12 L36 4" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      {/* The double circle around the word */}
      <svg
        viewBox="0 0 110 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none -z-10 -translate-y-0.5 scale-110"
        preserveAspectRatio="none"
      >
        {/* Ring 1 */}
        <path
          d="M12 24 C10 10, 30 4, 55 4 C80 4, 102 10, 102 24 C102 38, 78 43, 55 43 C28 43, 8 36, 10 22 C11 12, 35 6, 62 6"
          stroke="#EA580C"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={ring1Class}
        />
        {/* Ring 2 (looser sketchy overlap) */}
        <path
          d="M16 26 C14 13, 34 7, 58 7 C84 7, 98 13, 98 25 C98 36, 75 41, 52 41 C30 41, 14 34, 15 23"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
          className={ring2Class}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/**
 * Doodles under stat cards (left side): bracket, circles, double stars
 */
export function StatDoodlesLeft({ className = "w-32 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      {/* Hand-drawn double stars */}
      <path
        d="M18 20 C18 27 14 31 7 31 C14 31 18 35 18 42 C18 35 22 31 29 31 C22 31 18 27 18 20 Z"
        fill="none"
        stroke="#111827"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M38 10 C38 15 35 18 30 18 C35 18 38 21 38 26 C38 21 41 18 46 18 C41 18 38 15 38 10 Z"
        fill="none"
        stroke="#111827"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Orange curvy bracket */}
      <path
        d="M8 50 C2 60 12 70 24 65 C32 62 38 68 34 78"
        stroke="#F59E0B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Small orange dots */}
      <circle cx="58" cy="68" r="4.5" stroke="#F59E0B" strokeWidth="1.8" />
      <circle cx="75" cy="62" r="3" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Doodles under stat cards (right side): curved arrow pointing to stats + sparkle
 */
export function StatDoodlesRight({ className = "w-32 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      {/* Curving arrow */}
      <path
        d="M125 15 C132 45 115 70 85 70 C70 70 60 62 65 52"
        stroke="#6366F1"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M60 62 L65 52 L76 56"
        stroke="#6366F1"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sparkle star */}
      <path
        d="M105 52 C105 57 102 60 97 60 C102 60 105 63 105 68 C105 63 108 60 113 60 C108 60 105 57 105 52 Z"
        fill="none"
        stroke="#6366F1"
        strokeWidth="1.8"
      />
      <circle cx="120" cy="66" r="3.5" stroke="#6366F1" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Zigzag accent for trust strip
 */
export function ZigzagDoodle({ className = "w-8 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      <path
        d="M2 9 L9 3 L16 9 L23 3 L30 9 L34 4"
        stroke="#F59E0B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Curved swoop for milestone badge
 */
export function SwoopDoodle({ className = "w-10 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      <path
        d="M2 3 C15 10 30 11 42 4"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 9 C22 13 34 12 40 8"
        stroke="#EA580C"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Curly loop accent next to section title
 */
export function CurlyLoopDoodle({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none -z-10`}
    >
      <path
        d="M8 26 C2 20 5 10 14 10 C24 10 24 24 16 24 C8 24 12 6 24 6"
        stroke="#F59E0B"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BlurSlideHeadingProps {
  primaryText: string;
  accentText?: string;
  accentClassName?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  align?: 'left' | 'center' | 'right';
  cursorReveal?: boolean;
}

export default function BlurSlideHeading({
  primaryText,
  accentText,
  accentClassName = 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent',
  className = '',
  as: Component = 'h3',
  align = 'center',
  cursorReveal = false,
}: BlurSlideHeadingProps) {
  const [inView, setInView] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(!cursorReveal);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => observer.disconnect();
  }, []);

  const primaryWords = primaryText.split(' ');
  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div ref={containerRef} className={`w-full ${alignClass}`}>
      <Component className={className}>
        {/* Primary words */}
        {primaryWords.map((word, idx) => (
          <span
            key={`p-${idx}`}
            className={`inline-block mr-2.5 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{
              transitionDelay: `${idx * 75}ms`,
            }}
          >
            {word}
          </span>
        ))}

        {/* Accent words / Interactive Cursor Reveal */}
        {accentText && (
          cursorReveal ? (
            <span
              onMouseEnter={() => setHasRevealed(true)}
              onMouseMove={() => {
                if (!hasRevealed) setHasRevealed(true);
              }}
              onTouchStart={() => setHasRevealed(true)}
              onClick={() => setHasRevealed((prev) => !prev)}
              className="group relative inline-block cursor-pointer select-none align-baseline transition-all duration-500 ml-1.5"
            >
              <span
                className={`relative z-10 inline-block transition-all duration-500 pb-1 ${
                  hasRevealed
                    ? 'opacity-100 filter-none scale-100 translate-y-0'
                    : 'opacity-70 blur-[2px] scale-100 hover:opacity-100 hover:filter-none'
                }`}
              >
                <span className={`inline-block ${accentClassName} font-extrabold tracking-tight`}>
                  {accentText}
                </span>
                {/* Vibrant gradient underline when revealed */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] transition-all duration-700 ${
                    hasRevealed ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </span>
            </span>
          ) : (
            <span
              className={`inline-block transition-all duration-700 ml-1.5 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{
                transitionDelay: `${primaryWords.length * 75}ms`,
              }}
            >
              <span className={`inline-block ${accentClassName}`}>
                {accentText}
              </span>
            </span>
          )
        )}
      </Component>
    </div>
  );
}

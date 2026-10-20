'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HighlighterHeadingProps {
  prefixText: string;
  highlightedText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export default function HighlighterHeading({
  prefixText,
  highlightedText,
  className = '',
  as: Component = 'h1',
}: HighlighterHeadingProps) {
  const [inView, setInView] = useState(false);
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

  return (
    <div ref={containerRef} className="w-full text-left">
      <Component className={className}>
        <span
          className={`inline-block mr-2.5 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {prefixText}
        </span>
        <span className="relative inline-block whitespace-nowrap">
          <span className="relative z-10 text-[#111827]">{highlightedText}</span>
          {/* Organic amber highlighter stroke strictly behind text */}
          <span
            className={`absolute bottom-1 left-0 h-[38%] -z-10 rounded-sm bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#FDE68A] transform -rotate-1 origin-left ${
              inView ? 'animate-highlighter-sweep' : 'w-0 opacity-0'
            }`}
            aria-hidden="true"
          />
        </span>
      </Component>
    </div>
  );
}

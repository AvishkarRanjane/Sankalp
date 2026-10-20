'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CatalogRevealHeadingProps {
  leadText: string;
  focusText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export default function CatalogRevealHeading({
  leadText,
  focusText,
  className = '',
  as: Component = 'h1',
}: CatalogRevealHeadingProps) {
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
      <Component className={`${className} leading-[1.2] pb-1 overflow-visible`}>
        <span
          className={`inline-block mr-3 pb-3 -mb-3 text-[#111827] transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {leadText}
        </span>
        <span
          className={`inline-block pb-4 -mb-4 pt-1 -mt-1 pr-2 -mr-2 bg-gradient-to-r from-[#D97706] via-[#EA580C] to-[#B45309] bg-clip-text text-transparent transition-all duration-700 ease-out overflow-visible ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {focusText}
        </span>
      </Component>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MilestoneStepHeadingProps {
  leadText: string;
  milestoneText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export default function MilestoneStepHeading({
  leadText,
  milestoneText,
  className = '',
  as: Component = 'h1',
}: MilestoneStepHeadingProps) {
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
          className={`block sm:inline text-[#111827] transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {leadText}
        </span>
        <span className="hidden sm:inline">&nbsp;</span>
        <span
          className={`inline-block pb-3 -mb-3 pt-1 -mt-1 pr-2 -mr-2 overflow-visible bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent transition-all duration-800 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          {milestoneText}
        </span>
      </Component>
    </div>
  );
}

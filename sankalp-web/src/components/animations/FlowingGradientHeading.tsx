'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FlowingGradientHeadingProps {
  prefixText: string;
  gradientText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export default function FlowingGradientHeading({
  prefixText,
  gradientText,
  className = '',
  as: Component = 'h3',
}: FlowingGradientHeadingProps) {
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
    <div ref={containerRef} className="w-full text-center">
      <Component className={className}>
        <span
          className={`inline-block mr-2.5 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {prefixText}
        </span>
        <span
          className={`inline-block pb-4 -mb-4 pt-1 -mt-1 pr-2 -mr-2 overflow-visible bg-gradient-to-r from-[#F59E0B] via-[#EC4899] to-[#6366F1] bg-clip-text text-transparent animate-shimmer-flow transition-all duration-1000 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          {gradientText}
        </span>
      </Component>
    </div>
  );
}

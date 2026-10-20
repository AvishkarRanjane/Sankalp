'use client';

import React, { useState, useEffect, useRef } from 'react';

interface VaultLockHeadingProps {
  prefixText: string;
  secureText: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export default function VaultLockHeading({
  prefixText,
  secureText,
  className = '',
  as: Component = 'h1',
}: VaultLockHeadingProps) {
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
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          {prefixText}
        </span>
        <span
          className={`inline-flex items-center pb-3 -mb-3 pt-1 -mt-1 pr-2 -mr-2 overflow-visible bg-gradient-to-r from-[#059669] via-[#10B981] to-[#047857] bg-clip-text text-transparent ${
            inView ? 'animate-vault-lock' : 'opacity-0'
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <span className="pb-2 -mb-2 inline-block">{secureText}</span>
        </span>
      </Component>
    </div>
  );
}

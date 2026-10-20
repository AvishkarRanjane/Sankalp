'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTextRollProps {
  typewriterText: string;
  rollText: React.ReactNode;
  rollClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  containerClassName?: string;
  align?: 'left' | 'center' | 'right';
  typeSpeed?: number;
  pauseBeforeRoll?: number;
  rollDuration?: number;
  triggerOnScroll?: boolean;
}

export default function AnimatedTextRoll({
  typewriterText,
  rollText,
  rollClassName = 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent',
  as: Component = 'h3',
  className = '',
  containerClassName = '',
  align = 'center',
  typeSpeed = 90,
  pauseBeforeRoll = 420,
  rollDuration = 1200,
  triggerOnScroll = true,
}: AnimatedTextRollProps) {
  const [displayText, setDisplayText] = useState('');
  const [triggerRoll, setTriggerRoll] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(!triggerOnScroll);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to start typewriter effect when scrolled into view
  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
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
  }, [triggerOnScroll]);

  // Execute typewriter and subsequent roll animation
  useEffect(() => {
    if (!hasStarted) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setDisplayText(typewriterText.slice(0, charIndex));

      if (charIndex >= typewriterText.length) {
        clearInterval(interval);

        setTimeout(() => {
          setTriggerRoll(true);

          setTimeout(() => {
            setTimeout(() => {
              setCursorVisible(false);
            }, 800);
          }, rollDuration);
        }, pauseBeforeRoll);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [hasStarted, typewriterText, typeSpeed, pauseBeforeRoll, rollDuration]);

  const alignClass =
    align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div ref={containerRef} className={`w-full ${alignClass} ${containerClassName}`}>
      <Component className={className}>
        <span>
          {displayText}
          {cursorVisible && (
            <span
              className="inline-block w-[3px] h-[0.85em] align-middle bg-[#6366F1] ml-1 animate-typing-cursor rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="inline">&nbsp;</span>
        <span className="perspective-roller inline-block overflow-visible align-baseline">
          <span
            className={`inline-block origin-bottom ${rollClassName} ${
              triggerRoll ? 'animate-roll-in' : 'opacity-0'
            }`}
          >
            {rollText}
          </span>
        </span>
      </Component>
    </div>
  );
}

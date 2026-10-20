'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const CIPHER_CHARS = '01#@$%&*!?/<>{}[]=+~';

interface DecryptTextProps {
  targetText: string;
  badgeNode?: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  totalDurationMs?: number; // Total sequence duration, default 3500ms (3.5 sec)
}

export default function DecryptText({
  targetText,
  badgeNode,
  className = '',
  as: Component = 'h3',
  totalDurationMs = 3500, // Completes smoothly in 3.5 seconds (3 to 4 sec)
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(targetText);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);
  const [inView, setInView] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
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

  useEffect(() => {
    if (!inView) return;

    // Text decoding phase runs for ~2500ms (calm, low speed: ~85ms per character)
    // Hand-drawn doodle badge draws and sunburst pops from ~2500ms to 3500ms
    const textDuration = Math.round(totalDurationMs * 0.71); // ~2485ms
    let startTime: number | null = null;
    let lastCipherTick = 0;
    let lastResolvedCount = -1;
    let animFrameId: number;

    const tick = (now: number) => {
      if (startTime === null) {
        startTime = now;
        setBadgeVisible(false);
        setBadgeAnimated(false);
      }

      const elapsed = now - startTime;
      const textProgress = Math.min(1, elapsed / textDuration);

      // Throttled cipher symbol change: update cipher characters every ~85ms for a calm, low-speed effect
      const shouldMutateCipher = now - lastCipherTick > 85;
      if (shouldMutateCipher) {
        lastCipherTick = now;
      }

      // How many characters are permanently locked in
      const resolvedCount = Math.floor(textProgress * targetText.length);

      // Only recompute string when a new character resolves or cipher ticks
      if (shouldMutateCipher || resolvedCount !== lastResolvedCount) {
        lastResolvedCount = resolvedCount;
        setDisplayText((prev) => {
          return targetText
            .split('')
            .map((char, index) => {
              // Always preserve space and newline breaks to avoid any layout shifting
              if (char === ' ' || char === '\n') return char;
              if (index < resolvedCount) {
                return targetText[index];
              }
              if (shouldMutateCipher || !prev || index >= prev.length) {
                return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
              }
              return prev[index] || CIPHER_CHARS[0];
            })
            .join('');
        });
      }

      // At ~63% of total sequence (~2.2s), smoothly fade in the badge word ("rupee")
      if (elapsed >= totalDurationMs * 0.63) {
        setBadgeVisible(true);
      }

      // At ~71% of total sequence (~2.5s), start the drawing animation of the hand-drawn circle
      if (elapsed >= totalDurationMs * 0.71) {
        setBadgeAnimated(true);
      }

      if (elapsed < totalDurationMs) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        // Complete sequence at exactly 3.5s
        setDisplayText(targetText);
        setBadgeVisible(true);
        setBadgeAnimated(true);
      }
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [inView, targetText, totalDurationMs, replayKey]);

  const handleReplay = useCallback(() => {
    setBadgeVisible(false);
    setBadgeAnimated(false);
    setReplayKey((k) => k + 1);
  }, []);

  // Pass animated prop and key to badgeNode so it replays CSS animations cleanly
  const renderedBadge = badgeNode
    ? React.isValidElement(badgeNode)
      ? React.cloneElement(badgeNode as React.ReactElement<{ animated?: boolean; key?: React.Key }>, {
          animated: badgeAnimated,
          key: `badge-${replayKey}-${badgeAnimated ? 'anim' : 'idle'}`,
        })
      : badgeNode
    : null;

  return (
    <div
      ref={containerRef}
      onClick={handleReplay}
      title="Click to replay animation"
      className="w-full text-center cursor-pointer select-none"
    >
      <Component className={className}>
        <span className="font-editorial tracking-tight">{displayText}</span>
        {renderedBadge && (
          <>
            <span className="inline">&nbsp;</span>
            <span
              className={`inline-block align-baseline transition-all duration-700 ${
                badgeVisible
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-1'
              }`}
            >
              {renderedBadge}
            </span>
          </>
        )}
      </Component>
    </div>
  );
}

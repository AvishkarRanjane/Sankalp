'use client';

import React, { useState, useEffect } from 'react';
import { SquigglyUnderline, BurstTicks } from '@/components/Doodles';

const TARGET_TEXT = 'Crowdfunding that';

export default function AnimatedHeroHeadline() {
  const [typedText, setTypedText] = useState('');
  const [triggerRoll, setTriggerRoll] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedText(TARGET_TEXT.slice(0, charIndex));

      if (charIndex >= TARGET_TEXT.length) {
        clearInterval(typeInterval);

        // Pause comfortably so the user can read "Crowdfunding that" before rolling
        setTimeout(() => {
          setTriggerRoll(true);

          // Once 3D roll finishes (~1250ms), settle and draw squiggle
          setTimeout(() => {
            setIsSettled(true);

            // Fade out the typing cursor after everything settles
            setTimeout(() => {
              setCursorVisible(false);
            }, 900);
          }, 1250);
        }, 450);
      }
    }, 105);

    return () => clearInterval(typeInterval);
  }, [replayKey]);

  const handleReplay = () => {
    setTypedText('');
    setTriggerRoll(false);
    setIsSettled(false);
    setCursorVisible(true);
    setReplayKey((k) => k + 1);
  };

  return (
    <h1
      onClick={handleReplay}
      title="Click to replay animation"
      className="font-editorial text-5xl sm:text-7xl lg:text-[84px] xl:text-[90px] font-extrabold text-[#111827] tracking-tight max-w-6xl mx-auto leading-[1.12] select-none cursor-pointer"
      aria-label="Crowdfunding that keeps its promises"
    >
      {/* Top Line: "Crowdfunding that" (types out) + "keeps" (rolls in) */}
      <span className="block sm:inline">
        <span className="text-[#111827]">
          {typedText}
          {cursorVisible && (
            <span
              className="inline-block w-[3.5px] sm:w-[5px] h-[0.88em] align-middle bg-[#6366F1] ml-1.5 animate-typing-cursor rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              aria-hidden="true"
            />
          )}
        </span>

        {/* Space before "keeps" */}
        <span className="inline">&nbsp;</span>

        {/* "keeps" 3D tumbler roll at the exact position */}
        <span className="perspective-roller inline-block overflow-visible align-baseline">
          <span
            className={`inline-block pb-3 -mb-3 pt-1 -mt-1 pr-2 -mr-2 overflow-visible bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent origin-bottom ${
              triggerRoll ? 'animate-roll-in' : 'opacity-0'
            }`}
          >
            keeps
          </span>
        </span>
      </span>

      {/* Second Line: "its promises" (rolls in with delay + squiggly underline & burst) */}
      <span className="block sm:mt-1.5">
        <span className="perspective-roller inline-block overflow-visible align-baseline">
          <span
            className={`inline-flex items-center gap-x-2.5 origin-bottom pb-3 -mb-3 overflow-visible ${
              triggerRoll ? 'animate-roll-in-delayed' : 'opacity-0'
            }`}
          >
            <span className="inline-block pb-2 -mb-2 pr-1 -mr-1 bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#F59E0B] bg-clip-text text-transparent">
              its
            </span>{' '}
            <span className="relative inline-block text-[#6366F1]">
              <span className="relative z-10">promises</span>
              <SquigglyUnderline
                className="absolute -bottom-3 left-0 w-full h-4.5 -z-10 pointer-events-none"
                animated={isSettled}
              />
              <BurstTicks
                className="absolute -top-4 -right-7 w-8 h-8 -z-10 pointer-events-none"
                animated={isSettled}
              />
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}

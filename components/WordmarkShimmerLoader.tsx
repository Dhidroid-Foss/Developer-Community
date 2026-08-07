"use client";

import React, { useEffect, useState } from "react";

interface WordmarkShimmerLoaderProps {
  color?: string;
  className?: string;
}

export default function WordmarkShimmerLoader({
  color = "#fa6739",
  className = "",
}: WordmarkShimmerLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Smooth incremental progress steps
      const increment = Math.floor(Math.random() * 7) + 3;
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 select-none ${className}`}>
      {/* Main Crisp Wordmark Logo (Compact Size, Solid Colors) */}
      <div className="relative z-10 flex items-center gap-1 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-.05em] py-0.5 px-1 overflow-visible">
        <span className="font-heading text-[#fa6739] inline-block leading-snug" lang="ta">
          தமிழ்
        </span>
        <span className="font-heading text-[#151515] inline-block leading-snug">
          Dev
        </span>
      </div>

      {/* Dynamic Square Progress Fill Line (Compact Tight Gap & Width) */}
      <div className="relative z-10 mt-2.5 w-40 sm:w-48 h-1 rounded-none overflow-hidden bg-stone-300/80">
        <div
          className="h-full rounded-none transition-all duration-150 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Eyebrow Status Subtitle */}
      <span className="relative z-10 mt-2.5 font-mono text-[8px] uppercase tracking-[.25em] text-stone-500 font-bold">
        {progress >= 100 ? "NETWORK LOAD COMPLETE" : "FETCHING REALTIME ASSETS..."}
      </span>
    </div>
  );
}

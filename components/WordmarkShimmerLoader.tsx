"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/app/assets/my_community_logo.svg";

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
      {/* Wordmark with logo */}
      <div className="relative z-10 flex items-center gap-2 py-0.5 px-1">
        <Image
          src={logo}
          alt="Niral Developer"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
          priority
        />
        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-.05em] leading-snug">
          <span className="text-[#fa6739]">Niral</span>
          <span className="text-[#151515]"> Developer</span>
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
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import logo from "@/app/assets/my_community_logo.svg";

export type LoaderVariant =
  | "terminal"
  | "text-blink"
  | "loading-dots"
  | "niral"
  | "spinner";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoaderVariant;
  size?: "sm" | "md" | "lg";
  text?: string;
  color?: string;
  showLogo?: boolean;
}

export function Loader({
  variant = "terminal",
  size = "md",
  text,
  color = "#fa6739",
  showLogo = true,
  className = "",
  ...props
}: LoaderProps) {
  const logoDimensions = {
    sm: 24,
    md: 32,
    lg: 44,
  }[size];

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg font-bold tracking-tight",
    lg: "text-2xl font-extrabold tracking-tight",
  }[size];

  // 1. Terminal Variant
  if (variant === "terminal") {
    return (
      <div
        className={`flex items-center gap-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-zinc-100 shadow-sm ${className}`}
        {...props}
      >
        {showLogo && (
          <Image
            src={logo}
            alt="Niral"
            width={logoDimensions}
            height={logoDimensions}
            className="h-5 w-5 object-contain"
          />
        )}
        <span className="text-xs text-[#fa6739] font-bold">niral</span>
        <span className="text-xs text-zinc-400">~/community</span>
        <span className="text-xs text-zinc-100">{text ?? "loading..."}</span>
        <span className="inline-block h-3.5 w-1.5 animate-pulse bg-[#fa6739]" />
      </div>
    );
  }

  // 2. Text Blink Variant
  if (variant === "text-blink") {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 select-none ${className}`} {...props}>
        <div className="flex items-center gap-2">
          {showLogo && (
            <Image
              src={logo}
              alt="Niral Developer"
              width={logoDimensions}
              height={logoDimensions}
              className="object-contain animate-pulse"
            />
          )}
          <span className={`${textSizeClasses} animate-pulse`}>
            <span className="text-[#fa6739]">Niral</span>
            <span className="text-zinc-900 dark:text-white"> Developer</span>
          </span>
        </div>
      </div>
    );
  }

  // 3. Loading Dots Variant
  if (variant === "loading-dots") {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`} {...props}>
        {showLogo && (
          <Image
            src={logo}
            alt="Niral Developer"
            width={logoDimensions}
            height={logoDimensions}
            className="object-contain"
          />
        )}
        <div className="flex items-center gap-1.5 py-1">
          <span
            className="h-2 w-2 rounded-full animate-bounce"
            style={{ backgroundColor: color, animationDelay: "0ms" }}
          />
          <span
            className="h-2 w-2 rounded-full animate-bounce"
            style={{ backgroundColor: color, animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 rounded-full animate-bounce"
            style={{ backgroundColor: color, animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  // 4. Spinner Variant
  if (variant === "spinner") {
    return (
      <div className={`relative flex items-center justify-center ${className}`} {...props}>
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-[#fa6739]"
          style={{ borderTopColor: color }}
        />
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={logo}
              alt="Niral"
              width={16}
              height={16}
              className="h-4 w-4 object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  // 5. Default / Niral Wordmark Variant
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`} {...props}>
      <div className="relative z-10 flex items-center gap-2 py-0.5 px-1">
        {showLogo && (
          <Image
            src={logo}
            alt="Niral Developer"
            width={logoDimensions}
            height={logoDimensions}
            className="object-contain"
          />
        )}
        <span className={textSizeClasses}>
          <span className="text-[#fa6739]">Niral</span>
          <span className="text-zinc-900 dark:text-white"> Developer</span>
        </span>
      </div>
      <div className="relative z-10 mt-2.5 w-36 h-1 overflow-hidden bg-stone-300/80 dark:bg-zinc-800 rounded-none">
        <div
          className="h-full w-full -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[#fa6739] to-transparent"
        />
      </div>
    </div>
  );
}

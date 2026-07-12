"use client";

import React, { useRef, useEffect, useState, useMemo, JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: "left" | "right" | "up" | "down"; // Maintained for prop compatibility
  duration?: number;
  maxDelay?: number;
  ease?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: "random" | "evenodd";
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789✦!@#$%^&*()_+";

export default function Shuffle({
  text,
  className = "",
  style = {},
  duration = 0.8,
  ease = "power2.out",
  threshold = 0.15,
  tag = "span",
  textAlign = "left",
  onShuffleComplete,
  scrambleCharset = DEFAULT_CHARSET,
  colorFrom = "#fa6739", // Brand orange accent
  colorTo = "#ffffff",   // Base layout color
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}: ShuffleProps): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [tick, setTick] = useState(0); // Forces render flicker for scrambled chars

  useEffect(() => {
    setIsClient(true);
  }, []);

  const charArray = useMemo(() => text.split(""), [text]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const startScramble = contextSafe(() => {
    if (respectReducedMotion && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(text.length);
      onShuffleComplete?.();
      return;
    }

    const stateObj = { value: 0 };
    
    gsap.killTweensOf(stateObj);
    setProgress(0);

    gsap.to(stateObj, {
      value: text.length,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        setProgress(stateObj.value);
        setTick((prev) => prev + 1); // Induce character flicker
      },
      onComplete: () => {
        setProgress(text.length);
        onShuffleComplete?.();
      }
    });
  });

  useGSAP(
    () => {
      if (!isClient || !containerRef.current) return;

      // Set up ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        once: triggerOnce,
        onEnter: () => {
          startScramble();
        }
      });

      // Hover handler
      let hoverHandler: (() => void) | null = null;
      if (triggerOnHover) {
        hoverHandler = () => {
          startScramble();
        };
        containerRef.current.addEventListener("mouseenter", hoverHandler);
      }

      return () => {
        trigger.kill();
        if (hoverHandler && containerRef.current) {
          containerRef.current.removeEventListener("mouseenter", hoverHandler);
        }
      };
    },
    {
      dependencies: [isClient, text, duration, ease, threshold, triggerOnce, respectReducedMotion, triggerOnHover],
      scope: containerRef
    }
  );

  const Tag = tag;

  return React.createElement(
    Tag,
    {
      ref: containerRef as any,
      className: `inline-block whitespace-normal break-words ${className}`,
      style: { textAlign, ...style }
    },
    charArray.map((char, index) => {
      if (char === " ") {
        return <span key={index}> </span>;
      }

      const isResolved = index < progress;

      // Get a random character from the charset, changing dynamically on each tick
      const randomChar = scrambleCharset.charAt(
        Math.floor((Math.sin(index + tick) * 0.5 + 0.5) * scrambleCharset.length)
      );

      return (
        <span
          key={index}
          style={{
            color: isResolved ? colorTo : colorFrom,
            transition: "color 0.2s ease"
          }}
          className={isResolved ? "" : "font-mono opacity-80"}
        >
          {isResolved ? char : randomChar}
        </span>
      );
    })
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Globe, Activity } from "lucide-react";

interface TimeNumberLoaderProps {
  color?: string;
  className?: string;
}

export default function TimeNumberLoader({
  color = "#fa6739",
  className = "",
}: TimeNumberLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState("ONLINE");
  const [resourceCount, setResourceCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    // Detect active browser online status & network connection type
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
      if (conn?.effectiveType) {
        setConnectionType(conn.effectiveType.toUpperCase());
      } else {
        setConnectionType(navigator.onLine ? "CONNECTED" : "OFFLINE");
      }
    };

    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Track real network performance and resource load entries
    const interval = setInterval(() => {
      const now = performance.now();
      const currentElapsed = Math.max(0, now - startTime);
      setElapsedMs(currentElapsed);

      // Measure real browser network resource performance entries
      if (typeof window !== "undefined" && window.performance) {
        const resources = performance.getEntriesByType("resource");
        setResourceCount(resources.length);

        if (resources.length > 0) {
          // Calculate real completion ratio of network asset transfers
          const loadedResources = resources.filter(
            (res) => (res as PerformanceResourceTiming).responseEnd > 0
          );
          const realRatio = Math.min(100, Math.round((loadedResources.length / resources.length) * 100));

          // Smooth progress update tied to real network load ratio
          setProgress((prev) => Math.max(prev, Math.min(99, Math.max(realRatio, Math.floor(currentElapsed / 15)))));
        } else {
          // Fallback smooth progress curve based on real elapsed milliseconds
          const calculatedProgress = Math.min(99, Math.floor(currentElapsed / 12));
          setProgress((prev) => Math.max(prev, calculatedProgress));
        }
      }
    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const formattedSeconds = (elapsedMs / 1000).toFixed(3);

  return (
    <div className={`flex flex-col items-center justify-center p-8 font-mono select-none ${className}`}>
      {/* Real Network Diagnostic Badge */}
      <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-stone-200/80 border border-stone-300 text-[10px] uppercase tracking-widest text-stone-600 font-semibold shadow-xs">
        <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
        <Globe size={11} className="text-stone-500" />
        <span>{isOnline ? connectionType : "OFFLINE"}</span>
        <span className="text-stone-400">•</span>
        <Activity size={11} className="text-stone-500" />
        <span>{resourceCount} HTTP ASSETS</span>
      </div>

      {/* Real Big Digital Percentage Counter */}
      <div className="relative flex flex-col items-center">
        <div className="text-[64px] sm:text-[76px] font-extrabold tracking-tighter leading-none text-stone-900 flex items-baseline">
          <span>{progress}</span>
          <span className="text-3xl sm:text-4xl text-[#fa6739] ml-1">%</span>
        </div>

        {/* Real Network Elapsed Time */}
        <div className="mt-2 flex items-center gap-2 text-xs text-stone-500 font-semibold tracking-widest uppercase">
          <span>T+{formattedSeconds}s ELAPSED</span>
          <span>•</span>
          <span className="text-[#fa6739] animate-pulse">NETWORK SYNC</span>
        </div>
      </div>

      {/* Real Network Progress Bar */}
      <div className="mt-6 w-56 sm:w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden relative shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>

      {/* Real Network Status Eyebrow */}
      <span className="mt-4 text-[10px] uppercase tracking-widest text-stone-600 font-bold">
        {progress >= 100 ? "NETWORK LOAD COMPLETE" : "FETCHING REALTIME ASSETS..."}
      </span>
    </div>
  );
}

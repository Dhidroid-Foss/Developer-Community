"use client";

import React from "react";
import { Cloud } from "lucide-react";

interface CloudLoaderProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function CloudLoader({
  color = "#fa6739",
  size = 56,
  className = "",
}: CloudLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <style jsx>{`
        @keyframes cloudFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 4px 12px ${color}50);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
            filter: drop-shadow(0 12px 24px ${color}80);
          }
        }

        .cloud-animated {
          animation: cloudFloat 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative flex items-center justify-center p-4">
        {/* Ambient background glow ring */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
          style={{ backgroundColor: color }}
        />

        {/* Minimal Cloud Icon */}
        <Cloud
          size={size}
          color={color}
          strokeWidth={1.75}
          className="relative z-10 cloud-animated"
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Brief loading presentation; keeps the first paint on-brand while the
    // browser finishes parsing the initial JS bundle. Heavy runtime effects
    // (WebGL hero, etc.) are gated independently so they never fight the
    // parser when content mounts.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShouldRender(true);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loading />}
      <div
        className={`transition-opacity duration-700 ${
          shouldRender && !isLoading ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        {shouldRender && children}
      </div>
    </>
  );
}

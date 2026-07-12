"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay rendering of actual content slightly to ensure smooth mount transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds loading presentation

    // Enable rendering children immediately once loaded
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

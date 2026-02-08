"use client";

const pulseMessages = [
  "Detecting skin type...",
  "Analyzing texture & tone...",
  "Identifying concerns...",
  "Building your routine...",
  "Preparing food suggestions...",
  "Generating report...",
];

import { useState, useEffect } from "react";

export function AnalysisLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % pulseMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8 py-16">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-4 border-border" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full border-4 border-accent/30 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Your Skin</h3>
        <p className="text-sm text-muted-foreground transition-all duration-500 min-h-[20px]" aria-live="polite">
          {pulseMessages[messageIndex]}
        </p>
      </div>
      <div className="w-full max-w-xs">
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "60%", animation: "loading 2.5s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 10%; }
          50% { width: 80%; }
          100% { width: 10%; }
        }
      `}</style>
    </div>
  );
}

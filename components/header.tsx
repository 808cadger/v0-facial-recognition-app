"use client";

import { ScanFace } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <ScanFace className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">GlowAI</h1>
          <p className="text-[11px] text-muted-foreground -mt-0.5">AI Skin Analysis</p>
        </div>
      </div>
    </header>
  );
}

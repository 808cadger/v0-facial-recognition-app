"use client";

import { Lightbulb } from "lucide-react";

interface TipsCardProps {
  tips: string[];
}

export function TipsCard({ tips }: TipsCardProps) {
  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <ul className="flex flex-col gap-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

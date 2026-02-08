"use client";

import { Sun, Moon, Clock } from "lucide-react";

interface RoutineCardProps {
  step: {
    step: number;
    name: string;
    description: string;
    timing: "morning" | "evening" | "both";
  };
}

export function RoutineCard({ step }: RoutineCardProps) {
  const timingConfig = {
    morning: { icon: Sun, label: "Morning", color: "text-accent" },
    evening: { icon: Moon, label: "Evening", color: "text-primary" },
    both: { icon: Clock, label: "AM & PM", color: "text-muted-foreground" },
  };

  const config = timingConfig[step.timing];
  const TimingIcon = config.icon;

  return (
    <div className="flex items-start gap-4 rounded-xl bg-card border border-border p-5">
      <div className="shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <span className="text-sm font-bold text-foreground">{step.step}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-card-foreground text-sm">{step.name}</h4>
          <div className={`flex items-center gap-1 ${config.color}`}>
            <TimingIcon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{config.label}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

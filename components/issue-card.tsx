"use client";

import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface IssueCardProps {
  issue: {
    name: string;
    severity: "mild" | "moderate" | "severe";
    description: string;
  };
}

export function IssueCard({ issue }: IssueCardProps) {
  const severityConfig = {
    mild: {
      icon: Info,
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      label: "Mild",
    },
    moderate: {
      icon: AlertCircle,
      bg: "bg-[hsl(38,92%,50%)]/10",
      text: "text-[hsl(38,92%,50%)]",
      border: "border-[hsl(38,92%,50%)]/20",
      label: "Moderate",
    },
    severe: {
      icon: AlertTriangle,
      bg: "bg-destructive/10",
      text: "text-destructive",
      border: "border-destructive/20",
      label: "Severe",
    },
  };

  const config = severityConfig[issue.severity];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-5`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 mt-0.5 ${config.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-card-foreground text-sm">{issue.name}</h4>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${config.text}`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{issue.description}</p>
        </div>
      </div>
    </div>
  );
}

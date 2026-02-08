"use client";

import { Stethoscope, CheckCircle2 } from "lucide-react";

interface DoctorCardProps {
  advice: {
    shouldVisit: boolean;
    urgency: "none" | "routine" | "soon" | "urgent";
    reason: string | null;
    specialistType: string | null;
  };
}

export function DoctorCard({ advice }: DoctorCardProps) {
  if (!advice.shouldVisit) {
    return (
      <div className="rounded-xl bg-primary/10 border border-primary/20 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">No Doctor Visit Needed</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on the analysis, your skin looks healthy and doesn{"'"}t require professional medical attention at this time.
              Continue with a consistent skincare routine.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const urgencyConfig = {
    none: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" },
    routine: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary" },
    soon: { bg: "bg-[hsl(38,92%,50%)]/10", border: "border-[hsl(38,92%,50%)]/20", text: "text-[hsl(38,92%,50%)]" },
    urgent: { bg: "bg-destructive/10", border: "border-destructive/20", text: "text-destructive" },
  };

  const config = urgencyConfig[advice.urgency];

  return (
    <div className={`rounded-xl ${config.bg} border ${config.border} p-6`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}>
          <Stethoscope className={`w-5 h-5 ${config.text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">Doctor Visit Recommended</h4>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${config.text} px-2 py-0.5 rounded-full ${config.bg}`}>
              {advice.urgency}
            </span>
          </div>
          {advice.reason && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{advice.reason}</p>
          )}
          {advice.specialistType && (
            <p className="text-xs text-foreground font-medium">
              Recommended specialist: <span className="capitalize">{advice.specialistType}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

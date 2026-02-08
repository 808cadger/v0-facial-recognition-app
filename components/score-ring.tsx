"use client";

interface ScoreRingProps {
  score: number;
}

export function ScoreRing({ score }: ScoreRingProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    if (score >= 40) return "text-[hsl(38,92%,50%)]";
    return "text-destructive";
  };

  const getStrokeColor = () => {
    if (score >= 80) return "stroke-primary";
    if (score >= 60) return "stroke-accent";
    if (score >= 40) return "stroke-[hsl(38,92%,50%)]";
    return "stroke-destructive";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${getStrokeColor()} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
        </div>
      </div>
      <span className={`text-xs font-medium ${getScoreColor()}`}>{getLabel()}</span>
    </div>
  );
}

"use client";

import { Apple } from "lucide-react";

interface FoodCardProps {
  food: {
    food: string;
    benefit: string;
  };
}

export function FoodCard({ food }: FoodCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-card border border-border p-5">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Apple className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-card-foreground text-sm mb-1">{food.food}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{food.benefit}</p>
      </div>
    </div>
  );
}

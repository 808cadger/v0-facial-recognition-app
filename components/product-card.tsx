"use client";

import { Droplets } from "lucide-react";

interface ProductCardProps {
  product: {
    category: string;
    recommendation: string;
    ingredients: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl bg-card border border-border p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
          <Droplets className="w-4 h-4 text-accent" />
        </div>
        <h4 className="font-semibold text-card-foreground text-sm">{product.category}</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{product.recommendation}</p>
      <div className="pt-2 border-t border-border">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Key Ingredients</p>
        <p className="text-xs text-foreground font-medium">{product.ingredients}</p>
      </div>
    </div>
  );
}

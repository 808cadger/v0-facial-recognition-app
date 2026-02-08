"use client";

import type { SkinAnalysisResult } from "@/app/api/analyze/route";
import { ScoreRing } from "./score-ring";
import { IssueCard } from "./issue-card";
import { FoodCard } from "./food-card";
import { RoutineCard } from "./routine-card";
import { ProductCard } from "./product-card";
import { DoctorCard } from "./doctor-card";
import { TipsCard } from "./tips-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  result: SkinAnalysisResult;
  capturedImage: string;
  onReset: () => void;
}

export function AnalysisResults({ result, capturedImage, onReset }: AnalysisResultsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={onReset} className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          New Analysis
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-border shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={capturedImage || "/placeholder.svg"} alt="Your analyzed photo" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-1">Your Skin Analysis</h2>
          <p className="text-muted-foreground">
            Skin Type: <span className="font-semibold text-foreground capitalize">{result.skinType}</span>
          </p>
        </div>
        <ScoreRing score={result.overallScore} />
      </div>

      {/* Doctor Alert (if needed) */}
      {result.doctorAdvice.shouldVisit && (
        <div className="mb-8">
          <DoctorCard advice={result.doctorAdvice} />
        </div>
      )}

      {/* Issues */}
      <section className="mb-10" aria-labelledby="issues-heading">
        <h3 id="issues-heading" className="text-lg font-semibold text-foreground mb-4">
          Detected Issues
        </h3>
        {result.issues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground bg-card rounded-xl p-6 border border-border">
            No major skin issues detected. Your skin looks healthy!
          </p>
        )}
      </section>

      {/* Food Recommendations */}
      <section className="mb-10" aria-labelledby="food-heading">
        <h3 id="food-heading" className="text-lg font-semibold text-foreground mb-4">
          Food Recommendations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {result.foodRecommendations.map((food, i) => (
            <FoodCard key={i} food={food} />
          ))}
        </div>
      </section>

      {/* Skincare Routine */}
      <section className="mb-10" aria-labelledby="routine-heading">
        <h3 id="routine-heading" className="text-lg font-semibold text-foreground mb-4">
          Your Skincare Routine
        </h3>
        <div className="flex flex-col gap-4">
          {result.routineSteps.map((step, i) => (
            <RoutineCard key={i} step={step} />
          ))}
        </div>
      </section>

      {/* Product Suggestions */}
      <section className="mb-10" aria-labelledby="products-heading">
        <h3 id="products-heading" className="text-lg font-semibold text-foreground mb-4">
          Product Suggestions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.productSuggestions.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>

      {/* General Tips */}
      <section className="mb-10" aria-labelledby="tips-heading">
        <h3 id="tips-heading" className="text-lg font-semibold text-foreground mb-4">
          Lifestyle Tips
        </h3>
        <TipsCard tips={result.generalTips} />
      </section>

      {/* Doctor Advice (if not urgent) */}
      {!result.doctorAdvice.shouldVisit && (
        <section className="mb-10">
          <DoctorCard advice={result.doctorAdvice} />
        </section>
      )}
    </div>
  );
}

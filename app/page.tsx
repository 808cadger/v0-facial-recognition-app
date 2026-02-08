"use client";

import { useState } from "react";
import { CameraCapture } from "@/components/camera-capture";
import { AnalysisResults } from "@/components/analysis-results";
import { AnalysisLoading } from "@/components/analysis-loading";
import { Header } from "@/components/header";
import type { SkinAnalysisResult } from "@/app/api/analyze/route";

type AppState = "capture" | "analyzing" | "results" | "error";

export default function Page() {
  const [appState, setAppState] = useState<AppState>("capture");
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCapture = async (imageData: string) => {
    setCapturedImage(imageData);
    setAppState("analyzing");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
      setAppState("results");
    } catch {
      setErrorMessage("Something went wrong during analysis. Please try again.");
      setAppState("error");
    }
  };

  const handleReset = () => {
    setAppState("capture");
    setAnalysisResult(null);
    setCapturedImage(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {appState === "capture" && (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">
                Your Personalized Skin Analysis
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Take a clear selfie and get AI-powered insights about your skin health,
                personalized food recommendations, skincare routines, and more.
              </p>
            </div>
            <CameraCapture onCapture={handleCapture} isAnalyzing={false} />
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <p className="text-xs text-muted-foreground">Take a selfie</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <p className="text-xs text-muted-foreground">AI analyzes skin</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <p className="text-xs text-muted-foreground">Get your plan</p>
              </div>
            </div>
          </div>
        )}

        {appState === "analyzing" && <AnalysisLoading />}

        {appState === "results" && analysisResult && capturedImage && (
          <AnalysisResults
            result={analysisResult}
            capturedImage={capturedImage}
            onReset={handleReset}
          />
        )}

        {appState === "error" && (
          <div className="w-full max-w-md mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-destructive">!</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Analysis Failed</h3>
            <p className="text-sm text-muted-foreground mb-6">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
      <footer className="border-t border-border py-4 text-center">
        <p className="text-xs text-muted-foreground">
          GlowAI provides general skincare guidance only. Not a substitute for professional medical advice.
        </p>
      </footer>
    </div>
  );
}

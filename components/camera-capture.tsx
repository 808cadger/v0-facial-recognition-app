"use client";

import React from "react"

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, RotateCcw, ScanFace } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  isAnalyzing: boolean;
}

export function CameraCapture({ onCapture, isAnalyzing }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCapturedImage(null);
      }
    } catch {
      setCameraError("Unable to access camera. Please allow camera permissions or upload a photo instead.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  }, []);

  const takePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setCapturedImage(result);
          setIsCameraActive(false);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const retake = useCallback(() => {
    setCapturedImage(null);
    setCameraError(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden bg-card border-2 border-border">
        {!isCameraActive && !capturedImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <ScanFace className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Take a Selfie</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use your camera or upload a clear photo of your face for the best analysis results.
              </p>
            </div>
            {cameraError && (
              <p className="text-sm text-destructive text-center">{cameraError}</p>
            )}
            <div className="flex flex-col gap-3 w-full">
              <Button onClick={startCamera} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <Camera className="w-5 h-5" />
                Open Camera
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full gap-2"
                size="lg"
              >
                <Upload className="w-5 h-5" />
                Upload Photo
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Upload a photo of your face"
            />
          </div>
        )}

        {isCameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            aria-label="Camera preview"
          />
        )}

        {capturedImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={capturedImage || "/placeholder.svg"}
            alt="Your captured selfie for skin analysis"
            className="w-full h-full object-cover"
          />
        )}

        {isCameraActive && (
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-center">
            <button
              onClick={takePhoto}
              className="w-16 h-16 rounded-full bg-primary-foreground border-4 border-primary shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Take photo"
            />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {capturedImage && (
        <div className="flex gap-3 w-full max-w-md">
          <Button
            variant="outline"
            onClick={retake}
            className="flex-1 gap-2 bg-transparent"
            size="lg"
            disabled={isAnalyzing}
          >
            <RotateCcw className="w-4 h-4" />
            Retake
          </Button>
          <Button
            onClick={handleAnalyze}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ScanFace className="w-4 h-4" />
                Analyze Skin
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

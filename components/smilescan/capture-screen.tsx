"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Logo } from "./brand"
import { CameraPreview, type CaptureStatus } from "./camera-preview"
import {
  CAPTURE_STEPS,
  type CaptureStep,
  type CapturedPhoto,
} from "@/lib/smilescan-data"
import { cn } from "@/lib/utils"
import { Camera, RotateCcw, ArrowRight, ChevronLeft, Lock, Check } from "lucide-react"

export function CaptureScreen({
  step,
  captured,
  photos,
  currentIndex,
  onCapture,
  onRetake,
  onContinue,
  onBack,
}: {
  step: CaptureStep
  captured: boolean
  photos: (CapturedPhoto | null)[]
  currentIndex: number
  onCapture: () => void
  onRetake: () => void
  onContinue: () => void
  onBack: () => void
}) {
  const total = CAPTURE_STEPS.length
  const progress = (step.index / total) * 100

  // Local quality-check state. In production this is where on-device
  // blur/brightness validation would run against the captured frame.
  const [status, setStatus] = useState<CaptureStatus>("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Reset the quality state whenever we move to a different step.
    setStatus("idle")
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [step.id])

  const runQualityCheck = useCallback(() => {
    setStatus("checking")
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      // Simulate an occasional low-quality result so the retake path is real.
      const passed = Math.random() > 0.2
      if (passed) {
        setStatus("idle")
        onCapture()
      } else {
        setStatus("failed")
      }
    }, 1300)
  }, [onCapture])

  const handleRetakeCurrent = useCallback(() => {
    setStatus("idle")
    onRetake()
  }, [onRetake])

  const showCaptureButton = !captured && status === "idle"
  const showChecking = status === "checking"
  const showFailed = status === "failed"

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 sm:px-8">
        {/* Progress */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">
              Step {step.index} of {total}
            </span>
            <span className="font-medium text-muted-foreground">
              {step.title}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Instruction */}
        <div className="mb-4 rounded-2xl border border-border bg-accent/40 px-4 py-3.5">
          <p className="text-pretty text-[0.95rem] font-medium leading-relaxed text-foreground">
            {step.instruction}
          </p>
        </div>

        <CameraPreview step={step} captured={captured} status={status} />

        {/* Thumbnail strip */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {CAPTURE_STEPS.map((s, i) => {
            const done = photos[i] !== null
            const isCurrent = i === currentIndex
            const StepIcon = s.icon
            return (
              <div
                key={s.id}
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-xl border transition-colors",
                  done
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : isCurrent
                      ? "border-primary bg-accent/60 text-foreground ring-2 ring-primary/25"
                      : "border-border bg-secondary/40 text-muted-foreground",
                )}
                title={s.label}
                aria-label={`${s.label}${done ? " — captured" : isCurrent ? " — current" : ""}`}
              >
                {done ? (
                  <Check className="size-5" aria-hidden="true" />
                ) : (
                  <StepIcon className="size-5" aria-hidden="true" />
                )}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[0.6rem] font-medium text-muted-foreground">
                  {i + 1}
                </span>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="mt-8">
          {showCaptureButton && (
            <Button
              size="lg"
              className="h-14 w-full text-base"
              onClick={runQualityCheck}
            >
              <Camera className="size-5" aria-hidden="true" />
              Capture
            </Button>
          )}

          {showChecking && (
            <Button size="lg" className="h-14 w-full text-base" disabled>
              Checking image quality...
            </Button>
          )}

          {showFailed && (
            <Button
              size="lg"
              className="h-14 w-full text-base"
              onClick={runQualityCheck}
            >
              <RotateCcw className="size-4.5" aria-hidden="true" />
              Retake Photo
            </Button>
          )}

          {captured && (
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                className="h-14 flex-1 text-base"
                onClick={handleRetakeCurrent}
              >
                <RotateCcw className="size-4.5" aria-hidden="true" />
                Retake
              </Button>
              <Button
                size="lg"
                className="h-14 flex-1 text-base"
                onClick={onContinue}
              >
                {step.index === total ? "Review Photos" : "Continue"}
                <ArrowRight className="size-4.5" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Lock className="size-3.5" aria-hidden="true" />
          Photos are used only to generate your screening report.
        </p>
      </main>
    </div>
  )
}

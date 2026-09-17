"use client"

import { useCallback, useState } from "react"
import {
  CAPTURE_STEPS,
  type Screen,
  type CapturedPhoto,
} from "@/lib/smilescan-data"
import { LandingScreen } from "./landing-screen"
import { PreparationScreen } from "./preparation-screen"
import { CaptureScreen } from "./capture-screen"
import { ReviewScreen } from "./review-screen"
import { AnalysisScreen } from "./analysis-screen"
import { ReportScreen } from "./report-screen"

const emptyPhotos = (): (CapturedPhoto | null)[] =>
  CAPTURE_STEPS.map(() => null)

export function SmileScanApp() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [photos, setPhotos] = useState<(CapturedPhoto | null)[]>(emptyPhotos)
  const [captureIndex, setCaptureIndex] = useState(0)
  // When retaking a single photo from the review screen, return there after.
  const [returnToReview, setReturnToReview] = useState(false)

  const goTo = useCallback((next: Screen) => {
    setScreen(next)
    if (typeof window !== "undefined") window.scrollTo({ top: 0 })
  }, [])

  const startFlow = useCallback(() => {
    setPhotos(emptyPhotos())
    setCaptureIndex(0)
    setReturnToReview(false)
    goTo("prepare")
  }, [goTo])

  const beginCapture = useCallback(() => {
    setCaptureIndex(0)
    setReturnToReview(false)
    goTo("capture")
  }, [goTo])

  const capturePhoto = useCallback(() => {
    setPhotos((prev) => {
      const next = [...prev]
      next[captureIndex] = {
        stepId: CAPTURE_STEPS[captureIndex].id,
        capturedAt: Date.now(),
        dataUrl: null,
      }
      return next
    })
  }, [captureIndex])

  const retakeCurrent = useCallback(() => {
    setPhotos((prev) => {
      const next = [...prev]
      next[captureIndex] = null
      return next
    })
  }, [captureIndex])

  const continueCapture = useCallback(() => {
    if (returnToReview) {
      setReturnToReview(false)
      goTo("review")
      return
    }
    if (captureIndex < CAPTURE_STEPS.length - 1) {
      setCaptureIndex((i) => i + 1)
    } else {
      goTo("review")
    }
  }, [captureIndex, returnToReview, goTo])

  const captureBack = useCallback(() => {
    if (returnToReview) {
      setReturnToReview(false)
      goTo("review")
      return
    }
    if (captureIndex > 0) {
      setCaptureIndex((i) => i - 1)
    } else {
      goTo("prepare")
    }
  }, [captureIndex, returnToReview, goTo])

  const retakeOne = useCallback(
    (index: number) => {
      setCaptureIndex(index)
      setReturnToReview(true)
      setPhotos((prev) => {
        const next = [...prev]
        next[index] = null
        return next
      })
      goTo("capture")
    },
    [goTo],
  )

  const retakeAll = useCallback(() => {
    setPhotos(emptyPhotos())
    setCaptureIndex(0)
    setReturnToReview(false)
    goTo("capture")
  }, [goTo])

  const restart = useCallback(() => {
    setPhotos(emptyPhotos())
    setCaptureIndex(0)
    setReturnToReview(false)
    goTo("landing")
  }, [goTo])

  switch (screen) {
    case "landing":
      return <LandingScreen onStart={startFlow} />
    case "prepare":
      return (
        <PreparationScreen
          onAllow={beginCapture}
          onUsePhotos={beginCapture}
          onBack={() => goTo("landing")}
        />
      )
    case "capture":
      return (
        <CaptureScreen
          step={CAPTURE_STEPS[captureIndex]}
          captured={photos[captureIndex] !== null}
          photos={photos}
          currentIndex={captureIndex}
          onCapture={capturePhoto}
          onRetake={retakeCurrent}
          onContinue={continueCapture}
          onBack={captureBack}
        />
      )
    case "review":
      return (
        <ReviewScreen
          onRetakeOne={retakeOne}
          onRetakeAll={retakeAll}
          onAnalyze={() => goTo("analysis")}
          onBack={() => goTo("capture")}
        />
      )
    case "analysis":
      return <AnalysisScreen onComplete={() => goTo("report")} />
    case "report":
      return <ReportScreen onRestart={restart} />
    default:
      return <LandingScreen onStart={startFlow} />
  }
}

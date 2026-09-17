"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "./brand"
import { CAPTURE_STEPS } from "@/lib/smilescan-data"
import { RotateCcw, Sparkles, ChevronLeft, Info, Check } from "lucide-react"

export function ReviewScreen({
  onRetakeOne,
  onRetakeAll,
  onAnalyze,
  onBack,
}: {
  onRetakeOne: (index: number) => void
  onRetakeAll: () => void
  onAnalyze: () => void
  onBack: () => void
}) {
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

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-8 sm:px-8">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Review your photos
        </h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Make sure each image is clear before starting your screening.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CAPTURE_STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <li
                key={step.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[oklch(0.34_0.03_235)] to-[oklch(0.22_0.02_250)]">
                  <span className="absolute left-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-black/35 text-xs font-semibold text-white backdrop-blur-sm">
                    {index + 1}
                  </span>
                  <span className="absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center text-white/70">
                    <Icon className="size-9" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {step.label}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 shrink-0 px-2 text-xs text-primary hover:text-primary"
                    onClick={() => onRetakeOne(index)}
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                    Retake
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-5 flex items-center gap-2 rounded-xl bg-secondary/60 px-3.5 py-3 text-sm text-muted-foreground">
          <Info className="size-4 shrink-0 text-primary/80" aria-hidden="true" />
          Clear, well-lit photos help improve screening quality.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <Button
            size="lg"
            className="h-12 flex-1 text-base"
            onClick={onAnalyze}
          >
            <Sparkles className="size-4.5" aria-hidden="true" />
            Analyze My Smile
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 flex-1 text-base"
            onClick={onRetakeAll}
          >
            <RotateCcw className="size-4.5" aria-hidden="true" />
            Retake Photos
          </Button>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Logo } from "./brand"
import { CAPTURE_STEPS, ANALYSIS_MESSAGES } from "@/lib/smilescan-data"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const STEP_MS = 1400

export function AnalysisScreen({ onComplete }: { onComplete: () => void }) {
  const [activeMessage, setActiveMessage] = useState(0)

  useEffect(() => {
    if (activeMessage >= ANALYSIS_MESSAGES.length - 1) {
      const done = setTimeout(onComplete, STEP_MS)
      return () => clearTimeout(done)
    }
    const next = setTimeout(
      () => setActiveMessage((m) => m + 1),
      STEP_MS,
    )
    return () => clearTimeout(next)
  }, [activeMessage, onComplete])

  const progress = ((activeMessage + 1) / ANALYSIS_MESSAGES.length) * 100

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="mx-auto flex w-full max-w-3xl items-center px-5 py-5 sm:px-8">
        <Logo />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 pb-16 sm:px-8">
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
            <Loader2 className="size-8 animate-spin" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-balance text-2xl font-semibold tracking-tight text-foreground">
            Analyzing your smile...
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Our AI is reviewing your photos for visible patterns related to
            alignment, discoloration, and tooth wear.
          </p>
        </div>

        {/* Thumbnails */}
        <div className="mt-8 flex justify-center gap-2.5">
          {CAPTURE_STEPS.map((step, i) => {
            const Icon = step.icon
            const analyzed = i <= activeMessage
            return (
              <span
                key={step.id}
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-xl border transition-all duration-500 sm:size-14",
                  analyzed
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground/50",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {analyzed && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-2.5" aria-hidden="true" />
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* Progress + message */}
        <div className="mt-8">
          <Progress value={progress} className="h-2" />
          <div className="mt-4 flex items-center justify-center gap-2 text-center">
            <Loader2
              className="size-4 shrink-0 animate-spin text-primary"
              aria-hidden="true"
            />
            <p
              key={activeMessage}
              className="animate-in fade-in text-sm font-medium text-foreground duration-500"
            >
              {ANALYSIS_MESSAGES[activeMessage]}
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          This may take a few seconds.
        </p>
      </main>
    </div>
  )
}

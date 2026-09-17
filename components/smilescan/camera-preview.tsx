"use client"

import { cn } from "@/lib/utils"
import type { CaptureStep } from "@/lib/smilescan-data"
import { Check, Loader2, AlertTriangle } from "lucide-react"

export type CaptureStatus = "idle" | "checking" | "failed"

/**
 * Placeholder camera preview.
 *
 * This component is intentionally structured so a real camera feed can be
 * dropped in later: replace the placeholder <div> with a <video> element and
 * wire up navigator.mediaDevices.getUserMedia() in a useEffect. The guide
 * overlay, quality-check states, and captured state are already separated from
 * the feed so on-device blur/brightness validation can be added without
 * changing the layout.
 */
export function CameraPreview({
  step,
  captured,
  status = "idle",
}: {
  step: CaptureStep
  captured: boolean
  status?: CaptureStatus
}) {
  const Icon = step.icon
  const isChecking = status === "checking"
  const isFailed = status === "failed"

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-border bg-[oklch(0.22_0.02_250)] shadow-lg sm:aspect-[4/5]">
      {/* Simulated feed / captured still */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          captured
            ? "bg-gradient-to-br from-[oklch(0.32_0.03_235)] to-[oklch(0.2_0.02_250)]"
            : "bg-[radial-gradient(circle_at_50%_35%,oklch(0.34_0.03_235),oklch(0.2_0.02_250))]",
        )}
      />

      {/* Guide overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {step.guide === "oval" ? (
          <div
            className={cn(
              "h-[70%] w-[64%] rounded-[50%] border-2 border-dashed transition-colors",
              isFailed
                ? "border-[oklch(0.7_0.16_45)]"
                : captured
                  ? "border-primary/80"
                  : "border-white/45",
            )}
            aria-hidden="true"
          />
        ) : (
          <div
            className={cn(
              "h-[36%] w-[74%] rounded-[3rem] border-2 border-dashed transition-colors",
              step.guide === "upper" ? "-translate-y-6" : "translate-y-6",
              isFailed
                ? "border-[oklch(0.7_0.16_45)]"
                : captured
                  ? "border-primary/80"
                  : "border-white/45",
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Corner scan marks */}
      {!captured && !isChecking && !isFailed && (
        <>
          <span className="absolute left-5 top-5 size-6 rounded-tl-lg border-l-2 border-t-2 border-primary/70" />
          <span className="absolute right-5 top-5 size-6 rounded-tr-lg border-r-2 border-t-2 border-primary/70" />
          <span className="absolute bottom-5 left-5 size-6 rounded-bl-lg border-b-2 border-l-2 border-primary/70" />
          <span className="absolute bottom-5 right-5 size-6 rounded-br-lg border-b-2 border-r-2 border-primary/70" />
        </>
      )}

      {/* Center hint */}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 text-center text-white/70">
        {captured ? (
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Check className="size-7" aria-hidden="true" />
          </span>
        ) : (
          !isChecking &&
          !isFailed && (
            <span className="flex size-14 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
              <Icon className="size-7" aria-hidden="true" />
            </span>
          )
        )}
      </div>

      {/* Quality check overlay */}
      {isChecking && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 backdrop-blur-sm">
          <Loader2 className="size-8 animate-spin text-white" aria-hidden="true" />
          <p className="text-sm font-medium text-white" role="status">
            Checking image quality...
          </p>
        </div>
      )}

      {/* Quality check failed overlay */}
      {isFailed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 px-6 text-center backdrop-blur-sm">
          <span className="flex size-14 items-center justify-center rounded-full bg-[oklch(0.7_0.16_45)]/20 text-[oklch(0.82_0.14_55)]">
            <AlertTriangle className="size-7" aria-hidden="true" />
          </span>
          <p className="text-base font-semibold text-white" role="alert">
            Image too blurry — retake
          </p>
          <p className="text-sm text-white/80">
            Hold steady and make sure your teeth are in focus.
          </p>
        </div>
      )}

      {/* Live/captured badge */}
      <div className="absolute left-4 top-4">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
            captured
              ? "bg-primary/90 text-primary-foreground"
              : "bg-black/30 text-white/90",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              captured ? "bg-white" : "animate-pulse bg-red-400",
            )}
          />
          {captured ? "Captured" : "Camera preview"}
        </span>
      </div>
    </div>
  )
}

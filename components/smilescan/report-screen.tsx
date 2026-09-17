"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Logo, Disclaimer } from "./brand"
import {
  MOCK_REPORT,
  MOCK_CLINICS,
  REPORT_PHOTO,
  CATEGORY_LABELS,
  SEVERITY_LABELS,
  type Finding,
  type Severity,
} from "@/lib/smilescan-data"
import {
  BadgeCheck,
  CheckCircle2,
  MapPin,
  Phone,
  RotateCcw,
  Sparkles,
  AlignHorizontalDistributeCenter,
  Palette,
  Waves,
  ArrowRight,
  ChevronDown,
  Star,
  Navigation,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

const SEVERITY_STYLES: Record<Severity, string> = {
  "looks-clear":
    "border-transparent bg-[oklch(0.94_0.05_165)] text-[oklch(0.42_0.09_165)]",
  "worth-noting":
    "border-transparent bg-[oklch(0.95_0.06_85)] text-[oklch(0.48_0.1_75)]",
  "worth-discussing":
    "border-transparent bg-[oklch(0.94_0.06_45)] text-[oklch(0.5_0.13_40)]",
}

const SEVERITY_DOT: Record<Severity, string> = {
  "looks-clear": "bg-[oklch(0.62_0.12_165)]",
  "worth-noting": "bg-[oklch(0.7_0.14_80)]",
  "worth-discussing": "bg-[oklch(0.66_0.16_45)]",
}

const MARKER_COLOR: Record<Severity, string> = {
  "looks-clear": "oklch(0.62 0.12 165)",
  "worth-noting": "oklch(0.7 0.14 80)",
  "worth-discussing": "oklch(0.66 0.16 45)",
}

const CATEGORY_ICONS: Record<Finding["category"], LucideIcon> = {
  alignment: AlignHorizontalDistributeCenter,
  discoloration: Palette,
  wear: Waves,
}

function FindingCard({
  finding,
  index,
  onFindDentist,
}: {
  finding: Finding
  index: number
  onFindDentist: () => void
}) {
  const CatIcon = CATEGORY_ICONS[finding.category]
  const [open, setOpen] = useState(false)

  return (
    <li className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="flex size-6 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: MARKER_COLOR[finding.severity] }}
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <Badge
          variant="outline"
          className="gap-1.5 rounded-full border-border bg-secondary/60 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-secondary-foreground"
        >
          <CatIcon className="size-3.5 text-primary" aria-hidden="true" />
          {CATEGORY_LABELS[finding.category]}
        </Badge>
        <Badge
          className={cn(
            "gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
            SEVERITY_STYLES[finding.severity],
          )}
        >
          <span
            className={cn("size-1.5 rounded-full", SEVERITY_DOT[finding.severity])}
          />
          {SEVERITY_LABELS[finding.severity]}
        </Badge>
      </div>

      <h3 className="mt-3.5 text-base font-semibold text-foreground">
        {finding.title}
      </h3>
      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
        {finding.observation}
      </p>

      {/* What this means — expandable */}
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-2 bg-secondary/40 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-secondary/60"
        >
          What this means
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
        {open && (
          <p className="text-pretty border-t border-border px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
            {finding.whatThisMeans}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-accent/40 p-3.5">
        <Sparkles
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Suggested next step
          </p>
          <p className="mt-0.5 text-pretty text-sm leading-relaxed text-foreground">
            {finding.suggestion}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onFindDentist}
        className="mt-3 h-9 px-3 text-primary hover:bg-primary/10 hover:text-primary"
      >
        <MapPin className="size-4" aria-hidden="true" />
        Find a dentist near you
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Button>
    </li>
  )
}

function FindDentistDialog({
  open,
  onOpenChange,
  trigger,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dental clinics near you</DialogTitle>
          <DialogDescription>
            Bring your screening summary to any visit. These are example listings.
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-1 grid gap-3">
          {MOCK_CLINICS.map((clinic) => (
            <li
              key={clinic.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{clinic.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {clinic.address}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="shrink-0 gap-1 rounded-full border-border bg-secondary/50 text-[0.7rem] font-medium text-secondary-foreground"
                >
                  <Navigation className="size-3" aria-hidden="true" />
                  {clinic.distance}
                </Badge>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-sm">
                <Star
                  className="size-4 fill-[oklch(0.8_0.15_80)] text-[oklch(0.8_0.15_80)]"
                  aria-hidden="true"
                />
                <span className="font-medium text-foreground">{clinic.rating}</span>
                <span className="text-muted-foreground">
                  ({clinic.reviews} reviews)
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[oklch(0.5_0.1_165)]">
                  {clinic.availability}
                </span>
                <Button size="sm" className="h-9">
                  Book
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export function ReportScreen({ onRestart }: { onRestart: () => void }) {
  const report = MOCK_REPORT
  const [dentistOpen, setDentistOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestart}
          className="text-muted-foreground"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          New screening
        </Button>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8">
        {/* Title */}
        <div className="flex flex-col items-start gap-3">
          <Badge className="gap-1.5 rounded-full border-transparent bg-[oklch(0.94_0.05_165)] px-3 py-1 text-xs font-semibold text-[oklch(0.42_0.09_165)]">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Screening Complete
          </Badge>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your Oral Health Screening Report
          </h1>
          <p className="text-pretty text-muted-foreground">
            Based on your five smile photographs. {report.completedAt}.
          </p>
        </div>

        {/* Overall summary */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-gradient-to-br from-accent/50 to-card p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Overall impression
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {report.overallLabel}
                </p>
              </div>
            </div>
            <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-foreground">
              {report.summary}
            </p>
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              What looked good
            </p>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-1">
              {report.positives.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[oklch(0.62_0.12_165)]"
                    aria-hidden="true"
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Annotated photo */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Your smile, annotated
          </h2>
          <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
            Markers show where each observation below was noted on your front photo.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-start">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
              <Image
                src={REPORT_PHOTO || "/placeholder.svg"}
                alt="Your front smile photograph with observation markers"
                width={600}
                height={750}
                className="h-auto w-full object-cover"
              />
              {report.findings.map((finding, i) => (
                <span
                  key={finding.id}
                  className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md"
                  style={{
                    left: `${finding.marker.x}%`,
                    top: `${finding.marker.y}%`,
                    backgroundColor: MARKER_COLOR[finding.severity],
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <ul className="grid gap-2.5">
              {report.findings.map((finding, i) => (
                <li
                  key={finding.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm"
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: MARKER_COLOR[finding.severity] }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {finding.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {SEVERITY_LABELS[finding.severity]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Findings */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Areas to Review
          </h2>
          <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
            Visible characteristics worth mentioning at a routine visit. These
            are observations, not diagnoses.
          </p>
          <ul className="mt-4 grid gap-4">
            {report.findings.map((finding, i) => (
              <FindingCard
                key={finding.id}
                finding={finding}
                index={i}
                onFindDentist={() => setDentistOpen(true)}
              />
            ))}
          </ul>
        </section>

        {/* Find a dentist CTA */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.5_0.1_235)] p-6 shadow-lg sm:p-8">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-primary-foreground sm:text-2xl">
            Ready for a professional opinion?
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-primary-foreground/85">
            A dentist can review these areas in person and recommend whether any
            next steps are worthwhile. Bring this summary along to your visit.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 text-base"
              onClick={() => setDentistOpen(true)}
            >
              <MapPin className="size-4.5" aria-hidden="true" />
              Find a Dentist Near You
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setDentistOpen(true)}
            >
              <Phone className="size-4.5" aria-hidden="true" />
              Book a Consultation
            </Button>
          </div>
        </section>

        {/* Disclaimer + restart */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5">
          <Disclaimer />
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={onRestart} className="text-muted-foreground">
            <RotateCcw className="size-4" aria-hidden="true" />
            Start a new screening
          </Button>
        </div>
      </main>

      <FindDentistDialog open={dentistOpen} onOpenChange={setDentistOpen} />
    </div>
  )
}

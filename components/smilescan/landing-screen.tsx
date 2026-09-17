"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo, Disclaimer } from "./brand"
import {
  Camera,
  Sparkles,
  ClipboardCheck,
  Lock,
  Clock,
  CalendarOff,
  ArrowRight,
} from "lucide-react"

const STEPS = [
  {
    icon: Camera,
    title: "Capture",
    description: "Take five guided photos of your smile from simple angles.",
  },
  {
    icon: Sparkles,
    title: "Analyze",
    description: "AI reviews visible smile and tooth characteristics.",
  },
  {
    icon: ClipboardCheck,
    title: "Understand",
    description: "Receive a simple visual report with suggested next steps.",
  },
]

const TRUST = [
  { icon: Lock, label: "Private by design" },
  { icon: Clock, label: "Takes about 2 minutes" },
  { icon: CalendarOff, label: "No appointment required" },
]

export function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <span className="hidden text-sm font-medium text-muted-foreground sm:block">
          AI Oral Health Screening
        </span>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-8 sm:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-start">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              Free AI-powered smile screening
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Your Smile. Your First Step Towards Better Oral Health.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Capture five quick photos of your smile and get a personalized
              visual screening report in about two minutes.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="h-12 px-7 text-base" onClick={onStart}>
                Start Your Free Screening
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              No diagnosis. Just a simple way to understand when professional
              dental guidance may be worth considering.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-accent/40 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
              <Image
                src="/images/hero-scan.png"
                alt="A smartphone camera scanning a healthy smile with a soft teal scanning frame"
                width={1024}
                height={1024}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border bg-card px-6 py-4 text-sm font-medium text-foreground shadow-sm">
          {TRUST.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon className="size-4 text-primary" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            How It Works
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Three simple steps from your camera to a clear, reassuring summary.
          </p>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-muted-foreground/60">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing CTA + disclaimer */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-[oklch(0.5_0.1_235)] px-6 py-10 text-center shadow-lg sm:px-10 sm:py-12">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-primary-foreground sm:text-3xl">
            Ready to take a closer look at your smile?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-primary-foreground/85">
            It only takes about two minutes, and your photos stay private.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-7 h-12 px-7 text-base"
            onClick={onStart}
          >
            Start Your Free Screening
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <Disclaimer className="justify-center text-center" />
        </div>
      </section>
    </div>
  )
}

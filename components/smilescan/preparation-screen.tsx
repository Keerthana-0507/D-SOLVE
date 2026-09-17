"use client"

import { Button } from "@/components/ui/button"
import { Logo, Disclaimer } from "./brand"
import {
  Check,
  Sun,
  Eye,
  Smile,
  Glasses,
  Camera,
  ImageIcon,
  ChevronLeft,
} from "lucide-react"

const CHECKLIST = [
  { icon: Sun, text: "Find a well-lit area." },
  { icon: Eye, text: "Hold your phone at eye level." },
  { icon: Smile, text: "Make sure your teeth are clearly visible." },
  { icon: Glasses, text: "Remove sunglasses or anything covering your face." },
]

export function PreparationScreen({
  onAllow,
  onUsePhotos,
  onBack,
}: {
  onAllow: () => void
  onUsePhotos: () => void
  onBack: () => void
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
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

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-8 sm:px-8">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Let&apos;s get your smile ready.
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            A few quick tips to help capture clear, useful photos.
          </p>

          <ul className="mt-6 space-y-3">
            {CHECKLIST.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-3.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
                <Check
                  className="ml-auto size-5 text-primary"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3">
            <Button size="lg" className="h-12 text-base" onClick={onAllow}>
              <Camera className="size-4.5" aria-hidden="true" />
              Allow Camera Access
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 text-base"
              onClick={onUsePhotos}
            >
              <ImageIcon className="size-4.5" aria-hidden="true" />
              I&apos;ll use existing photos
            </Button>
          </div>
        </div>

        <Disclaimer className="mt-6 px-1" />
      </main>
    </div>
  )
}

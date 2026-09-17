import { ScanLine, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <ScanLine className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Smile<span className="text-primary">Scan</span>
      </span>
    </div>
  )
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-pretty text-sm leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <ShieldCheck
        className="mt-0.5 size-4 shrink-0 text-primary/70"
        aria-hidden="true"
      />
      <span>
        SmileScan is an educational screening tool and does not replace
        professional dental examination or diagnosis.
      </span>
    </p>
  )
}

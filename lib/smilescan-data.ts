import type { LucideIcon } from "lucide-react"
import {
  Smile,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ArrowUpFromLine,
  ArrowDownFromLine,
} from "lucide-react"

export type Screen =
  | "landing"
  | "prepare"
  | "capture"
  | "review"
  | "analysis"
  | "report"

export interface CaptureStep {
  id: string
  index: number
  title: string
  label: string
  instruction: string
  guide: "oval" | "wide" | "upper" | "lower"
  icon: LucideIcon
}

export const CAPTURE_STEPS: CaptureStep[] = [
  {
    id: "front-smile",
    index: 1,
    title: "Front Smile",
    label: "Front Smile",
    instruction: "Smile naturally and show your upper and lower teeth.",
    guide: "oval",
    icon: Smile,
  },
  {
    id: "left-angle",
    index: 2,
    title: "Left Angle",
    label: "Left Angle",
    instruction:
      "Turn your face slightly to the left while keeping your teeth visible.",
    guide: "oval",
    icon: ArrowLeftFromLine,
  },
  {
    id: "right-angle",
    index: 3,
    title: "Right Angle",
    label: "Right Angle",
    instruction:
      "Turn your face slightly to the right while keeping your teeth visible.",
    guide: "oval",
    icon: ArrowRightFromLine,
  },
  {
    id: "upper-teeth",
    index: 4,
    title: "Upper Teeth",
    label: "Upper Teeth",
    instruction: "Lift your upper lip slightly so your upper teeth are clearly visible.",
    guide: "upper",
    icon: ArrowUpFromLine,
  },
  {
    id: "lower-teeth",
    index: 5,
    title: "Lower Teeth",
    label: "Lower Teeth",
    instruction: "Lower your lip slightly so your lower teeth are clearly visible.",
    guide: "lower",
    icon: ArrowDownFromLine,
  },
]

export interface CapturedPhoto {
  stepId: string
  capturedAt: number
  /** Reserved for future getUserMedia() integration (data URL / blob). */
  dataUrl: string | null
}

export const ANALYSIS_MESSAGES = [
  "Reviewing image clarity...",
  "Comparing visible tooth alignment...",
  "Checking for visible discoloration patterns...",
  "Reviewing signs of visible tooth wear...",
  "Preparing your personalized report...",
]

export type FindingCategory = "alignment" | "discoloration" | "wear"

/** Neutral, non-clinical severity language. */
export type Severity = "looks-clear" | "worth-noting" | "worth-discussing"

export interface Finding {
  id: string
  category: FindingCategory
  severity: Severity
  title: string
  observation: string
  suggestion: string
  /** What this means — plain-language explanation shown in an expandable section. */
  whatThisMeans: string
  /** Position of the annotation marker on the report photo, in percentages. */
  marker: { x: number; y: number }
}

export const CATEGORY_LABELS: Record<FindingCategory, string> = {
  alignment: "Alignment",
  discoloration: "Discoloration",
  wear: "Wear",
}

export const SEVERITY_LABELS: Record<Severity, string> = {
  "looks-clear": "Looks Clear",
  "worth-noting": "Worth Noting",
  "worth-discussing": "Worth Discussing",
}

export interface ScreeningReport {
  completedAt: string
  summary: string
  overallTone: "positive" | "neutral" | "attention"
  overallLabel: string
  findings: Finding[]
  positives: string[]
}

/** Realistic mock data. Replace with API response when backend is added. */
export const MOCK_REPORT: ScreeningReport = {
  completedAt: "Screening completed just now",
  overallTone: "neutral",
  overallLabel: "Generally healthy",
  summary:
    "Your smile appears generally healthy, with a few visible areas that may be worth discussing during a routine dental visit. Nothing here is a diagnosis — it's simply a helpful starting point for a conversation with a dental professional.",
  positives: [
    "Gum line looks even across your front teeth",
    "No visible signs of significant chips or fractures",
    "Overall smile symmetry appears balanced",
  ],
  findings: [
    {
      id: "f-alignment",
      category: "alignment",
      severity: "worth-noting",
      title: "Slight crowding on lower front teeth",
      observation:
        "The lower front teeth appear slightly overlapped in your front and angled photos. This is a common and often cosmetic characteristic.",
      suggestion:
        "A dentist or orthodontist can let you know whether alignment options are worth considering for comfort or cleaning.",
      whatThisMeans:
        "Crowding happens when teeth have slightly less room than they need, so they overlap a little. It is very common and often harmless, but overlapping surfaces can be a bit harder to keep clean. A dental professional can tell you whether it's purely cosmetic in your case.",
      marker: { x: 50, y: 68 },
    },
    {
      id: "f-discoloration",
      category: "discoloration",
      severity: "worth-noting",
      title: "Surface staining on upper front teeth",
      observation:
        "Some visible surface discoloration is present on the upper front teeth, which can be related to everyday foods and drinks.",
      suggestion:
        "A routine cleaning or a conversation about whitening options may help if the appearance bothers you.",
      whatThisMeans:
        "Surface staining sits on the outside of the enamel and often comes from coffee, tea, red wine, or tobacco. It's usually cosmetic and frequently improves with a professional cleaning. Deeper discoloration is a separate matter your dentist can assess in person.",
      marker: { x: 41, y: 40 },
    },
    {
      id: "f-wear",
      category: "wear",
      severity: "looks-clear",
      title: "Minimal visible wear on biting edges",
      observation:
        "The biting edges of your upper teeth look largely intact with only minor visible wear typical of everyday use.",
      suggestion:
        "No visible concern here — your dentist can keep an eye on this during regular check-ups.",
      whatThisMeans:
        "Some wear on the biting edges is a normal part of everyday chewing. What we can see here looks minimal. If wear ever increases, it can be a sign of grinding, which a dentist can check for during a routine visit.",
      marker: { x: 62, y: 37 },
    },
  ],
}

export interface Clinic {
  id: string
  name: string
  distance: string
  rating: number
  reviews: number
  address: string
  availability: string
}

/** Mock nearby clinics for the "Find a Dentist" dialog. Replace with a real lookup later. */
export const MOCK_CLINICS: Clinic[] = [
  {
    id: "c1",
    name: "Riverside Dental Studio",
    distance: "0.8 mi",
    rating: 4.9,
    reviews: 412,
    address: "120 Harbor View Ave, Suite 4",
    availability: "Next opening: Tomorrow, 9:30 AM",
  },
  {
    id: "c2",
    name: "Bright Smile Family Dentistry",
    distance: "1.4 mi",
    rating: 4.8,
    reviews: 287,
    address: "56 Maple Street",
    availability: "Next opening: Thu, 2:00 PM",
  },
  {
    id: "c3",
    name: "Meridian Dental & Orthodontics",
    distance: "2.1 mi",
    rating: 4.7,
    reviews: 519,
    address: "900 Center Parkway, Building B",
    availability: "Next opening: Fri, 11:15 AM",
  },
]

/** Report photo used to display annotation markers over the user's smile. */
export const REPORT_PHOTO = "/images/smile-front.png"

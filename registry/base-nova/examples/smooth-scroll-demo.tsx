"use client"

import { motion, useTransform } from "motion/react"

import { ArrowUpIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { SmoothScroll, useSmoothScroll } from "@/registry/base-nova/ui/smooth-scroll"

const DAYS = [
  { day: "Monday", note: "Dentist at 9:30, then the quarterly review with finance." },
  { day: "Tuesday", note: "Groceries arrive between 6 and 7pm. Gym class at 8." },
  { day: "Wednesday", note: "Lunch with Mei near the office. Pick up dry cleaning." },
  { day: "Thursday", note: "Flight to Tokyo held until noon — confirm or release." },
  { day: "Friday", note: "Dinner booked for four at 7:30. Flowers for Mum ordered." },
  { day: "Saturday", note: "Farmers market, then nothing at all. Keep it that way." },
  { day: "Sunday", note: "Meal prep and the weekly plan. Call home in the evening." },
]

function Readout() {
  const { offset, progress, scrollTo, smooth } = useSmoothScroll()
  const px = useTransform(offset, (v) => `${Math.round(v)}px`)
  const pct = useTransform(progress, (v) => `${Math.round(v * 100)}%`)
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-linear-to-b from-muted via-muted/90 to-transparent px-4 pt-3 pb-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
        <span className="rounded-full bg-card px-2.5 py-1 shadow-chip">
          offset <motion.span className="font-medium text-foreground">{px}</motion.span>
        </span>
        <span className="rounded-full bg-card px-2.5 py-1 shadow-chip">
          progress <motion.span className="font-medium text-foreground">{pct}</motion.span>
        </span>
        <span className="hidden sm:inline">{smooth ? "eased" : "native"}</span>
      </div>
      <Button size="icon-sm" variant="secondary" aria-label="Back to top" onClick={() => scrollTo(0)}>
        <ArrowUpIcon />
      </Button>
    </div>
  )
}

export default function SmoothScrollDemo() {
  return (
    <SmoothScroll className="h-80 w-full max-w-md rounded-2xl bg-muted shadow-well" contentClassName="pb-4">
      <Readout />
      <div className="flex flex-col gap-3 px-4">
        {DAYS.map(({ day, note }) => (
          <div key={day} className="rounded-2xl bg-card bg-linear-to-b from-white/6 to-transparent p-4 shadow-raised">
            <p className="text-sm font-medium">{day}</p>
            <p className="mt-1 text-sm text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
    </SmoothScroll>
  )
}

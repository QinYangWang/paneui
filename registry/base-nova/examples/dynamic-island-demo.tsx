"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  DynamicIsland,
  DynamicIslandView,
  IslandCall,
  IslandMusic,
  IslandRide,
  IslandTimer,
} from "@/registry/base-nova/blocks/dynamic-island/dynamic-island"

const views = [
  { id: "idle", label: "Idle" },
  { id: "timer", label: "Timer" },
  { id: "music", label: "Music" },
  { id: "call", label: "Call" },
  { id: "ride", label: "Ride" },
] as const

export default function DynamicIslandDemo() {
  const [view, setView] = React.useState<string>("music")
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      {/* Tallest view (music) is ~161px; leave room for the spring overshoot and drop shadow. */}
      <div className="flex h-52 w-full items-start justify-center pt-2">
        <DynamicIsland view={view}>
          <DynamicIslandView id="timer" label="Timer, 5 minutes">
            <IslandTimer seconds={300} />
          </DynamicIslandView>
          <DynamicIslandView id="music" label="Now playing">
            <IslandMusic />
          </DynamicIslandView>
          <DynamicIslandView id="call" label="Incoming call from Mia Chen">
            <IslandCall onAccept={() => setView("timer")} onDecline={() => setView("idle")} />
          </DynamicIslandView>
          <DynamicIslandView id="ride" label="Ride arriving in 3 minutes">
            <IslandRide />
          </DynamicIslandView>
        </DynamicIsland>
      </div>
      <div role="group" aria-label="Live activity" className="inline-flex gap-1 rounded-lg bg-muted p-1 shadow-well">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "h-7 rounded-md px-3 text-xs font-medium text-muted-foreground outline-none transition-[background-color,color,box-shadow] focus-visible:ring-3 focus-visible:ring-ring",
              view === v.id
                ? "bg-card text-foreground shadow-raised"
                : "hover:text-foreground"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}

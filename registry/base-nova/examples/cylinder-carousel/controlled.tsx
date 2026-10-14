"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { CylinderCarousel } from "@/registry/base-nova/ui/cylinder-carousel"

const ROOMS = [
  { name: "Studio", price: "$120" },
  { name: "Garden room", price: "$145" },
  { name: "Loft", price: "$180" },
  { name: "Corner suite", price: "$240" },
  { name: "Penthouse", price: "$410" },
  { name: "Courtyard twin", price: "$135" },
  { name: "Attic", price: "$110" },
]

export default function CylinderCarouselControlled() {
  const [index, setIndex] = React.useState(0)
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <CylinderCarousel label="Rooms" index={index} onIndexChange={setIndex} controls={false}>
        {ROOMS.map((r) => (
          <div key={r.name} className="flex size-full flex-col justify-between bg-linear-to-br from-primary/25 to-primary/5 p-3">
            <span className="self-start rounded-full bg-card px-2 py-0.5 text-xs font-medium tabular-nums shadow-chip">{r.price}</span>
            <p className="text-sm font-medium text-foreground">{r.name}</p>
          </div>
        ))}
      </CylinderCarousel>
      <div className="flex flex-wrap justify-center gap-1.5">
        {ROOMS.map((r, i) => (
          <Button key={r.name} size="xs" variant={i === index ? "default" : "ghost"} onClick={() => setIndex(i)}>
            {r.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

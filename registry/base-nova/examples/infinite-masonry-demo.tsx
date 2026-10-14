"use client"

import * as React from "react"

import { HeartIcon } from "@/components/icons"
import { InfiniteMasonry } from "@/registry/base-nova/blocks/infinite-masonry/infinite-masonry"

type Shot = { id: number; title: string; author: string; likes: number; ratio: number; hue: number }

const titles = [
  "Morning light, Daan Park",
  "Tile study",
  "Night market neon",
  "Ceramic glaze tests",
  "Harbour fog",
  "Shop window, Dihua St",
  "Paper lanterns",
  "Riverside at dusk",
  "Tea terraces",
  "Brutalist stairwell",
  "Rain on glass",
  "Courtyard plants",
]
const authors = ["Mei Lin", "Kenji O.", "Ana Ruiz", "Tomás", "Priya S.", "Lea Kim"]
const ratios = [0.75, 1, 1.25, 1.4, 0.9, 1.6]

function makeShots(from: number, count: number): Shot[] {
  return Array.from({ length: count }, (_, k) => {
    const i = from + k
    const r = Math.sin(i * 12.9898) * 43758.5453
    const rand = r - Math.floor(r)
    return {
      id: i,
      title: titles[i % titles.length],
      author: authors[(i * 7) % authors.length],
      likes: 12 + Math.floor(rand * 480),
      ratio: ratios[(i * 5 + Math.floor(rand * 3)) % ratios.length],
      hue: Math.floor(rand * 360),
    }
  })
}

const PAGE = 18
const LIMIT = 108

export default function InfiniteMasonryDemo() {
  const [shots, setShots] = React.useState(() => makeShots(0, PAGE))
  const [loading, setLoading] = React.useState(false)

  const loadMore = React.useCallback(() => {
    setLoading(true)
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setShots((all) => [...all, ...makeShots(all.length, PAGE)])
        setLoading(false)
        resolve()
      }, 900)
    })
  }, [])

  return (
    <InfiniteMasonry
      aria-label="Inspiration feed"
      className="h-120 w-full max-w-3xl"
      items={shots}
      getItemKey={(s) => s.id}
      estimateSize={(s) => 200 * s.ratio + 56}
      hasMore={shots.length < LIMIT}
      loading={loading}
      onLoadMore={loadMore}
      minColumnWidth={170}
      endState={`All ${LIMIT} shots loaded`}
      renderItem={(s) => (
        <article className="group overflow-hidden rounded-2xl bg-card shadow-raised transition-shadow hover:shadow-raised-hover">
          <div
            className="relative w-full"
            style={{
              aspectRatio: `1 / ${s.ratio}`,
              backgroundImage: `radial-gradient(circle at 25% 20%, oklch(0.92 0.06 ${s.hue} / 0.9), transparent 55%), linear-gradient(160deg, oklch(0.72 0.13 ${s.hue}), oklch(0.5 0.15 ${(s.hue + 60) % 360}))`,
            }}
          >
            <span className="absolute top-2 left-2 rounded-full bg-black/30 px-2 text-xs leading-5 font-medium text-white backdrop-blur-sm">
              #{s.id + 1}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{s.title}</p>
              <p className="truncate text-xs text-muted-foreground">{s.author}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
              <HeartIcon size={13} />
              {s.likes}
            </span>
          </div>
        </article>
      )}
    />
  )
}

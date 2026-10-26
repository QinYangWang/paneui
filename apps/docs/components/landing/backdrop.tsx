"use client"

import * as React from "react"

import { ShaderBackground, type ShaderVariant } from "@paneui/ui/components/shader-background"
import { cn } from "@paneui/ui/lib/utils"

import { asset } from "./parts"

/**
 * What the homepage's sky panels (hero and the kinds stage) draw behind their content. `sky` is
 * the painted scenery; `image` takes any URL (with an optional dark-mode one); `shader` runs the
 * shader background with fixed colours or a random palette (repeatable with `seed`).
 */
export type LandingBackdrop =
  | { kind: "sky" }
  | { kind: "image"; src: string; srcDark?: string }
  | { kind: "shader"; shader?: ShaderVariant; palette?: string[] | "random"; seed?: string }

/** Change this one value to restyle every sky panel on the homepage. */
export const LANDING_BACKDROP: LandingBackdrop = { kind: "sky" }

/** The scenery layer: fills its positioned parent, sits behind the content. */
export function LandingBackdropLayer({ backdrop = LANDING_BACKDROP, scenery, className }: { backdrop?: LandingBackdrop; scenery?: boolean; className?: string }) {
  if (backdrop.kind === "image") {
    return (
      <div aria-hidden className={cn("absolute inset-0", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- any URL; decorative */}
        <img src={backdrop.src} alt="" className={cn("absolute inset-0 size-full object-cover", backdrop.srcDark && "dark:hidden")} />
        {backdrop.srcDark && (
          // eslint-disable-next-line @next/next/no-img-element -- any URL; decorative
          <img src={backdrop.srcDark} alt="" className="absolute inset-0 hidden size-full object-cover dark:block" />
        )}
      </div>
    )
  }
  if (backdrop.kind === "shader") {
    return (
      <ShaderBackground
        aria-hidden
        variant={backdrop.shader ?? "mesh-gradient"}
        colors={backdrop.palette ?? "random"}
        seed={backdrop.seed}
        className={cn("absolute inset-0 bg-transparent", className)}
      />
    )
  }
  if (!scenery) return null
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export; the scenery is decorative */}
      <img src={asset("hero-sky-light.webp")} alt="" className="absolute inset-0 size-full scale-110 object-cover object-bottom dark:hidden" />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export; the scenery is decorative */}
      <img src={asset("hero-sky-dark.webp")} alt="" className="absolute inset-0 hidden size-full scale-110 object-cover object-bottom dark:block" />
    </div>
  )
}

/** Clouds and the sky gradient belong to the painted sky only. */
export const isSky = (backdrop: LandingBackdrop = LANDING_BACKDROP) => backdrop.kind === "sky"

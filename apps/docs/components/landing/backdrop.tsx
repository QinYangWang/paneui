"use client"

import * as React from "react"

import { ShaderBackground, type ShaderVariant } from "@paneui/ui/components/shader-background"
import { cn } from "@paneui/ui/lib/utils"

/**
 * What the homepage's feature panels (hero and the kinds stage) draw behind their content. `image`
 * takes any URL (with an optional dark-mode one); `shader` runs the shader background with fixed
 * colours or a random palette (repeatable with `seed`).
 */
export type LandingBackdrop =
  | { kind: "image"; src: string; srcDark?: string }
  | { kind: "shader"; shader?: ShaderVariant; palette?: string[] | "random"; seed?: string }

/** Change this one value to restyle both backdrop panels on the homepage. */
export const LANDING_BACKDROP: LandingBackdrop = { kind: "shader", palette: "random" }

/** The scenery layer: fills its positioned parent, sits behind the content. */
export function LandingBackdropLayer({ backdrop = LANDING_BACKDROP, className }: { backdrop?: LandingBackdrop; className?: string }) {
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
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      <ShaderBackground
        variant={backdrop.shader ?? "mesh-gradient"}
        colors={backdrop.palette ?? "random"}
        seed={backdrop.seed}
        className="absolute inset-0 bg-transparent"
      />
      {/* Random palettes run light; dim them at night so the text keeps its contrast. */}
      <div className="absolute inset-0 hidden bg-background/65 dark:block" />
    </div>
  )
}

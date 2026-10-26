import * as React from "react"

import { cn } from "@paneui/ui/lib/utils"
import { LocaleText } from "@paneui/ui/components/locale-provider"
import { ShaderBackground, type ShaderVariant } from "@paneui/ui/components/shader-background"

/*
 * Cover artwork: an image URL, or a shader in a custom or random palette. A seed (a post slug)
 * keeps the random palette stable, so the same post always gets the same colours and
 * neighbouring posts look different.
 *
 *   <CoverArt image="/covers/launch.jpg" className="aspect-video" />
 *   <CoverArt seed="post-slug" className="aspect-video rounded-xl" />
 *   <CoverArt palette={["#ff8a3d", "#ffd36e", "#8fd3ff"]} shader="grain-gradient" className="aspect-video" />
 */

type CoverArtProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** An image URL drawn edge to edge. Wins over the shader. */
  image?: string
  /** Shader colours, or `"random"`. Defaults to random when `seed` is set, else the theme colours. */
  palette?: string[] | "random"
  /** Which shader to draw. Defaults to `"mesh-gradient"`. */
  shader?: ShaderVariant
  /** Keeps a random palette stable across renders, pages and `OgCoverArt`. */
  seed?: string
}

function CoverArt({ seed, image, palette, shader = "mesh-gradient", className, ...props }: CoverArtProps) {
  const v = image !== undefined ? "image" : "shader"
  // The built-in name comes from the locale through a hidden element, so the art itself needs no client code.
  const labelId = React.useId()
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined || props["aria-hidden"] !== undefined
  return (
    <div
      role="img"
      data-slot="cover-art"
      data-variant={v}
      className={cn("@container relative isolate overflow-hidden bg-muted", className)}
      {...props}
      aria-labelledby={props["aria-labelledby"] ?? (named ? undefined : labelId)}
    >
      {!named && (
        <span id={labelId} hidden>
          <LocaleText label="coverArt" />
        </span>
      )}
      {v === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element -- any URL, sized by the container
        <img src={image} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
      ) : (
        <ShaderBackground
          aria-hidden
          variant={shader}
          colors={palette ?? (seed !== undefined ? "random" : undefined)}
          seed={seed}
          className="absolute inset-0"
        />
      )}
    </div>
  )
}

export { CoverArt }
export type { CoverArtProps }

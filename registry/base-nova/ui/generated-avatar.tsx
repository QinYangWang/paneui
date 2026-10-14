import * as React from "react"
import { createAvatar, type HumationManifest, type PartOption } from "@humation/core"
import { humation1 } from "@humation/assets-humation-1"

import { cn } from "@/lib/utils"
import { Avatar, type AvatarShape, type AvatarSize } from "@/registry/base-nova/ui/avatar"

/*
 * Deterministic kawaii avatars: the same seed always draws the same person.
 *
 * Artwork and the seed algorithm come from Humation (MIT, https://humation.app):
 * hand-drawn black-and-white parts, chosen per slot by an FNV-1a hash of
 * `${seed}:${slot}`. On top of it this file adds the Seline-style look: a tight
 * head-and-shoulders crop and blushed cheeks, plus a `gender` filter over the
 * hair, top and bottom parts. With `gender="any"` the picks are exactly
 * Humation's own, so a seed matches the same avatar anywhere Humation is used.
 *
 * Everything is local: the SVG strings ship inside @humation/assets-humation-1,
 * nothing is fetched, and it renders on the server or the client alike.
 */

type AvatarGender = "male" | "female" | "any"
type AvatarSlot = "head" | "body" | "bottom" | "item" | "glasses"
type AvatarSelections = Partial<Record<AvatarSlot, string>>
type AvatarColors = Partial<Record<"hair" | "skin" | "stroke" | "clothes" | "bottom" | "background", string>>

type GeneratedAvatarOptions = {
  /** Any stable string: a user id, an email, a username. */
  seed: string
  /** Limits hair, tops and bottoms to one presentation. `any` keeps Humation's own picks. */
  gender?: AvatarGender
  /** Let the seed pick a head accessory (cats, hats, snacks). Off keeps the clean Seline look. */
  accessories?: boolean
  /** Pink cheeks, after Seline's logo. */
  blush?: boolean
  /** `head` is the tight head-and-shoulders crop; `body` shows the whole figure. */
  framing?: "head" | "body"
  /** `tint` (warm light grey, stays light in dark mode so black hair never vanishes), `transparent`, or a hex colour. */
  background?: "tint" | "transparent" | (string & {})
  /** Explicit part per slot (slot-scoped name such as `{ head: "bun" }` or a canonical id). Overrides the seed. */
  selections?: AvatarSelections
  /** Hex colours for Humation's recolourable slots. */
  colors?: AvatarColors
}

const manifest = humation1 as HumationManifest

// Humation 1 has no gender tags, so the split is ours. Short cuts read as male;
// everything else (bobs, long hair, buns, tails) as female. Tops and bottoms
// drop the cropped/tank/drape tops and the skirts and culottes for male.
const MALE_PARTS: Record<"head" | "body" | "bottom", readonly string[]> = {
  head: ["short", "curly-short", "short-bangs", "side-swept-short", "messy-short"],
  body: ["tee", "polo", "shirt", "jacket", "hoodie"],
  bottom: ["wide-pants", "tapered-pants", "cropped-pants"],
}
const FEMALE_EXCLUDED_HEADS = MALE_PARTS.head

const SLOT_ORDER: readonly AvatarSlot[] = ["bottom", "body", "head", "item", "glasses"]
const TINT = "#F6F5F4"
const BLUSH = "#FFBDAF"
// Cheeks sit at fixed coordinates: every Humation head shares one face position.
const BLUSH_SVG = `<g data-slot="generated-avatar-blush" fill="${BLUSH}"><ellipse cx="29.2" cy="39.4" rx="2.6" ry="1.7"/><ellipse cx="40.7" cy="39.4" rx="2.1" ry="1.6"/></g>`
const CROPS = {
  head: { x: 7, y: 0, width: 64, height: 64 },
  headWithItem: { x: 2, y: -6, width: 74, height: 74 },
  body: manifest.crops.avatar ?? { x: -4, y: -4.5, width: 88, height: 88 },
}

function fnv1a(input: string) {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash >>> 0
}

/** Parts a slot offers for a gender, in manifest order. `item` and `glasses` are shared. */
function getAvatarParts(slot: AvatarSlot, gender: AvatarGender = "any"): PartOption[] {
  const parts = manifest.parts.filter((part) => part.selectionSlot === slot && !part.deprecated)
  if (gender === "any" || slot === "item" || slot === "glasses") return parts
  if (gender === "male") return parts.filter((part) => MALE_PARTS[slot].includes(part.name ?? ""))
  if (slot === "head") return parts.filter((part) => !FEMALE_EXCLUDED_HEADS.includes(part.name ?? ""))
  return parts
}

function partBySelection(slot: AvatarSlot, value: string) {
  return manifest.parts.find(
    (part) => part.selectionSlot === slot && (part.id === value || part.name === value || part.aliases?.includes(value))
  )
}

/** Resolves the part names a seed draws, after gender, accessories and explicit selections. */
function resolveAvatarSelections({
  seed,
  gender = "any",
  accessories = false,
  selections,
}: Pick<GeneratedAvatarOptions, "seed" | "gender" | "accessories" | "selections">): Record<AvatarSlot, string> {
  const base = createAvatar(manifest, { seed }).toJSON().selections
  const resolved = {} as Record<AvatarSlot, string>
  for (const slot of SLOT_ORDER) {
    let pool = getAvatarParts(slot, gender)
    if (slot === "item") pool = pool.filter((part) => part.name !== "none")
    const seeded = manifest.parts.find((part) => part.id === base[slot])
    const pick =
      gender === "any" && slot !== "item" ? seeded : pool[fnv1a(`${seed}:${slot}`) % pool.length]
    resolved[slot] = pick?.name ?? "none"
  }
  if (!accessories) resolved.item = "none"
  for (const slot of SLOT_ORDER) {
    const value = selections?.[slot]
    const part = value ? partBySelection(slot, value) : undefined
    if (part?.name) resolved[slot] = part.name
  }
  return resolved
}

function stripSvg(svg: string) {
  return svg.replace(/<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")
}

function renderParts(selected: Record<AvatarSlot, string>, blush: boolean) {
  let markup = ""
  for (const layerSlot of [...manifest.layerSlots].sort((a, b) => a.order - b.order)) {
    if (layerSlot.hidden) continue
    for (const slot of SLOT_ORDER) {
      const part = partBySelection(slot, selected[slot])
      for (const layer of part?.layers ?? []) {
        if (layer.layerSlot !== layerSlot.id || !layer.svg) continue
        const transform = `translate(${layerSlot.offset.x}, ${layerSlot.offset.y})${layer.transform ? ` ${layer.transform}` : ""}`
        markup += `<g data-hm-part-id="${part?.id}" transform="${transform}">${stripSvg(layer.svg)}</g>`
      }
    }
    // Cheeks go on the face, under accessories and glasses.
    if (layerSlot.id === "head" && blush) markup += BLUSH_SVG
  }
  return markup
}

function normalizeHex(value: string) {
  return `#${value.replace(/^#/, "")}`
}

/**
 * Builds a generated avatar without React: the resolved part names, the inner
 * markup and viewBox for your own `<svg>`, and `toString()` for a standalone SVG
 * file (download, upload, `<img src>` via `toDataUri()`).
 */
function createGeneratedAvatar(options: GeneratedAvatarOptions) {
  const { blush = true, framing = "head", background = "tint", colors } = options
  const selections = resolveAvatarSelections(options)
  const crop =
    framing === "body" ? CROPS.body : selections.item !== "none" ? CROPS.headWithItem : CROPS.head
  const viewBox = `${crop.x} ${crop.y} ${crop.width} ${crop.height}`
  const fill =
    background === "transparent" ? null : background === "tint" ? colors?.background ?? TINT : background
  const backgroundRect = fill
    ? `<rect data-slot="generated-avatar-background" x="${crop.x}" y="${crop.y}" width="${crop.width}" height="${crop.height}" fill="var(--hm-background, ${normalizeHex(fill)})"/>`
    : ""
  const content = backgroundRect + renderParts(selections, blush)
  const style = Object.entries(colors ?? {})
    .filter(([key]) => key !== "background")
    .map(([key, value]) => `--hm-${key}:${normalizeHex(value as string)}`)
    .join(";")

  const toString = (size = 256) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}"${style ? ` style="${style}"` : ""}>${content}</svg>`

  return {
    selections,
    viewBox,
    content,
    style,
    toString,
    toDataUri: (size?: number) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(toString(size))}`,
  }
}

type GeneratedAvatarImageProps = GeneratedAvatarOptions &
  Omit<React.ComponentProps<"svg">, "children" | "dangerouslySetInnerHTML"> & {
    /** Accessible name. Without it the avatar is decorative (`aria-hidden`), right next to a visible name. */
    title?: string
  }

function useGeneratedAvatar(options: GeneratedAvatarOptions) {
  const { seed, gender, accessories, blush, framing, background, selections, colors } = options
  return React.useMemo(
    () => createGeneratedAvatar({ seed, gender, accessories, blush, framing, background, selections, colors }),
    // Objects are compared by content so inline `selections={{…}}` doesn't rebuild every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, gender, accessories, blush, framing, background, JSON.stringify(selections), JSON.stringify(colors)]
  )
}

/**
 * Just the drawing, as a bare `<svg>` that fills its box. Use it inside your own
 * frame, e.g. as the `AvatarFallback` of a photo avatar.
 */
function GeneratedAvatarImage({
  seed,
  gender,
  accessories,
  blush,
  framing,
  background,
  selections,
  colors,
  title,
  className,
  style,
  ...props
}: GeneratedAvatarImageProps) {
  const avatar = useGeneratedAvatar({ seed, gender, accessories, blush, framing, background, selections, colors })
  const cssVars = Object.fromEntries(
    Object.entries(colors ?? {})
      .filter(([key]) => key !== "background")
      .map(([key, value]) => [`--hm-${key}`, normalizeHex(value as string)])
  ) as React.CSSProperties
  return (
    <svg
      data-slot="generated-avatar"
      data-gender={gender ?? "any"}
      viewBox={avatar.viewBox}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("size-full rounded-[inherit]", className)}
      style={{ ...cssVars, ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${escapeText(title)}</title>` : "") + avatar.content }}
      {...props}
    />
  )
}

type GeneratedAvatarProps = GeneratedAvatarOptions &
  Omit<React.ComponentProps<typeof Avatar>, "size" | "render"> & {
    /** An `Avatar` size, or a pixel size for big previews. Defaults to the enclosing `AvatarGroup`'s size, else `md`. */
    size?: AvatarSize | number
    shape?: AvatarShape
    /** Accessible name. Without it the avatar is decorative (`aria-hidden`), right next to a visible name. */
    title?: string
  }

/** A deterministic avatar drawn from `seed`, inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top. */
function GeneratedAvatar({
  seed,
  gender,
  accessories,
  blush,
  framing,
  background,
  selections,
  colors,
  size,
  shape,
  title,
  className,
  style,
  children,
  ...props
}: GeneratedAvatarProps) {
  const pixelSize = typeof size === "number" ? size : undefined
  return (
    <Avatar
      size={pixelSize ? undefined : (size as AvatarSize)}
      shape={shape}
      className={className}
      style={pixelSize ? { width: pixelSize, height: pixelSize, ...style } : style}
      {...props}
    >
      <GeneratedAvatarImage
        seed={seed}
        gender={gender}
        accessories={accessories}
        blush={blush}
        framing={framing}
        background={background}
        selections={selections}
        colors={colors}
        title={title}
      />
      {children}
    </Avatar>
  )
}

function escapeText(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

export {
  GeneratedAvatar,
  GeneratedAvatarImage,
  createGeneratedAvatar,
  resolveAvatarSelections,
  getAvatarParts,
  type AvatarGender,
  type AvatarSlot,
  type AvatarSelections,
  type AvatarColors,
  type GeneratedAvatarOptions,
  type GeneratedAvatarProps,
  type GeneratedAvatarImageProps,
}

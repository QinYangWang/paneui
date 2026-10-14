import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, type AvatarShape, type AvatarSize } from "@/registry/base-nova/ui/avatar"

/*
 * Deterministic kawaii avatars, drawn in code: the same seed always draws the
 * same person. The look follows Seline's logo: a front-facing head and
 * shoulders, a solid black hair mass, a white face with a black outline, pink
 * cheeks, tiny dot eyes and a minimal mouth.
 *
 * Every part is a few hand-tuned paths on one 64×64 grid with one stroke
 * weight, so any combination stays clean from 20px to 512px. The default
 * `sketch` variant inks those paths by hand (see "Sketch variant" below);
 * `smooth` draws them as they are. Parts are picked
 * per slot by an FNV-1a hash of `${seed}:${slot}`; nothing is fetched and it
 * renders on the server or the client alike.
 *
 * Layers, back to front: background, back hair, top (shoulders), side hair
 * (long hair that falls over the shoulders), neck, face, cheeks, eyes, mouth,
 * front hair (fringe), accessory.
 */

type AvatarGender = "male" | "female" | "any"
type AvatarSlot = "hair" | "eyes" | "mouth" | "top" | "skin" | "accessory"
type AvatarSelections = Partial<Record<AvatarSlot, string>>
type AvatarColors = Partial<Record<"hair" | "stroke" | "skin" | "blush" | "background", string>>
type AvatarVariant = "sketch" | "smooth"
type AvatarDetail = "full" | "simple"

type AvatarPart = {
  /** The value for `selections` (`{ hair: "bob" }`). */
  name: string
  label: string
  /** Hair and accessories only: the presentation it belongs to. Unset parts suit everyone. */
  gender?: "male" | "female"
  /** How often a seed lands on it relative to the slot's other parts. */
  weight?: number
}

type GeneratedAvatarOptions = {
  /** Any stable string: a user id, an email, a username. */
  seed: string
  /** Limits hair (and the bow) to one presentation. `any` picks from every hairstyle. */
  gender?: AvatarGender
  /** Let the seed pick an accessory (beanie, bow, cowlick). Off keeps the clean look. */
  accessories?: boolean
  /** Pink cheeks, after Seline's logo. */
  blush?: boolean
  /**
   * `tint` fills the square with warm light grey (stays light in dark mode so black hair never
   * vanishes), `circle` draws the tint as a disc, `none` leaves it transparent, or pass a hex colour.
   */
  background?: "tint" | "circle" | "none" | "transparent" | (string & {})
  /** Explicit part per slot by name (`{ hair: "bun", eyes: "glasses" }`). Overrides the seed. */
  selections?: AvatarSelections
  /** Hex colours: hair, outline (`stroke`), skin, blush and background tint. */
  colors?: AvatarColors
  /** `sketch` inks every line by hand (seeded wobble, pen-pressure strokes); `smooth` is the clean vector look. */
  variant?: AvatarVariant
  /**
   * Sketch only. `simple` drops the hair strands and calms the wobble for small sizes (under 40px);
   * `GeneratedAvatar` picks it from `size` unless you set it.
   */
  detail?: AvatarDetail
}

const INK = "#171717"
const TINT = "#F6F5F4"
const SW = 1.6 // the one stroke weight: outlines, eyes, mouths, glasses

const SKIN_TONES: Record<string, { fill: string; blush: string }> = {
  white: { fill: "#FFFFFF", blush: "#FFBDAF" },
  porcelain: { fill: "#FFF4EC", blush: "#FFB4A3" },
  peach: { fill: "#FDE0CB", blush: "#F9A28E" },
  tan: { fill: "#E8BC97", blush: "#E68A73" },
  brown: { fill: "#B88462", blush: "#C8664F" },
  deep: { fill: "#7D533C", blush: "#A8473A" },
}

const PARTS: Record<AvatarSlot, AvatarPart[]> = {
  hair: [
    { name: "buzz", label: "Buzz", gender: "male" },
    { name: "side-part", label: "Side part", gender: "male" },
    { name: "messy", label: "Messy", gender: "male" },
    { name: "curly", label: "Curly short", gender: "male" },
    { name: "bob", label: "Bob", gender: "female" },
    { name: "long", label: "Long straight", gender: "female" },
    { name: "bun", label: "Bun", gender: "female" },
    { name: "ponytail", label: "Ponytail", gender: "female" },
    { name: "wavy", label: "Wavy", gender: "female" },
  ],
  eyes: [
    { name: "dots", label: "Dots", weight: 5 },
    { name: "happy", label: "Happy", weight: 2 },
    { name: "sleepy", label: "Sleepy", weight: 1 },
    { name: "glasses", label: "Glasses", weight: 2 },
  ],
  mouth: [
    { name: "smile", label: "Smile", weight: 3 },
    { name: "none", label: "None", weight: 2 },
    { name: "flat", label: "Flat", weight: 1 },
    { name: "open", label: "Open", weight: 1 },
    { name: "cat", label: "Cat", weight: 1 },
  ],
  top: [
    { name: "crew", label: "Crew neck" },
    { name: "turtleneck", label: "Turtleneck" },
    { name: "collar", label: "Collar" },
  ],
  // The seed never changes skin: it stays white (Seline) unless picked.
  skin: Object.keys(SKIN_TONES).map((name) => ({ name, label: name[0].toUpperCase() + name.slice(1) })),
  accessory: [
    { name: "none", label: "None" },
    { name: "beanie", label: "Beanie" },
    { name: "bow", label: "Bow", gender: "female" },
    { name: "cowlick", label: "Cowlick" },
  ],
}

const SLOTS: readonly AvatarSlot[] = ["hair", "eyes", "mouth", "top", "skin", "accessory"]

function fnv1a(input: string) {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash >>> 0
}

/** Parts a slot offers for a gender, in display order. Only hair and accessories differ by gender. */
function getAvatarParts(slot: AvatarSlot, gender: AvatarGender = "any"): AvatarPart[] {
  const parts = PARTS[slot]
  return gender === "any" ? parts : parts.filter((part) => !part.gender || part.gender === gender)
}

function pickFromSeed(seed: string, slot: AvatarSlot, parts: AvatarPart[]) {
  const total = parts.reduce((sum, part) => sum + (part.weight ?? 1), 0)
  let roll = fnv1a(`${seed}:${slot}`) % total
  for (const part of parts) {
    roll -= part.weight ?? 1
    if (roll < 0) return part.name
  }
  return parts[0].name
}

/** Resolves the part names a seed draws, after gender, accessories and explicit selections. */
function resolveAvatarSelections({
  seed,
  gender = "any",
  accessories = false,
  selections,
}: Pick<GeneratedAvatarOptions, "seed" | "gender" | "accessories" | "selections">): Record<AvatarSlot, string> {
  const resolved = {} as Record<AvatarSlot, string>
  for (const slot of SLOTS) {
    if (slot === "skin") resolved.skin = "white"
    else if (slot === "accessory")
      resolved.accessory = accessories
        ? pickFromSeed(seed, slot, getAvatarParts(slot, gender).filter((part) => part.name !== "none"))
        : "none"
    else resolved[slot] = pickFromSeed(seed, slot, getAvatarParts(slot, gender))
  }
  for (const slot of SLOTS) {
    const value = selections?.[slot]
    if (value && PARTS[slot].some((part) => part.name === value)) resolved[slot] = value
  }
  return resolved
}

/* ------------------------------------------------------------------------------------------------
 * Drawing. Face: ellipse centred (32, 30), 29 × 32. Eyes at y 31.5, x 24.5 / 39.5.
 * --------------------------------------------------------------------------------------------- */

const FACE = { cx: 32, cy: 30, rx: 14.5, ry: 16 }
const EYE_Y = 31.5
const EYE_X = [24.5, 39.5] as const

const n = (value: number) => Math.round(value * 100) / 100

/** A row of downward bumps from (x1, y) to (x2, y), for curls and wavy ends. */
function scallops(x1: number, x2: number, y: number, count: number, depth: number) {
  const step = (x2 - x1) / count
  let d = ""
  for (let i = 0; i < count; i += 1) {
    const a = x1 + step * i
    d += ` C${n(a + step * 0.1)} ${n(y + depth)} ${n(a + step * 0.9)} ${n(y + depth)} ${n(a + step)} ${n(y)}`
  }
  return d
}

/** Circles along the crown, for curly hair. */
function curls() {
  let d = ""
  for (let i = 0; i <= 8; i += 1) {
    const angle = Math.PI + (Math.PI * i) / 8
    const x = 32 + 15.2 * Math.cos(angle)
    const y = 22.5 + 12.6 * Math.sin(angle)
    const r = i === 0 || i === 8 ? 3.6 : 4.3
    d += circlePath(x, y, r)
  }
  for (const x of [22.5, 27.2, 32, 36.8, 41.5]) d += circlePath(x, 21.2, 2.7)
  return d
}

function circlePath(cx: number, cy: number, r: number) {
  return `M${n(cx - r)} ${n(cy)}a${r} ${r} 0 1 1 ${n(r * 2)} 0a${r} ${r} 0 1 1 ${n(-r * 2)} 0Z`
}

// Hair paths per layer. `back` sits behind the shoulders, `side` over them (long hair),
// `front` over the face (fringe). Filled and stroked in the hair colour with round joins,
// so every silhouette has the same soft edge.
const HAIR: Record<string, { back?: string; side?: string; front: string }> = {
  buzz: {
    front: "M17.4 31C16.4 18.2 22.6 10.2 32 10.2S47.6 18.2 46.6 31C45.4 24.6 41.8 20.4 32 20.4S18.6 24.6 17.4 31Z",
  },
  "side-part": {
    front:
      "M16.8 32C14.6 16 21.4 7.2 32.6 7.2C44 7.2 49.6 15 47.2 32C46.6 27.6 45.6 24.6 44.4 22.8C37.6 23.4 29 21.6 24.2 16.6C23 22.4 20.4 26.4 16.8 32Z",
  },
  messy: {
    front:
      "M16.8 32C15.6 23 16.6 17 19.4 13.4L17.8 10.8L23.4 10.6L24.6 4.8L29.8 8.4L33.6 4L36.8 8.4L42.6 5.8L42.8 10.8L47.4 12.2C48.6 15.6 48.6 24.4 47.2 32C46.2 26.6 44.4 23.6 41.6 22L39 24.6L37 21L32.4 23.6L30.2 20.4L25.6 23L24.6 20.4C21 22 18.6 25.6 16.8 32Z",
  },
  curly: {
    front:
      "M17.2 31C16.2 18.6 22.4 11 32 11S47.8 18.6 46.8 31C45.4 25.2 41.4 21.8 32 21.8S18.6 25.2 17.2 31Z" + curls(),
  },
  bob: {
    back: "M12.6 39C11 21 18.4 7 32 7S53 21 51.4 39C51.2 43.6 49.4 46 46 46H18C14.6 46 12.8 43.6 12.6 39Z",
    front:
      "M17.4 30C16.2 17.4 22.4 9.6 32 9.6S47.8 17.4 46.6 30C46 26.4 45.2 24 44.4 22.6C40.4 24.2 35.6 24.6 31.2 24.2L30 21.4L28.4 24C24.8 23.6 21.6 23 19.6 22.4C18.6 24.4 17.8 26.8 17.4 30Z",
  },
  long: {
    side: "M12.6 60V30C12.6 14 20.6 6.6 32 6.6S51.4 14 51.4 30V60C51.4 61.4 50.6 62 49.4 62H43.4C42.4 62 42 61.4 42 60.4V40H22V60.4C22 61.4 21.6 62 20.6 62H14.6C13.4 62 12.6 61.4 12.6 60Z",
    front:
      "M17.4 31C16 17 22.6 9.4 32 9.4S48 17 46.6 31C45.4 24.4 40.4 19.2 33 17.8L32 19.6L31 17.8C23.6 19.2 18.6 24.4 17.4 31Z",
  },
  bun: {
    back: circlePath(32, 7.4, 5.6) + "M15.4 34C14.6 20 21.2 10 32 10S49.4 20 48.6 34Z",
    front:
      "M17 31C15.8 17.6 22.4 9.8 32 9.8S48.2 17.6 47 31C46.2 26.4 44.8 23.4 43 21.8C37.2 22.4 31.4 21 27.4 17.6C25.4 22.2 21.6 26.4 17 31Z",
  },
  ponytail: {
    back: "M39 10.2C50.4 8.4 58.4 16.4 57.6 28.4C57.2 37 53.4 44 47.2 48.4C49.6 42 50.2 35 48.8 28.8C47.8 24.2 45.2 20.2 40.4 17.8Z",
    front:
      "M17 31C15.8 17.6 22.4 9.6 32 9.6S48.2 17.6 47 31C45.8 25.8 43.2 22.2 39.4 20.6C36.4 23.2 30.8 24.4 25.6 24C22.4 25.6 19 27.8 17 31Z",
  },
  wavy: {
    back: "M10 46C8.6 23 17 6.8 32 6.8S55.4 23 54 46" + scallops(54, 10, 46, 5, 5.4) + "Z",
    front:
      "M17.4 30C16.2 17.4 22.4 9.6 32 9.6S47.8 17.4 46.6 30C45.8 25.4 44 22.4 41 20.4C38.6 22.6 35.4 23.8 32 24.2C33.2 22.4 33.6 20.6 33.4 18.8C30.6 22.4 25.6 24.4 20.4 24.6C19 26.2 18 28 17.4 30Z",
  },
}

const EYES: Record<string, (ink: string) => string> = {
  dots: (ink) =>
    EYE_X.map((x) => `<ellipse cx="${x}" cy="${EYE_Y}" rx="1.55" ry="2.15" fill="${ink}"/>`).join(""),
  happy: (ink) =>
    EYE_X.map(
      (x) =>
        `<path d="M${x - 2.3} ${EYE_Y + 1}Q${x} ${EYE_Y - 2.2} ${x + 2.3} ${EYE_Y + 1}" fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round"/>`
    ).join(""),
  sleepy: (ink) =>
    EYE_X.map(
      (x) =>
        `<path d="M${x - 2.3} ${EYE_Y - 0.6}Q${x} ${EYE_Y + 2.2} ${x + 2.3} ${EYE_Y - 0.6}" fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round"/>`
    ).join(""),
  glasses: (ink) =>
    EYES.dots(ink) +
    `<g fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round">` +
    EYE_X.map((x) => `<circle cx="${x}" cy="${EYE_Y}" r="5"/>`).join("") +
    `<path d="M29.5 ${EYE_Y - 0.4}Q32 ${EYE_Y - 1.6} 34.5 ${EYE_Y - 0.4}"/></g>`,
}

const MOUTHS: Record<string, (ink: string) => string> = {
  none: () => "",
  smile: (ink) =>
    `<path d="M29.6 39.2Q32 41.6 34.4 39.2" fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round"/>`,
  flat: (ink) =>
    `<path d="M30.2 40.2H33.8" fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round"/>`,
  open: (ink) =>
    `<path d="M29.4 38.8H34.6C34.6 41.2 33.6 42.6 32 42.6S29.4 41.2 29.4 38.8Z" fill="${ink}" stroke="${ink}" stroke-width="0.8" stroke-linejoin="round"/>`,
  cat: (ink) =>
    `<path d="M28.6 39.2Q30.3 41.6 32 39.4Q33.7 41.6 35.4 39.2" fill="none" stroke="${ink}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round"/>`,
}

const SHOULDERS = "M5 66V61C5 54.2 14 49.8 25.6 49.4H38.4C50 49.8 59 54.2 59 61V66Z"

function drawTop(top: string, ink: string, skin: string) {
  const outline = `stroke="${ink}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`
  const neck = `<path d="M27.6 40V50H36.4V40" fill="${skin}" ${outline}/>`
  if (top === "turtleneck")
    return {
      body: `<path d="${SHOULDERS}" fill="${ink}" ${outline}/>`,
      neck: neck + `<rect x="26.6" y="45.6" width="10.8" height="6" rx="2" fill="${ink}" ${outline}/>`,
    }
  const shirt = `<path d="${SHOULDERS}" fill="#FFFFFF" ${outline}/>`
  if (top === "collar")
    return {
      body: shirt,
      neck:
        neck +
        `<path d="M27.6 49.2L32 54L28.4 56.6L24.6 50.2Z M36.4 49.2L32 54L35.6 56.6L39.4 50.2Z" fill="#FFFFFF" ${outline}/>`,
    }
  return { body: shirt, neck: neck + `<path d="M27.6 49.6Q32 53.2 36.4 49.6" fill="none" ${outline}/>` }
}

function drawAccessory(accessory: string, ink: string) {
  const outline = `stroke="${ink}" stroke-width="${SW}" stroke-linejoin="round"`
  if (accessory === "beanie")
    return (
      `<path d="M14.8 21C13.8 9.6 21.6 4 32 4S50.2 9.6 49.2 21Z" fill="#FFFFFF" ${outline}/>` +
      `<rect x="14.4" y="16.8" width="35.2" height="6.4" rx="3.2" fill="#FFFFFF" ${outline}/>` +
      `<path d="M21 17.6V22.4M26.6 17.4V22.6M32 17.4V22.6M37.4 17.4V22.6M43 17.6V22.4" stroke="${ink}" stroke-width="1" stroke-linecap="round"/>` +
      `<circle cx="32" cy="4" r="3.2" fill="#FFFFFF" ${outline}/>`
    )
  if (accessory === "bow")
    return (
      `<g transform="rotate(18 43.5 11.5)">` +
      `<path d="M43.5 11.5L37 7.2C35.6 6.4 34.6 7 34.6 8.6V14.4C34.6 16 35.6 16.6 37 15.8Z M43.5 11.5L50 7.2C51.4 6.4 52.4 7 52.4 8.6V14.4C52.4 16 51.4 16.6 50 15.8Z" fill="#FF9EAE" ${outline}/>` +
      `<circle cx="43.5" cy="11.5" r="2.2" fill="#FF9EAE" ${outline}/></g>`
    )
  if (accessory === "cowlick")
    return `<path d="M32.4 10.6C32.6 6.6 30.4 3.4 26.6 2.4C24.6 1.9 23.6 3.2 24.8 4.8C26.6 7.2 29.6 8.8 32.4 10.6Z" fill="${ink}" stroke="${ink}" stroke-width="${SW}" stroke-linejoin="round"/>`
  return ""
}

function renderAvatar(selected: Record<AvatarSlot, string>, blush: boolean, colors: AvatarColors | undefined) {
  const ink = colors?.stroke ? normalizeHex(colors.stroke) : INK
  const hairColor = colors?.hair ? normalizeHex(colors.hair) : ink
  const tone = SKIN_TONES[selected.skin] ?? SKIN_TONES.white
  const skin = colors?.skin ? normalizeHex(colors.skin) : tone.fill
  const cheeks = colors?.blush ? normalizeHex(colors.blush) : tone.blush
  const hair = HAIR[selected.hair] ?? HAIR.buzz
  const top = drawTop(selected.top, ink, skin)
  const hairPath = (d: string, slot: string) =>
    `<path data-slot="generated-avatar-${slot}" d="${d}" fill="${hairColor}" stroke="${hairColor}" stroke-width="${SW}" stroke-linejoin="round"/>`
  // A beanie covers the crown, so a bun would poke through it.
  const back = hair.back && !(selected.hair === "bun" && selected.accessory === "beanie") ? hair.back : undefined
  const { cx, cy, rx, ry } = FACE

  return [
    back ? hairPath(back, "hair-back") : "",
    top.body,
    hair.side ? hairPath(hair.side, "hair-side") : "",
    top.neck,
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/>`,
    blush
      ? `<g data-slot="generated-avatar-blush" fill="${cheeks}"><circle cx="22.6" cy="37.6" r="3.3"/><circle cx="41.4" cy="37.6" r="3.3"/></g>`
      : "",
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${ink}" stroke-width="${SW}"/>`,
    (EYES[selected.eyes] ?? EYES.dots)(ink),
    (MOUTHS[selected.mouth] ?? MOUTHS.none)(ink),
    hairPath(hair.front, "hair-front"),
    drawAccessory(selected.accessory, ink),
  ].join("")
}

/* ------------------------------------------------------------------------------------------------
 * Sketch variant: the same parts, inked by hand. Every path is flattened to points, given a seeded
 * low-frequency wobble, and outlines become filled brush strokes whose width follows a pen:
 * thin where it lands and lifts, a little heavier on curves. Closed outlines start at a seeded
 * point and overshoot or stop short, so nothing is a perfect loop. All randomness comes from
 * `${seed}:${part}` so the same seed draws the same SVG string on the server and the client.
 * --------------------------------------------------------------------------------------------- */

type Pt = { x: number; y: number; c?: boolean }
type Rand = () => number

/** mulberry32 seeded from the FNV-1a hash of a key. */
function rng(key: string): Rand {
  let a = fnv1a(key)
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const between = (r: Rand, a: number, b: number) => a + (b - a) * r()
const dist = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y)

/** Smooth noise in about [-1, 1] along arc length. With `period`, wavelengths snap to fit a closed loop. */
function noise1d(r: Rand, period?: number) {
  const waves = (
    [
      [17, 0.62],
      [7.5, 0.28],
      [3.4, 0.1],
    ] as const
  ).map(([length, amp]) => {
    const wave = period ? period / Math.max(1, Math.round(period / length)) : length
    return { k: (2 * Math.PI) / wave, amp, phase: r() * 2 * Math.PI }
  })
  return (s: number) => waves.reduce((sum, w) => sum + w.amp * Math.sin(w.k * s + w.phase), 0)
}

/** Flattens SVG path data (M L H V C S Q T A Z, absolute or relative) into polylines. */
function flattenPath(d: string) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? []
  const subpaths: { pts: Pt[]; closed: boolean }[] = []
  let pts: Pt[] = []
  let x = 0
  let y = 0
  let startX = 0
  let startY = 0
  let cx = 0
  let cy = 0
  let prev = ""
  let cmd = ""
  let i = 0
  const num = () => parseFloat(tokens[i++])
  const isNum = () => i < tokens.length && !/[a-zA-Z]/.test(tokens[i])
  const push = (px: number, py: number) => pts.push({ x: px, y: py })
  const finish = (closed: boolean) => {
    if (pts.length > 1) subpaths.push({ pts, closed })
    pts = []
  }
  const curve = (count: number, at: (t: number) => [number, number]) => {
    for (let k = 1; k <= count; k += 1) push(...at(k / count))
  }
  const steps = (length: number) => Math.min(48, Math.max(4, Math.ceil(length / 0.5)))

  while (i < tokens.length) {
    if (!isNum()) cmd = tokens[i++]
    const upper = cmd.toUpperCase()
    const rel = cmd !== upper
    const ox = rel ? x : 0
    const oy = rel ? y : 0
    if (upper === "Z") {
      finish(true)
      x = startX
      y = startY
      push(x, y)
      prev = "Z"
      continue
    }
    if (!isNum()) break
    switch (upper) {
      case "M":
        finish(false)
        x = ox + num()
        y = oy + num()
        startX = x
        startY = y
        push(x, y)
        cmd = rel ? "l" : "L"
        break
      case "L":
        x = ox + num()
        y = oy + num()
        push(x, y)
        break
      case "H":
        x = ox + num()
        push(x, y)
        break
      case "V":
        y = oy + num()
        push(x, y)
        break
      case "C":
      case "S": {
        let x1: number
        let y1: number
        if (upper === "C") {
          x1 = ox + num()
          y1 = oy + num()
        } else {
          x1 = prev === "C" || prev === "S" ? 2 * x - cx : x
          y1 = prev === "C" || prev === "S" ? 2 * y - cy : y
        }
        const x2 = ox + num()
        const y2 = oy + num()
        const ex = ox + num()
        const ey = oy + num()
        const x0 = x
        const y0 = y
        const length = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(x2 - x1, y2 - y1) + Math.hypot(ex - x2, ey - y2)
        curve(steps(length), (t) => {
          const u = 1 - t
          return [
            u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * ex,
            u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * ey,
          ]
        })
        cx = x2
        cy = y2
        x = ex
        y = ey
        break
      }
      case "Q":
      case "T": {
        let x1: number
        let y1: number
        if (upper === "Q") {
          x1 = ox + num()
          y1 = oy + num()
        } else {
          x1 = prev === "Q" || prev === "T" ? 2 * x - cx : x
          y1 = prev === "Q" || prev === "T" ? 2 * y - cy : y
        }
        const ex = ox + num()
        const ey = oy + num()
        const x0 = x
        const y0 = y
        curve(steps(Math.hypot(x1 - x0, y1 - y0) + Math.hypot(ex - x1, ey - y1)), (t) => {
          const u = 1 - t
          return [u * u * x0 + 2 * u * t * x1 + t * t * ex, u * u * y0 + 2 * u * t * y1 + t * t * ey]
        })
        cx = x1
        cy = y1
        x = ex
        y = ey
        break
      }
      case "A": {
        const rx = num()
        const ry = num()
        const rotation = num()
        const large = num()
        const sweep = num()
        const ex = ox + num()
        const ey = oy + num()
        arcPoints(x, y, rx, ry, rotation, large, sweep, ex, ey, push)
        x = ex
        y = ey
        break
      }
      default:
        i += 1
    }
    prev = upper
  }
  finish(false)
  return subpaths
}

function arcPoints(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  rotation: number,
  large: number,
  sweep: number,
  x2: number,
  y2: number,
  push: (x: number, y: number) => void
) {
  rx = Math.abs(rx)
  ry = Math.abs(ry)
  if (!rx || !ry) return push(x2, y2)
  const cos = Math.cos((rotation * Math.PI) / 180)
  const sin = Math.sin((rotation * Math.PI) / 180)
  const dx = (x1 - x2) / 2
  const dy = (y1 - y2) / 2
  const xp = cos * dx + sin * dy
  const yp = -sin * dx + cos * dy
  const lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry)
  if (lambda > 1) {
    rx *= Math.sqrt(lambda)
    ry *= Math.sqrt(lambda)
  }
  const top = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp
  const bottom = rx * rx * yp * yp + ry * ry * xp * xp
  const co = (large === sweep ? -1 : 1) * Math.sqrt(Math.max(0, top / bottom))
  const cxp = (co * rx * yp) / ry
  const cyp = (-co * ry * xp) / rx
  const centerX = cos * cxp - sin * cyp + (x1 + x2) / 2
  const centerY = sin * cxp + cos * cyp + (y1 + y2) / 2
  const angle = (ux: number, uy: number, vx: number, vy: number) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)
  const start = angle(1, 0, (xp - cxp) / rx, (yp - cyp) / ry)
  let delta = angle((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry)
  if (!sweep && delta > 0) delta -= 2 * Math.PI
  else if (sweep && delta < 0) delta += 2 * Math.PI
  const count = Math.max(4, Math.ceil((Math.abs(delta) * Math.max(rx, ry)) / 0.5))
  for (let k = 1; k <= count; k += 1) {
    const t = start + (delta * k) / count
    push(
      centerX + cos * rx * Math.cos(t) - sin * ry * Math.sin(t),
      centerY + sin * rx * Math.cos(t) + cos * ry * Math.sin(t)
    )
  }
}

/** Evenly spaced points along a polyline. Sharp corners (> 50°) are kept as anchors and flagged. */
function resample(input: Pt[], closed: boolean, step: number): Pt[] {
  const pts = input.filter((p, k) => k === 0 || dist(p, input[k - 1]) > 1e-3)
  if (closed && pts.length > 2 && dist(pts[0], pts[pts.length - 1]) < 1e-3) pts.pop()
  const n = pts.length
  if (n < 2) return pts
  const isCorner = (k: number) => {
    if (!closed && (k === 0 || k === n - 1)) return false
    const a = pts[(k - 1 + n) % n]
    const b = pts[k]
    const c = pts[(k + 1) % n]
    const turn = Math.abs(Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x))
    return Math.min(turn, 2 * Math.PI - turn) > (50 * Math.PI) / 180
  }
  const anchors: number[] = []
  for (let k = 0; k < n; k += 1) if (isCorner(k)) anchors.push(k)
  if (!closed) {
    if (anchors[0] !== 0) anchors.unshift(0)
    if (anchors[anchors.length - 1] !== n - 1) anchors.push(n - 1)
  } else if (!anchors.length) anchors.push(0)

  const out: Pt[] = []
  const runs = closed ? anchors.length : anchors.length - 1
  for (let a = 0; a < runs; a += 1) {
    const from = anchors[a]
    const to = closed ? anchors[(a + 1) % anchors.length] : anchors[a + 1]
    const run: Pt[] = []
    let k = from
    run.push(pts[k])
    do {
      k = (k + 1) % n
      run.push(pts[k])
    } while (k !== to)
    const lengths = [0]
    for (let j = 1; j < run.length; j += 1) lengths.push(lengths[j - 1] + dist(run[j - 1], run[j]))
    const total = lengths[lengths.length - 1]
    const count = Math.max(1, Math.round(total / step))
    out.push({ ...run[0], c: isCorner(from) })
    let j = 1
    for (let m = 1; m < count; m += 1) {
      const s = (total * m) / count
      while (j < run.length - 1 && lengths[j] < s) j += 1
      const t = (s - lengths[j - 1]) / (lengths[j] - lengths[j - 1] || 1)
      out.push({ x: run[j - 1].x + (run[j].x - run[j - 1].x) * t, y: run[j - 1].y + (run[j].y - run[j - 1].y) * t })
    }
  }
  if (!closed) out.push({ ...pts[n - 1] })
  return out
}

function normals(pts: Pt[], closed: boolean) {
  const n = pts.length
  return pts.map((_, k) => {
    const a = pts[closed ? (k - 1 + n) % n : Math.max(0, k - 1)]
    const b = pts[closed ? (k + 1) % n : Math.min(n - 1, k + 1)]
    const length = Math.hypot(b.x - a.x, b.y - a.y) || 1
    return { x: -(b.y - a.y) / length, y: (b.x - a.x) / length }
  })
}

function polylineLength(pts: Pt[]) {
  let total = 0
  for (let k = 1; k < pts.length; k += 1) total += dist(pts[k - 1], pts[k])
  return total || 1
}

function arcLengths(pts: Pt[]) {
  const s = [0]
  for (let k = 1; k < pts.length; k += 1) s.push(s[k - 1] + dist(pts[k - 1], pts[k]))
  return s
}

/** Signed area; positive is clockwise on screen, where (−ty, tx) points inward. */
function signedArea(pts: Pt[]) {
  let area = 0
  for (let k = 0; k < pts.length; k += 1) {
    const a = pts[k]
    const b = pts[(k + 1) % pts.length]
    area += a.x * b.y - b.x * a.y
  }
  return area / 2
}

/** A closed path through the points' midpoints, corners kept sharp; relative, one decimal, to stay small. */
function smoothClosed(input: Pt[]) {
  const n = input.length
  if (n < 3) return ""
  // One winding for every ring, so shapes merged into one path always union (never punch holes).
  const pts = signedArea(input) < 0 ? input.slice().reverse() : input
  // Integer twentieths: points snap to tenths and midpoints are exact halves of them, so relative
  // steps never drift and the `t` reflections below land exactly on the snapped points.
  const q = (v: number) => Math.round(v * 10) * 2
  const mids = pts.map((a, k) => [(q(a.x) + q(pts[(k + 1) % n].x)) / 2, (q(a.y) + q(pts[(k + 1) % n].y)) / 2])
  const num = (v: number) => {
    const text = String(Math.abs(v) / 20).replace(/^0\./, ".")
    return v < 0 ? `-${text}` : text
  }
  const pair = (x: number, y: number) => {
    const b = num(y)
    return num(x) + (b[0] === "-" ? "" : " ") + b
  }
  let [x, y] = mids[n - 1]
  let d = `M${pair(x, y)}`
  let last = ""
  for (let k = 0; k < n; k += 1) {
    const cx = q(pts[k].x)
    const cy = q(pts[k].y)
    const [mx, my] = mids[k]
    // Through midpoints, each control point is the reflection of the previous one, so after the
    // first `q` a run of smooth points only needs `t` and its end point.
    const cmd = pts[k].c ? "l" : last === "q" || last === "t" ? "t" : "q"
    const body =
      cmd === "l"
        ? `${pair(cx - x, cy - y)} ${pair(mx - cx, my - cy)}`
        : cmd === "t"
          ? pair(mx - x, my - y)
          : `${pair(cx - x, cy - y)} ${pair(mx - x, my - y)}`
    d += (cmd === last ? (body[0] === "-" ? "" : " ") : cmd) + body
    last = cmd
    x = mx
    y = my
  }
  return d + "z"
}

type Ink = { r: Rand; amp: number }

/** A filled shape with a wobbly, slightly brushy edge, pushed out by `outset` (half a stroke). */
function inkFill(d: string, ink: Ink, outset = 0) {
  return flattenPath(d)
    .map(({ pts }) => {
      const ring = resample(pts, true, 1.5)
      if (ring.length < 3) return ""
      const s = arcLengths(ring)
      const perimeter = s[s.length - 1] + dist(ring[ring.length - 1], ring[0])
      const amp = ink.amp * Math.min(1, perimeter / 40)
      const wobble = noise1d(ink.r, perimeter)
      const out = signedArea(ring) > 0 ? -1 : 1
      const nrm = normals(ring, true)
      return smoothClosed(
        ring.map((p, k) => {
          const offset = outset + amp * wobble(s[k]) + (ink.r() - 0.5) * amp * 0.25
          return { x: p.x + nrm[k].x * out * offset, y: p.y + nrm[k].y * out * offset, c: p.c }
        })
      )
    })
    .join("")
}

const NIB_ANGLE = (35 * Math.PI) / 180

type BrushOptions = {
  width: number
  /** Width at the start and end as a fraction of `width` (pen landing and lifting). */
  taper?: [number, number]
  /** Lateral wobble in grid units. */
  wobble?: number
}

/** A pen stroke along an open polyline, as a filled outline. */
function brushStroke(input: Pt[], ink: Ink, { width, taper = [0.35, 0.18], wobble = ink.amp }: BrushOptions) {
  let line = resample(input, false, Math.min(1.15, polylineLength(input) / 7))
  if (line.length < 2) return ""
  let s = arcLengths(line)
  const total = s[s.length - 1]
  const lateral = noise1d(ink.r)
  const pressure = noise1d(ink.r)
  const n0 = normals(line, false)
  const amp = wobble * Math.min(1, total / 6)
  line = line.map((p, k) => ({ x: p.x + n0[k].x * amp * lateral(s[k]), y: p.y + n0[k].y * amp * lateral(s[k]), c: p.c }))
  s = arcLengths(line)
  const nrm = normals(line, false)
  const ramp = Math.min(total * 0.42, width * 2.8)
  const ease = (u: number) => u * (2 - u)
  const left: Pt[] = []
  const right: Pt[] = []
  line.forEach((p, k) => {
    const into = ramp ? Math.min(1, s[k] / ramp) : 1
    const outOf = ramp ? Math.min(1, (total - s[k]) / ramp) : 1
    const a = line[Math.max(0, k - 1)]
    const b = line[Math.min(line.length - 1, k + 1)]
    const turn =
      k > 0 && k < line.length - 1
        ? Math.abs(Math.atan2(b.y - p.y, b.x - p.x) - Math.atan2(p.y - a.y, p.x - a.x)) % (2 * Math.PI)
        : 0
    const curvature = Math.min(turn, 2 * Math.PI - turn) / (dist(a, b) / 2 || 1)
    // A slightly flat nib held at 35°: strokes across it come out fuller than strokes along it.
    const nib = 0.84 + 0.3 * Math.abs(Math.sin(Math.atan2(b.y - a.y, b.x - a.x) - NIB_ANGLE))
    const w =
      width *
      nib *
      (taper[0] + (1 - taper[0]) * ease(into)) *
      (taper[1] + (1 - taper[1]) * ease(outOf)) *
      (1 + Math.min(0.28, curvature * 0.7)) *
      (1 + 0.2 * pressure(s[k]))
    left.push({ x: p.x + (nrm[k].x * w) / 2, y: p.y + (nrm[k].y * w) / 2, c: p.c })
    right.push({ x: p.x - (nrm[k].x * w) / 2, y: p.y - (nrm[k].y * w) / 2, c: p.c })
  })
  return smoothClosed(left.concat(right.reverse()))
}

/** Brush along every subpath of path data (open strokes). */
function brushPath(d: string, ink: Ink, options: BrushOptions) {
  return flattenPath(d)
    .map(({ pts, closed }) => (closed ? brushLoop(pts, ink, options) : brushStroke(pts, ink, options)))
    .join("")
}

/**
 * A closed outline drawn in one go: it starts at `start` (0–1 around the loop, seeded when unset),
 * drifts a little, and ends past or short of where it began.
 */
function brushLoop(pts: Pt[], ink: Ink, options: BrushOptions & { start?: number }) {
  const ring = resample(pts, true, 0.6)
  const n = ring.length
  if (n < 3) return ""
  const s = arcLengths(ring)
  const perimeter = s[n - 1] + dist(ring[n - 1], ring[0])
  const step = perimeter / n
  const start = Math.floor((options.start ?? ink.r()) * n) % n
  const extra = Math.round((between(ink.r, -0.08, 0.13) * Math.min(perimeter, 40)) / step)
  const drift = between(ink.r, 0.25, 0.65) * (ink.r() < 0.5 ? -1 : 1)
  const out = signedArea(ring) > 0 ? -1 : 1
  const nrm = normals(ring, true)
  const count = n + extra
  const line: Pt[] = []
  for (let k = 0; k <= count; k += 1) {
    const j = (start + k) % n
    const t = k / count
    const offset = drift * t * t * t * out
    line.push({ x: ring[j].x + nrm[j].x * offset, y: ring[j].y + nrm[j].y * offset, c: ring[j].c })
  }
  return brushStroke(line, ink, options)
}

/** An uneven blob around (cx, cy): dots, cheeks. */
function inkBlob(cx: number, cy: number, rx: number, ry: number, ink: Ink, wobble: number, tilt = 0) {
  const count = 22
  const noise = noise1d(ink.r, 2 * Math.PI * 4)
  const cos = Math.cos(tilt)
  const sin = Math.sin(tilt)
  const pts: Pt[] = []
  for (let k = 0; k < count; k += 1) {
    const t = (2 * Math.PI * k) / count
    const grow = 1 + wobble * noise(t * 4)
    const x = rx * grow * Math.cos(t)
    const y = ry * grow * Math.sin(t)
    pts.push({ x: cx + x * cos - y * sin, y: cy + x * sin + y * cos })
  }
  return smoothClosed(pts)
}

/** Shifts and slightly turns path data, for features that never land on exactly the same spot. */
function nudge(r: Rand, shift: number, turn = 0.04) {
  const dx = between(r, -shift, shift)
  const dy = between(r, -shift, shift)
  const angle = between(r, -turn, turn)
  return { dx, dy, angle }
}

function movePts(pts: Pt[], { dx, dy, angle }: { dx: number; dy: number; angle: number }, cx: number, cy: number) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return pts.map((p) => ({
    x: cx + (p.x - cx) * cos - (p.y - cy) * sin + dx,
    y: cy + (p.x - cx) * sin + (p.y - cy) * cos + dy,
    c: p.c,
  }))
}

/** One open stroke from path data, nudged around its own centre. */
function brushNudged(d: string, ink: Ink, options: BrushOptions, shift = 0.3) {
  return flattenPath(d)
    .map(({ pts }) => {
      const cx = pts.reduce((sum, p) => sum + p.x, 0) / pts.length
      const cy = pts.reduce((sum, p) => sum + p.y, 0) / pts.length
      return brushStroke(movePts(pts, nudge(ink.r, shift), cx, cy), ink, options)
    })
    .join("")
}

// Hand-drawn extras per hairstyle: `flicks` are pointed strokes in the hair colour that break up
// the silhouette (drawn base → tip), `strands` are thin sheen lines inside the mass (full detail).
const HAIR_INK: Record<string, { flicks?: string[]; strands?: string[] }> = {
  buzz: {
    flicks: ["M22.4 22.4Q22 23.6 21.4 24.6", "M30.6 20.6Q30.6 22 30 23.2", "M38.6 21.2Q39.4 22.4 40 23.6"],
    strands: ["M25 14.4Q30 12 35.6 13.2"],
  },
  "side-part": {
    flicks: ["M26 18.4Q27.4 21.4 30 22.8", "M43.6 22.6Q45 24 45.6 25.8"],
    strands: ["M26.4 11.6Q34 8.6 42.4 12.4", "M23 14.6Q20.6 18.6 19.8 23.6"],
  },
  messy: {
    flicks: ["M30.4 21Q30.2 23 29 24.6", "M37.6 21.8Q38.6 23.4 38.4 25.4"],
    strands: ["M24 15Q28 12 33.6 12.2", "M41.6 13.6Q44.4 16.6 45 20.6"],
  },
  curly: {},
  bob: {
    flicks: [
      "M14.6 42Q12.4 44.4 10.4 45.4",
      "M49.4 42Q51.6 44.4 53.6 45.4",
      "M29.6 22.4Q29.8 24.4 29 25.8",
      "M23.4 22.6Q23 24.2 22 25.4",
      "M37.4 23.4Q38.2 24.8 38.2 26.4",
    ],
    strands: ["M15.4 28Q14.4 35 15.8 41.6", "M48.6 28Q49.6 35 48.2 41.6", "M24 13.6Q30 10.8 36.4 12"],
  },
  long: {
    flicks: ["M14.6 59Q14.2 61.4 12.8 62.8", "M49.4 59Q49.8 61.4 51.2 62.8"],
    strands: ["M16.2 34Q15.2 45 16.8 57", "M47.8 34Q48.8 45 47.2 57", "M29.8 11.4Q24.8 13 21.6 18"],
  },
  bun: {
    flicks: ["M28.4 18.6Q29.8 21.4 32.4 22.4", "M44.4 22.8Q45.6 24.4 46 26.4"],
    strands: ["M29 5.6Q32 3.6 35.2 5.8", "M36 13Q41.4 14.4 44 19"],
  },
  ponytail: {
    flicks: ["M48.8 44.6Q47.6 47.8 45.4 49.6", "M27.4 23.6Q25.6 25.2 25.2 27.4"],
    strands: ["M43.6 12.6Q52.6 14.8 53.4 27", "M24.6 14.6Q30 11.8 36 12.8"],
  },
  wavy: {
    flicks: ["M32.6 21.8Q32.4 23.8 31.2 25.2", "M21.6 23.6Q20.6 25 20.4 26.8"],
    strands: ["M14.4 28Q13 35 14.8 42", "M49.6 28Q51 35 49.2 42", "M24.6 13.8Q29.6 11.4 35.4 12.4"],
  },
}

const SHIRT = "#FFFFFF"

function roundedRect(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`
}

/** A face that isn't quite an ellipse: sides, crown and chin vary a little per seed. */
function faceRing(r: Rand) {
  const { cx, cy, rx, ry } = FACE
  const left = rx + between(r, -0.5, 0.45)
  const right = rx + between(r, -0.5, 0.45)
  const top = ry + between(r, -0.3, 0.3)
  const bottom = ry + between(r, -0.35, 0.45)
  const shift = between(r, -0.35, 0.35)
  const chin = between(r, 0.02, 0.07)
  const pts: Pt[] = []
  for (let k = 0; k < 120; k += 1) {
    const t = (2 * Math.PI * k) / 120
    const c = Math.cos(t)
    const sn = Math.sin(t)
    const narrow = 1 - chin * Math.max(0, sn) ** 2
    pts.push({ x: cx + (c < 0 ? left : right) * c * narrow + shift * Math.max(0, sn), y: cy + (sn > 0 ? bottom : top) * sn })
  }
  return pts
}

function renderSketch(
  seed: string,
  selected: Record<AvatarSlot, string>,
  blush: boolean,
  colors: AvatarColors | undefined,
  detail: "full" | "simple"
) {
  const inkColor = colors?.stroke ? normalizeHex(colors.stroke) : INK
  const hairColor = colors?.hair ? normalizeHex(colors.hair) : inkColor
  const tone = SKIN_TONES[selected.skin] ?? SKIN_TONES.white
  const skin = colors?.skin ? normalizeHex(colors.skin) : tone.fill
  const cheeks = colors?.blush ? normalizeHex(colors.blush) : tone.blush
  const hair = HAIR[selected.hair] ?? HAIR.buzz
  const extras = HAIR_INK[selected.hair] ?? {}
  // Small sizes get a calmer hand and no interior strands, so 24–32px stays legible.
  const calm = detail === "simple" ? 0.6 : 1
  const ink = (part: string, amp = 0.42): Ink => ({ r: rng(`${seed}:ink:${part}`), amp: amp * calm })
  const W = detail === "simple" ? SW * 1.12 : SW
  const pen = { width: W }
  const path = (d: string, fill: string, slot?: string) =>
    d ? `<path${slot ? ` data-slot="generated-avatar-${slot}"` : ""} d="${d}" fill="${fill}"/>` : ""
  const sheen = hairColor.toLowerCase() === inkColor.toLowerCase() ? SHIRT : inkColor

  const hairMass = (d: string, slot: string) => {
    const k = ink(slot, 0.5)
    let out = inkFill(d, k, SW / 2)
    if (slot === "hair-front")
      for (const flick of extras.flicks ?? []) out += brushNudged(flick, k, { width: 2.4, taper: [1, 0.04], wobble: 0.15 }, 0.2)
    return path(out, hairColor, slot)
  }
  const strands = () =>
    detail === "full" && extras.strands
      ? path(
          extras.strands.map((d) => brushNudged(d, ink("strands", 0.3), { width: 0.8, taper: [0.15, 0.05] }, 0.25)).join(""),
          sheen,
          "hair-strands"
        )
      : ""

  // Shoulders: fill, then one pen line over the top edge (the closing edge is off canvas).
  const shoulderInk = ink("shoulders")
  const turtleneck = selected.top === "turtleneck"
  const body =
    path(inkFill(SHOULDERS, shoulderInk), turtleneck ? inkColor : SHIRT) +
    path(brushStroke(flattenPath(SHOULDERS)[0].pts, shoulderInk, { ...pen, taper: [1, 1] }), inkColor)

  // Neck: skin, and two lines that don't quite meet the face or the shoulders.
  const neckInk = ink("neck", 0.3)
  const neckSide = (x: number) =>
    `M${x + between(neckInk.r, -0.2, 0.2)} 40Q${x + between(neckInk.r, -0.45, 0.45)} 45 ${x + between(neckInk.r, -0.3, 0.3)} ${50 + between(neckInk.r, -0.9, 0.9)}`
  let neck =
    path(inkFill("M27.6 38H36.4V50.6H27.6Z", neckInk), skin) +
    path(brushPath(neckSide(27.6), neckInk, { ...pen, taper: [1, 0.3] }) + brushPath(neckSide(36.4), neckInk, { ...pen, taper: [1, 0.3] }), inkColor)
  if (turtleneck) {
    const k = ink("turtleneck", 0.3)
    neck += path(inkFill(roundedRect(26.6, 45.6, 10.8, 6, 2), k, SW / 2), inkColor)
  } else if (selected.top === "collar") {
    const k = ink("collar", 0.3)
    const wings = "M27.6 49.2L32 54L28.4 56.6L24.6 50.2Z M36.4 49.2L32 54L35.6 56.6L39.4 50.2Z"
    neck += path(inkFill(wings, k), SHIRT) + path(brushPath(wings, k, pen), inkColor)
  } else {
    neck += path(brushNudged("M27.6 49.6Q32 53.2 36.4 49.6", ink("crew", 0.3), pen, 0.25), inkColor)
  }

  // Face: one fill, one outline that starts somewhere on the jaw and overshoots or stops short.
  const faceInk = ink("face", 0.32)
  const facePts = faceRing(faceInk.r)
  const faceStart = faceInk.r() < 0.5 ? between(faceInk.r, 0.03, 0.14) : between(faceInk.r, 0.36, 0.47)
  const facePath = smoothClosed(resample(facePts, true, 1.6))

  const cheekInk = ink("blush", 0.3)
  const cheek = (x: number) =>
    inkBlob(
      x + between(cheekInk.r, -0.35, 0.35),
      37.6 + between(cheekInk.r, -0.3, 0.3),
      3.5 + between(cheekInk.r, -0.3, 0.3),
      3.05 + between(cheekInk.r, -0.25, 0.25),
      cheekInk,
      0.07,
      between(cheekInk.r, -0.3, 0.3)
    )

  return [
    hair.back && !(selected.hair === "bun" && selected.accessory === "beanie") ? hairMass(hair.back, "hair-back") : "",
    body,
    hair.side ? hairMass(hair.side, "hair-side") : "",
    neck,
    path(facePath, skin, "face"),
    blush ? path(cheek(22.6) + cheek(41.4), cheeks, "blush") : "",
    path(brushLoop(facePts, faceInk, { ...pen, start: faceStart, taper: [0.3, 0.12] }), inkColor),
    sketchEyes(selected.eyes, ink("eyes", 0.3), pen, inkColor, path),
    sketchMouth(selected.mouth, ink("mouth", 0.25), pen, inkColor, path),
    hairMass(hair.front, "hair-front"),
    strands(),
    sketchAccessory(selected.accessory, ink("accessory", 0.32), pen, inkColor, path),
  ].join("")
}

type PathFn = (d: string, fill: string, slot?: string) => string

function sketchEyes(eyes: string, k: Ink, pen: BrushOptions, color: string, path: PathFn) {
  const dot = (x: number) =>
    inkBlob(
      x + between(k.r, -0.25, 0.25),
      EYE_Y + between(k.r, -0.3, 0.3),
      1.55 * between(k.r, 0.88, 1.1),
      2.15 * between(k.r, 0.88, 1.08),
      k,
      0.08,
      between(k.r, -0.18, 0.18)
    )
  const dots = () => dot(EYE_X[0]) + dot(EYE_X[1])
  if (eyes === "happy" || eyes === "sleepy") {
    const lift = eyes === "happy" ? [1, -2.2] : [-0.6, 2.2]
    return path(
      EYE_X.map((x) =>
        brushNudged(`M${x - 2.3} ${EYE_Y + lift[0]}Q${x} ${EYE_Y + lift[1]} ${x + 2.3} ${EYE_Y + lift[0]}`, k, pen, 0.25)
      ).join(""),
      color
    )
  }
  if (eyes === "glasses")
    return path(
      dots() +
        EYE_X.map((x) => brushLoop(flattenPath(circlePath(x, EYE_Y, 5))[0].pts, k, pen)).join("") +
        brushNudged(`M29.5 ${EYE_Y - 0.4}Q32 ${EYE_Y - 1.6} 34.5 ${EYE_Y - 0.4}`, k, pen, 0.2),
      color
    )
  return path(dots(), color)
}

function sketchMouth(mouth: string, k: Ink, pen: BrushOptions, color: string, path: PathFn) {
  const strokes: Record<string, string> = {
    smile: "M29.6 39.2Q32 41.6 34.4 39.2",
    flat: "M30.1 40.2Q32 40.5 33.9 40",
    cat: "M28.6 39.2Q30.3 41.6 32 39.4Q33.7 41.6 35.4 39.2",
  }
  if (mouth === "open")
    return path(inkFill(nudgedOpenMouth(k.r), k, 0.4), color)
  return strokes[mouth] ? path(brushNudged(strokes[mouth], k, pen, 0.3), color) : ""
}

function nudgedOpenMouth(r: Rand) {
  const w = between(r, -0.3, 0.3)
  const h = between(r, -0.3, 0.4)
  return `M${29.4 - w} 38.8Q32 ${38.4 + between(r, 0, 0.5)} ${34.6 + w} 38.8C${34.6 + w} ${41.2 + h} 33.6 ${42.6 + h} 32 ${42.6 + h}S${29.4 - w} ${41.2 + h} ${29.4 - w} 38.8Z`
}

function sketchAccessory(accessory: string, k: Ink, pen: BrushOptions, color: string, path: PathFn) {
  const shape = (d: string, fill: string) => path(inkFill(d, k), fill) + path(brushPath(d, k, pen), color)
  if (accessory === "beanie")
    return (
      shape("M14.8 21C13.8 9.6 21.6 4 32 4S50.2 9.6 49.2 21Z", SHIRT) +
      shape(roundedRect(14.4, 16.8, 35.2, 6.4, 3.2), SHIRT) +
      path(
        [21, 26.6, 32, 37.4, 43].map((x) => brushNudged(`M${x} 17.8V22.2`, k, { width: 1.05, taper: [0.5, 0.3] }, 0.25)).join(""),
        color
      ) +
      shape(circlePath(32, 4, 3.2), SHIRT)
    )
  if (accessory === "bow") {
    const wings =
      "M43.5 11.5L37 7.2C35.6 6.4 34.6 7 34.6 8.6V14.4C34.6 16 35.6 16.6 37 15.8Z M43.5 11.5L50 7.2C51.4 6.4 52.4 7 52.4 8.6V14.4C52.4 16 51.4 16.6 50 15.8Z"
    return `<g transform="rotate(18 43.5 11.5)">${shape(wings, "#FF9EAE")}${shape(circlePath(43.5, 11.5, 2.2), "#FF9EAE")}</g>`
  }
  if (accessory === "cowlick")
    return path(
      inkFill("M32.4 10.6C32.6 6.6 30.4 3.4 26.6 2.4C24.6 1.9 23.6 3.2 24.8 4.8C26.6 7.2 29.6 8.8 32.4 10.6Z", k, SW / 2),
      color
    )
  return ""
}

function normalizeHex(value: string) {
  return `#${value.replace(/^#/, "")}`
}

const VIEWBOX = "0 0 64 64"

/**
 * Builds a generated avatar without React: the resolved part names, the inner
 * markup and viewBox for your own `<svg>`, and `toString()` for a standalone SVG
 * file (download, upload, `<img src>` via `toDataUri()`).
 */
function createGeneratedAvatar(options: GeneratedAvatarOptions) {
  const { seed, blush = true, background = "tint", colors, variant = "sketch", detail = "full" } = options
  const selections = resolveAvatarSelections(options)
  const tint = colors?.background ? normalizeHex(colors.background) : TINT
  const backdrop =
    background === "none" || background === "transparent"
      ? ""
      : background === "circle"
        ? `<circle data-slot="generated-avatar-background" cx="32" cy="32" r="32" fill="${tint}"/>`
        : `<rect data-slot="generated-avatar-background" width="64" height="64" fill="${background === "tint" ? tint : normalizeHex(background)}"/>`
  const content =
    backdrop +
    (variant === "smooth" ? renderAvatar(selections, blush, colors) : renderSketch(seed, selections, blush, colors, detail))
  const toString = (size = 256) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${VIEWBOX}" fill="none">${content}</svg>`

  return {
    selections,
    viewBox: VIEWBOX,
    content,
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
  const { seed, gender, accessories, blush, background, selections, colors, variant, detail } = options
  return React.useMemo(
    () => createGeneratedAvatar({ seed, gender, accessories, blush, background, selections, colors, variant, detail }),
    // Objects are compared by content so inline `selections={{…}}` doesn't rebuild every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, gender, accessories, blush, background, variant, detail, JSON.stringify(selections), JSON.stringify(colors)]
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
  background,
  selections,
  colors,
  variant,
  detail,
  title,
  className,
  ...props
}: GeneratedAvatarImageProps) {
  const avatar = useGeneratedAvatar({ seed, gender, accessories, blush, background, selections, colors, variant, detail })
  return (
    <svg
      data-slot="generated-avatar"
      data-gender={gender ?? "any"}
      data-variant={variant ?? "sketch"}
      viewBox={avatar.viewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("size-full rounded-[inherit]", className)}
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

const AVATAR_PIXELS: Record<AvatarSize, number> = { xs: 20, sm: 24, md: 32, lg: 40, xl: 48 }

/** A deterministic avatar drawn from `seed`, inside the library's `Avatar` frame. Children (e.g. `AvatarStatus`) render on top. */
function GeneratedAvatar({
  seed,
  gender,
  accessories,
  blush,
  background,
  selections,
  colors,
  variant,
  detail,
  size,
  shape,
  title,
  className,
  style,
  children,
  ...props
}: GeneratedAvatarProps) {
  const pixelSize = typeof size === "number" ? size : undefined
  // Group sizes aren't visible here; an unset size is treated as the default `md` (32px).
  const resolvedDetail = detail ?? ((pixelSize ?? AVATAR_PIXELS[(size as AvatarSize) ?? "md"] ?? 32) < 40 ? "simple" : "full")
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
        background={background}
        selections={selections}
        colors={colors}
        variant={variant}
        detail={resolvedDetail}
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
  type AvatarVariant,
  type AvatarDetail,
  type AvatarPart,
  type GeneratedAvatarOptions,
  type GeneratedAvatarProps,
  type GeneratedAvatarImageProps,
}

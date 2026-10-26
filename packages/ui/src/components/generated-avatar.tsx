import { localeLabels, type LocaleLabels } from "@paneui/ui/components/locale-provider"
import * as React from "react"
import { createAvatar } from "@dicebear/core"
import * as avatarStyle from "@dicebear/notionists"

import { cn } from "@paneui/ui/lib/utils"
import { Avatar, type AvatarShape, type AvatarSize } from "@paneui/ui/components/avatar"

/*
 * Deterministic illustrated avatars from a seed (art and renderer credits in
 * THIRD_PARTY_NOTICES.md). The same seed always draws the same person, on the
 * server and the client alike; nothing is fetched.
 *
 * On top of the renderer this file adds: a closer crop so faces read at 20–32px,
 * `gender` (hair restricted to a curated long / short list, no beard for
 * `female`), `accessories` (glasses), our own background (tint / circle / none /
 * hex), the licence <metadata> stripped, and every id inside the SVG prefixed with
 * a hash of the options so many avatars on one page never share a mask id.
 */

type AvatarGender = "male" | "female" | "any"
type AvatarSlot = "hair" | "eyes" | "brows" | "lips" | "nose" | "glasses" | "beard" | "body" | "gesture"
type AvatarSelections = Partial<Record<AvatarSlot, string>>
type AvatarColors = Partial<Record<"background", string>>

type AvatarPart = {
  /** The value for `selections` (`{ hair: "variant08" }`), or `"none"` for optional slots. */
  name: string
  label: string
  /** Hair only: the presentation it belongs to. Unset parts suit everyone. */
  gender?: "male" | "female"
}

type GeneratedAvatarOptions = {
  /** Any stable string: a user id, an email, a username. */
  seed: string
  /** Limits hair to long (`female`) or short (`male`) styles and turns beards off for `female`. `any` picks from every hairstyle. */
  gender?: AvatarGender
  /** Let the seed add glasses. Off keeps the clean look. */
  accessories?: boolean
  /**
   * `tint` fills the square with warm light grey (stays light in dark mode so the black line art
   * never vanishes), `circle` draws the tint as a disc, `none` leaves it transparent, or pass a hex colour.
   */
  background?: "tint" | "circle" | "none" | "transparent" | (string & {})
  /** Explicit part per slot by name (`{ hair: "variant08", glasses: "none" }`). Overrides the seed. */
  selections?: AvatarSelections
  /** Hex colour for the background tint. */
  colors?: AvatarColors
  /**
   * Prefix for the ids inside the SVG (clip mask, some tops). Defaults to a hash of the options;
   * `GeneratedAvatarImage` passes one from `useId` so even identical avatars on a page never share an id.
   */
  idPrefix?: string
}

const TINT = "#F6F5F4"
const NONE = "none"
const SIZE = 1744 // the drawing set's own viewBox
const VIEWBOX = `0 0 ${SIZE} ${SIZE}`
// The drawings are busts; zoom in so the face reads at 20–32px (hair, hats and shoulders still fit).
const FRAME = { scale: 135, translateY: 8 }

type StyleOptions = avatarStyle.Options
const schema = avatarStyle.schema.properties as unknown as Record<string, { default?: string[] }>
const variants = (slot: string) => schema[slot]?.default ?? []

// Hand-classified from a render of all 64 hairstyles: long / feminine vs short / masculine.
// The rest (big curls, the cap, the paper hat, the head wrap, the white swept hair) only appear with `any`.
const FEMALE_HAIR = new Set(
  [2, 4, 8, 10, 11, 23, 28, 29, 36, 37, 39, 41, 43, 45, 46, 47, 48, 57, 58, 59, 62, 63].map(variantName)
)
const MALE_HAIR = new Set(
  [1, 3, 5, 6, 7, 9, 12, 13, 15, 16, 17, 18, 19, 21, 22, 24, 25, 26, 27, 31, 32, 33, 34, 35, 38, 44, 49, 50, 51, 52, 53, 54, 55, 56, 60].map(
    variantName
  )
)
// Gestures whose hands stay inside the cropped frame.
const GESTURES = ["waveLongArms", "waveLongArm", "wavePointLongArms", "waveOkLongArms", "pointLongArm", "okLongArm", "handPhone"]
/** Slots that can be empty; `"none"` in `selections` turns them off. */
const OPTIONAL_SLOTS: AvatarSlot[] = ["glasses", "beard", "gesture"]

function variantName(n: number) {
  return `variant${String(n).padStart(2, "0")}`
}

function variantNumber(name: string) {
  return Number(name.replace("variant", ""))
}

/** Slot names in a stable, human order (01, 02, …), named sorted by their label. */
function slotVariants(slot: AvatarSlot) {
  if (slot === "gesture") return GESTURES
  return [...variants(slot)].sort((a, b) => {
    const na = variantNumber(a)
    const nb = variantNumber(b)
    if (Number.isNaN(na) || Number.isNaN(nb)) return Number.isNaN(na) ? -1 : 1
    return na - nb
  })
}

function hairGender(name: string): "male" | "female" | undefined {
  return FEMALE_HAIR.has(name) ? "female" : MALE_HAIR.has(name) ? "male" : undefined
}

function partLabel(slot: AvatarSlot, name: string, l10n: LocaleLabels) {
const HAIR_LABELS: Record<string, string> = {
  hat: l10n.cap,
  variant14: l10n.paperHat,
  variant61: l10n.headWrap,
  variant62: l10n.headscarf,
  variant63: l10n.headscarfLong,
}
const GESTURE_LABELS: Record<string, string> = {
  waveLongArms: l10n.waveBothHands,
  waveLongArm: l10n.wave,
  wavePointLongArms: l10n.waveAndPoint,
  waveOkLongArms: l10n.waveAndOK,
  pointLongArm: l10n.point,
  okLongArm: "OK",
  handPhone: l10n.phone,
}
const SLOT_LABELS: Record<AvatarSlot, string> = {
  hair: l10n.hair,
  eyes: l10n.eyes,
  brows: l10n.brows,
  lips: l10n.mouth,
  nose: l10n.nose,
  glasses: l10n.glasses,
  beard: l10n.beard,
  body: l10n.top,
  gesture: l10n.gesture,
}

  if (name === NONE) return l10n.none
  if (slot === "hair" && HAIR_LABELS[name]) return HAIR_LABELS[name]
  if (slot === "gesture") return GESTURE_LABELS[name] ?? name
  return `${SLOT_LABELS[slot]} ${variantNumber(name)}`
}

/**
 * The parts a slot offers for a gender, for building your own pickers. Only hair differs by gender
 * (and `beard` is empty for `female`). Optional slots (glasses, beard, gesture) start with `none`.
 */
function getAvatarParts(slot: AvatarSlot, gender: AvatarGender = "any", l10n: LocaleLabels = localeLabels.en): AvatarPart[] {
  if (slot === "beard" && gender === "female") return [{ name: NONE, label: l10n.none }]
  const names = slotVariants(slot).filter((name) => {
    return slot !== "hair" || gender === "any" || hairGender(name) === gender
  })
  const parts: AvatarPart[] = names.map((name) => ({
    name,
    label: partLabel(slot, name, l10n),
    ...(slot === "hair" && hairGender(name) ? { gender: hairGender(name) } : {}),
  }))
  return OPTIONAL_SLOTS.includes(slot) ? [{ name: NONE, label: l10n.none }, ...parts] : parts
}

/** Renderer options for our options. Seeded slots keep the style's own list order, so `any` draws what the style draws. */
function toRendererOptions({ seed, gender = "any", accessories = false, selections = {} }: GeneratedAvatarOptions) {
  const options: Record<string, unknown> = {
    seed,
    ...FRAME,
    clip: true,
    gestureProbability: 0,
    glassesProbability: accessories ? 30 : 0,
    beardProbability: gender === "female" ? 0 : gender === "male" ? 25 : 10,
  }
  if (gender !== "any") options.hair = variants("hair").filter((name) => hairGender(name) === gender)
  for (const slot of ["hair", "eyes", "brows", "lips", "nose", "glasses", "beard", "body", "gesture"] as AvatarSlot[]) {
    const picked = selections[slot]
    if (!picked) continue
    const optional = OPTIONAL_SLOTS.includes(slot)
    if (picked === NONE) {
      if (optional) options[`${slot}Probability`] = 0
      continue
    }
    if (!slotVariants(slot).includes(picked)) continue // unknown names fall back to the seed
    if (slot === "beard" && gender === "female") continue
    options[slot] = [picked]
    if (optional) options[`${slot}Probability`] = 100
  }
  return options as StyleOptions & Record<string, unknown>
}

function render(options: GeneratedAvatarOptions) {
  const rendererOptions = toRendererOptions(options)
  let avatar = createAvatar(avatarStyle, rendererOptions)
  let extra = avatar.toJson().extra as Record<string, unknown>
  // No seeded beard under long hair (`any` can pair them). Every pick draws once from the PRNG,
  // so turning the beard off changes nothing else.
  if (extra.beard && !options.selections?.beard && hairGender(String(extra.hair)) === "female") {
    avatar = createAvatar(avatarStyle, { ...rendererOptions, beardProbability: 0 })
    extra = avatar.toJson().extra as Record<string, unknown>
  }
  const selections = {} as Record<AvatarSlot, string>
  for (const slot of ["hair", "eyes", "brows", "lips", "nose", "glasses", "beard", "body", "gesture"] as AvatarSlot[]) {
    selections[slot] = typeof extra[slot] === "string" ? (extra[slot] as string) : NONE
  }
  return { svg: avatar.toString(), selections }
}

/** The part each slot ends up with for these options (`"none"` for an empty optional slot). */
function resolveAvatarSelections(options: GeneratedAvatarOptions): Record<AvatarSlot, string> {
  return render(options).selections
}

/** FNV-1a, base36: a short deterministic id prefix. */
function hash(value: string) {
  let h = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

/** The SVG's inner markup: no <svg> wrapper, no <metadata>, ids prefixed so avatars on one page never collide. */
function innerMarkup(svg: string, prefix: string) {
  const body = svg
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/, "")
  const ids = new Set(Array.from(body.matchAll(/\sid="([^"]+)"/g), (m) => m[1]))
  if (!ids.size) return body
  return body.replace(/(\sid="|url\(#|href="#)([^")]+)/g, (match, lead: string, id: string) =>
    ids.has(id) ? `${lead}${prefix}${id}` : match
  )
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
  const { background = "tint", colors } = options
  const { svg, selections } = render(options)
  const tint = colors?.background ? normalizeHex(colors.background) : TINT
  const backdrop =
    background === "none" || background === "transparent"
      ? ""
      : background === "circle"
        ? `<circle data-slot="generated-avatar-background" cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="${tint}"/>`
        : `<rect data-slot="generated-avatar-background" width="${SIZE}" height="${SIZE}" fill="${background === "tint" ? tint : normalizeHex(background)}"/>`
  const prefix = options.idPrefix ?? `ga${hash(JSON.stringify(toRendererOptions(options)))}-`
  const content = backdrop + innerMarkup(svg, prefix)
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
  const { seed, gender, accessories, background, selections, colors } = options
  // useId is the same on the server and the client, so the markup hydrates as rendered.
  const reactId = React.useId()
  const idPrefix = options.idPrefix ?? `ga${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-`
  return React.useMemo(
    () => createGeneratedAvatar({ seed, gender, accessories, background, selections, colors, idPrefix }),
    // Objects are compared by content so inline `selections={{…}}` doesn't rebuild every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, gender, accessories, background, idPrefix, JSON.stringify(selections), JSON.stringify(colors)]
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
  background,
  selections,
  colors,
  idPrefix,
  title,
  className,
  ...props
}: GeneratedAvatarImageProps) {
  const avatar = useGeneratedAvatar({ seed, gender, accessories, background, selections, colors, idPrefix })
  return (
    <svg
      data-slot="generated-avatar"
      data-gender={gender ?? "any"}
      viewBox={avatar.viewBox}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("size-full overflow-hidden rounded-[inherit]", className)}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${escapeText(title)}</title>` : "") + avatar.content }}
      {...props}
      aria-label={props["aria-label"] ?? title}
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
  background,
  selections,
  colors,
  idPrefix,
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
        background={background}
        selections={selections}
        colors={colors}
        idPrefix={idPrefix}
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
  type AvatarPart,
  type GeneratedAvatarOptions,
  type GeneratedAvatarProps,
  type GeneratedAvatarImageProps,
}

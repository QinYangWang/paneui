"use client"

import * as React from "react"

import { CheckIcon, CopyIcon, DownloadIcon, RefreshIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import {
  GeneratedAvatar,
  createGeneratedAvatar,
  getAvatarParts,
  type AvatarGender,
  type AvatarSelections,
  type AvatarSlot,
  type AvatarVariant,
} from "@/registry/base-nova/ui/generated-avatar"
import { Input } from "@/registry/base-nova/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

/*
 * Avatar generator: seed field with shuffle, gender and style (sketch / smooth) segmented controls, part
 * pickers (hair, eyes, mouth, top, skin, accessory) where hair only offers the
 * chosen gender's styles, a strip of seed variations, and SVG download / JSX copy. Layout is the two-layer inset card:
 * tinted frame (rounded-2xl, p-1) around a raised panel (rounded-inner = 14px).
 */

type AvatarGeneratorState = {
  seed: string
  gender: AvatarGender
  selections: AvatarSelections
  accessories: boolean
  variant: AvatarVariant
}

const GENDERS: { value: AvatarGender; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
]
const VARIANTS: { value: AvatarVariant; label: string }[] = [
  { value: "sketch", label: "Sketch" },
  { value: "smooth", label: "Smooth" },
]
const PICKERS: { slot: AvatarSlot; label: string }[] = [
  { slot: "hair", label: "Hair" },
  { slot: "eyes", label: "Eyes" },
  { slot: "mouth", label: "Mouth" },
  { slot: "top", label: "Top" },
  { slot: "skin", label: "Skin" },
  { slot: "accessory", label: "Accessory" },
]
const FROM_SEED = "__seed"
const NO_ITEM = "none"
const VARIATIONS = 6

function randomSeed() {
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return bytes[0].toString(36).slice(0, 6)
}

/** JSX for the current avatar, for the Copy code button. */
function toJsx({ seed, gender, selections, accessories, variant }: AvatarGeneratorState) {
  const attrs = [`seed="${seed.replace(/"/g, "&quot;")}"`]
  if (gender !== "any") attrs.push(`gender="${gender}"`)
  if (variant !== "sketch") attrs.push(`variant="${variant}"`)
  if (accessories) attrs.push("accessories")
  const picked = Object.entries(selections).filter(([, v]) => v)
  if (picked.length) attrs.push(`selections={{ ${picked.map(([k, v]) => `${k}: "${v}"`).join(", ")} }}`)
  return `<GeneratedAvatar ${attrs.join(" ")} />`
}

type AvatarGeneratorProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  defaultSeed?: string
  defaultGender?: AvatarGender
  defaultVariant?: AvatarVariant
  /** Called with the seed, gender and part overrides whenever they change; store this to redraw the same avatar. */
  onValueChange?: (state: AvatarGeneratorState) => void
}

function AvatarGenerator({
  className,
  defaultSeed = "qinyang",
  defaultGender = "any",
  defaultVariant = "sketch",
  onValueChange,
  ...props
}: AvatarGeneratorProps) {
  const [state, setState] = React.useState<AvatarGeneratorState>({
    seed: defaultSeed,
    gender: defaultGender,
    selections: {},
    accessories: false,
    variant: defaultVariant,
  })
  const [copied, setCopied] = React.useState(false)
  const seedId = React.useId()
  const update = (patch: Partial<AvatarGeneratorState>) => {
    const next = { ...state, ...patch }
    setState(next)
    onValueChange?.(next)
  }

  const setGender = (gender: AvatarGender) => {
    // Keep overrides that the new gender still offers; drop the rest back to the seed.
    const selections: AvatarSelections = {}
    for (const [slot, name] of Object.entries(state.selections) as [AvatarSlot, string][]) {
      if (getAvatarParts(slot, gender).some((part) => part.name === name)) selections[slot] = name
    }
    update({ gender, selections })
  }

  const setPart = (slot: AvatarSlot, value: string) => {
    const selections = { ...state.selections }
    if (slot === "accessory") {
      delete selections.accessory
      if (value === NO_ITEM) return update({ selections, accessories: false })
      if (value !== FROM_SEED) selections.accessory = value
      return update({ selections, accessories: true })
    }
    if (value === FROM_SEED || (slot === "skin" && value === "white")) delete selections[slot]
    else selections[slot] = value
    update({ selections })
  }

  const avatarOptions = {
    seed: state.seed,
    gender: state.gender,
    selections: state.selections,
    accessories: state.accessories,
    variant: state.variant,
  }
  const resolved = createGeneratedAvatar(avatarOptions).selections

  const download = () => {
    const svg = createGeneratedAvatar(avatarOptions).toString(512)
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `avatar-${state.seed || "seed"}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toJsx(state))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const accessoryValue = !state.accessories ? NO_ITEM : (state.selections.accessory ?? FROM_SEED)

  return (
    <div
      data-slot="avatar-generator"
      className={cn("frame-2xl frame-p-1 w-full max-w-2xl bg-muted shadow-raised dark:bg-background", className)}
      {...props}
    >
      <div className="grid gap-5 rounded-inner bg-card p-4 shadow-raised sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <div
            data-slot="avatar-generator-preview"
            className="flex aspect-square items-center justify-center rounded-xl bg-secondary"
          >
            <GeneratedAvatar
              {...avatarOptions}
              size={152}
              title={`Avatar for ${state.seed || "empty seed"}`}
            />
          </div>
          <div className="flex items-center justify-between gap-1" role="group" aria-label="Variations">
            {Array.from({ length: VARIATIONS }, (_, i) => {
              const seed = `${state.seed}-${i + 1}`
              return (
                <button
                  key={seed}
                  type="button"
                  aria-label={`Use seed ${seed}`}
                  onClick={() => update({ seed, selections: {} })}
                  className="cursor-pointer rounded-full outline-none transition-opacity duration-150 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <GeneratedAvatar
                    seed={seed}
                    gender={state.gender}
                    accessories={state.accessories}
                    variant={state.variant}
                    size="md"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={seedId} className="text-ui font-medium">
              Seed
            </label>
            <div className="flex gap-2">
              <Input
                id={seedId}
                value={state.seed}
                spellCheck={false}
                autoComplete="off"
                placeholder="User id, email or name"
                onChange={(event) => update({ seed: event.target.value })}
              />
              <Button
                variant="outline"
                onClick={() => update({ seed: randomSeed(), selections: {} })}
                aria-label="Shuffle seed"
              >
                <RefreshIcon />
                Shuffle
              </Button>
            </div>
            <p className="text-ui-sm text-pretty text-muted-foreground">
              The same seed always draws the same avatar.
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span id={`${seedId}-gender`} className="text-ui font-medium">
                Gender
              </span>
              <Tabs value={state.gender} onValueChange={(value) => setGender(value as AvatarGender)}>
                <TabsList aria-labelledby={`${seedId}-gender`} className="w-full">
                  {GENDERS.map((g) => (
                    <TabsTab key={g.value} value={g.value} className="flex-1">
                      {g.label}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <span id={`${seedId}-style`} className="text-ui font-medium">
                Style
              </span>
              <Tabs value={state.variant} onValueChange={(value) => update({ variant: value as AvatarVariant })}>
                <TabsList aria-labelledby={`${seedId}-style`} className="w-full">
                  {VARIANTS.map((v) => (
                    <TabsTab key={v.value} value={v.value} className="flex-1">
                      {v.label}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-3">
            {PICKERS.map(({ slot, label }) => {
              const parts = getAvatarParts(slot, state.gender)
              const items = (() => {
                // Skin is never seeded: it stays white unless picked.
                if (slot === "skin") return parts.map((part) => ({ value: part.name, label: part.label }))
                const seedPart = parts.find((part) => part.name === resolved[slot])
                return [
                  ...(slot === "accessory" ? [{ value: NO_ITEM, label: "None" }] : []),
                  { value: FROM_SEED, label: slot === "accessory" ? "Random" : `Seed · ${seedPart?.label ?? "None"}` },
                  ...parts
                    .filter((part) => slot !== "accessory" || part.name !== NO_ITEM)
                    .map((part) => ({ value: part.name, label: part.label })),
                ]
              })()
              const value =
                slot === "accessory"
                  ? accessoryValue
                  : slot === "skin"
                    ? (state.selections.skin ?? "white")
                    : (state.selections[slot] ?? FROM_SEED)
              return (
                <div key={slot} className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-ui-sm text-muted-foreground">{label}</span>
                  <Select items={items} value={value} onValueChange={(v) => setPart(slot, String(v))}>
                    <SelectTrigger size="sm" aria-label={label} className="min-w-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            })}
          </div>

          <div className="mt-auto flex flex-wrap justify-end gap-2 pt-1">
            <Button variant="outline" onClick={download}>
              <DownloadIcon />
              Download SVG
            </Button>
            <Button onClick={copy} aria-live="polite">
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied" : "Copy code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AvatarGenerator, type AvatarGeneratorProps, type AvatarGeneratorState }

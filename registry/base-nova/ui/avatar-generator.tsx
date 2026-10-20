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
} from "@/registry/base-nova/ui/generated-avatar"
import { Input } from "@/registry/base-nova/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { Tabs, TabsList, TabsTab } from "@/registry/base-nova/ui/tabs"

/*
 * Avatar generator for the illustrated avatars: seed field with
 * shuffle, a gender segmented control, part pickers (hair, eyes, brows, mouth, glasses, beard, top,
 * gesture) where hair only offers the chosen gender's styles, a strip of seed variations, and SVG
 * download / JSX copy. Layout is the two-layer inset card: tinted frame (rounded-2xl, p-1) around a
 * raised panel (rounded-inner = 14px).
 *
 * The layout follows the generator's own width (container queries), not the viewport, so it holds up
 * in a narrow card on a wide screen: stacked below 36rem, preview beside the controls from there.
 * Inside the controls, the part pickers are label-beside rows until 18rem, then two-up with the label on top;
 * the actions stretch to fill until 24rem.
 */

type AvatarGeneratorState = {
  seed: string
  gender: AvatarGender
  selections: AvatarSelections
  accessories: boolean
}

const GENDERS: { value: AvatarGender; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
]
const PICKERS: { slot: AvatarSlot; label: string }[] = [
  { slot: "hair", label: "Hair" },
  { slot: "eyes", label: "Eyes" },
  { slot: "brows", label: "Brows" },
  { slot: "lips", label: "Mouth" },
  { slot: "glasses", label: "Glasses" },
  { slot: "beard", label: "Beard" },
  { slot: "body", label: "Top" },
  { slot: "gesture", label: "Gesture" },
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
function toJsx({ seed, gender, selections, accessories }: AvatarGeneratorState) {
  const attrs = [`seed="${seed.replace(/"/g, "&quot;")}"`]
  if (gender !== "any") attrs.push(`gender="${gender}"`)
  if (accessories) attrs.push("accessories")
  const picked = Object.entries(selections).filter(([, v]) => v)
  if (picked.length) attrs.push(`selections={{ ${picked.map(([k, v]) => `${k}: "${v}"`).join(", ")} }}`)
  return `<GeneratedAvatar ${attrs.join(" ")} />`
}

type AvatarGeneratorProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  defaultSeed?: string
  defaultGender?: AvatarGender
  /** Called with the seed, gender and part overrides whenever they change; store this to redraw the same avatar. */
  onValueChange?: (state: AvatarGeneratorState) => void
}

function AvatarGenerator({
  className,
  defaultSeed = "paneui",
  defaultGender = "any",
  onValueChange,
  ...props
}: AvatarGeneratorProps) {
  const [state, setState] = React.useState<AvatarGeneratorState>({
    seed: defaultSeed,
    gender: defaultGender,
    selections: {},
    accessories: false,
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
    if (slot === "glasses") {
      // Glasses: None, Random (the seed decides, via `accessories`) or a pinned pair.
      delete selections.glasses
      if (value === NO_ITEM) return update({ selections, accessories: false })
      if (value !== FROM_SEED) selections.glasses = value
      return update({ selections, accessories: true })
    }
    if (value === FROM_SEED) delete selections[slot]
    else selections[slot] = value
    update({ selections })
  }

  const avatarOptions = {
    seed: state.seed,
    gender: state.gender,
    selections: state.selections,
    accessories: state.accessories,
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

  const glassesValue = !state.accessories ? NO_ITEM : (state.selections.glasses ?? FROM_SEED)

  return (
    <div
      data-slot="avatar-generator"
      className={cn("@container/avatar-generator frame-2xl frame-p-1 w-full max-w-2xl bg-muted shadow-raised dark:bg-background", className)}
      {...props}
    >
      <div className="grid gap-5 rounded-inner bg-card p-4 shadow-raised @xl/avatar-generator:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] @2xl/avatar-generator:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <div
            data-slot="avatar-generator-preview"
            className="flex h-44 items-center justify-center rounded-xl bg-secondary @xl/avatar-generator:aspect-square @xl/avatar-generator:h-auto"
          >
            <GeneratedAvatar
              {...avatarOptions}
              size={152}
              title={`Avatar for ${state.seed || "empty seed"}`}
            />
          </div>
          <div
            className="flex items-center justify-center gap-2 @xl/avatar-generator:justify-between @xl/avatar-generator:gap-0"
            role="group"
            aria-label="Variations"
          >
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
                    size="md"
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="@container/avatar-generator-controls flex min-w-0 flex-col gap-4">
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
                <RefreshIcon data-icon="inline-start" />
                Shuffle
              </Button>
            </div>
            <p className="text-ui-sm text-pretty text-muted-foreground">
              The same seed always draws the same avatar.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
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

          <div className="grid gap-x-2 gap-y-2 @2xs/avatar-generator-controls:grid-cols-2 @2xs/avatar-generator-controls:gap-y-3">
            {PICKERS.map(({ slot, label }) => {
              const parts = getAvatarParts(slot, state.gender)
              const items = (() => {
                if (slot === "glasses")
                  return [
                    { value: NO_ITEM, label: "None" },
                    { value: FROM_SEED, label: "Random" },
                    ...parts.filter((part) => part.name !== NO_ITEM).map((part) => ({ value: part.name, label: part.label })),
                  ]
                const seedPart = parts.find((part) => part.name === resolved[slot])
                return [
                  { value: FROM_SEED, label: `Seed · ${seedPart?.label ?? "None"}` },
                  ...parts.map((part) => ({ value: part.name, label: part.label })),
                ]
              })()
              const value = slot === "glasses" ? glassesValue : (state.selections[slot] ?? FROM_SEED)
              return (
                <div
                  key={slot}
                  className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] items-center gap-2 @2xs/avatar-generator-controls:flex @2xs/avatar-generator-controls:flex-col @2xs/avatar-generator-controls:items-stretch @2xs/avatar-generator-controls:gap-1.5"
                >
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
            <Button variant="outline" onClick={download} className="grow @sm/avatar-generator-controls:grow-0">
              <DownloadIcon data-icon="inline-start" />
              Download SVG
            </Button>
            <Button onClick={copy} aria-live="polite" className="grow @sm/avatar-generator-controls:grow-0">
              <span className="relative inline-grid shrink-0 place-items-center *:col-start-1 *:row-start-1 *:transition-[opacity,scale,filter] *:duration-300 *:ease-[cubic-bezier(0.22,1,0.36,1)]">
                <CheckIcon className={!copied ? "opacity-0 motion-safe:scale-25 motion-safe:blur-xs" : undefined} />
                <CopyIcon className={copied ? "opacity-0 motion-safe:scale-25 motion-safe:blur-xs" : undefined} />
              </span>
              {copied ? "Copied" : "Copy code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AvatarGenerator, type AvatarGeneratorProps, type AvatarGeneratorState }

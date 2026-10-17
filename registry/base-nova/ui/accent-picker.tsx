"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

/*
 * Accent colour picker for an app's appearance settings. Switches the
 * eight accent roles (`--primary` … `--ring`) the theme defines, by setting
 * `data-accent` on <html> (blue, the default, has no attribute), and remembers
 * the pick in localStorage["accent"].
 *
 * The preset roles ship inside this file (the same values as the
 * `html[data-accent]` blocks in the qinyang/ui theme), injected once as a
 * <style>, so it works in any app that installed @qinyang/theme.
 *
 *   <AccentPicker />                              ← self-contained
 *   const [accent, setAccent] = useAccent()       ← your own control
 */

const ACCENTS = ["blue", "neutral", "green", "orange", "rose", "violet"] as const
type Accent = (typeof ACCENTS)[number]

const ACCENT_LABELS: Record<Accent, string> = {
  blue: "Blue",
  neutral: "Neutral",
  green: "Green",
  orange: "Orange",
  rose: "Rose",
  violet: "Violet",
}

/** Each preset's light-mode primary (neutral follows the foreground). */
const SWATCH: Record<Accent, string> = {
  neutral: "var(--foreground)",
  blue: "#0090ff",
  green: "#30a46c",
  orange: "#f76b15",
  rose: "#e93d82",
  violet: "#6e56cf",
}

const STORAGE_KEY = "accent"
const STYLE_ID = "qy-accent-presets"
/** Same-tab broadcast so every picker (and the qinyang/ui docs header) stays in step. */
const ACCENT_CHANGE_EVENT = "qy-accent-change"
const PRESETS_CSS = `html[data-accent="neutral"] { --primary: #000000f2; --primary-hover: #000c; --primary-active: #000000b3; --primary-foreground: #fff; --primary-subtle: #0000000f; --primary-subtle-hover: #00000017; --primary-border: #00000026; --ring: #0004; }} html[data-accent="neutral"].dark { --primary: #fffffff2; --primary-hover: #fffc; --primary-active: #ffffffb3; --primary-foreground: #000; --primary-subtle: #ffffff12; --primary-subtle-hover: #ffffff1b; --primary-border: #ffffff2c; --ring: #fff5; }} html[data-accent="green"] { --primary: #30a46c; --primary-hover: #2b9a66; --primary-active: #218358; --primary-foreground: #fff; --primary-subtle: #00a43319; --primary-subtle-hover: #00a83829; --primary-border: #00963c52; --ring: #00924ba4; }} html[data-accent="green"].dark { --primary: #30a46c; --primary-hover: #33b074; --primary-active: #3dd68c; --primary-foreground: #fff; --primary-subtle: #22ff991e; --primary-subtle-hover: #11ff992d; --primary-border: #44ffaa4b; --ring: #44ffa49e; }} html[data-accent="orange"] { --primary: #f76b15; --primary-hover: #ef5f00; --primary-active: #cc4e00; --primary-foreground: #fff; --primary-subtle: #ff9c0029; --primary-subtle-hover: #ff91014a; --primary-border: #ff81007d; --ring: #e35f00aa; }} html[data-accent="orange"].dark { --primary: #f76b15; --primary-hover: #ff801f; --primary-active: #ffa057; --primary-foreground: #fff; --primary-subtle: #fb6a0025; --primary-subtle-hover: #ff590039; --primary-border: #fd75045c; --ring: #fe6d15f7; }} html[data-accent="rose"] { --primary: #e93d82; --primary-hover: #df3478; --primary-active: #cb1d63; --primary-foreground: #fff; --primary-subtle: #ff005216; --primary-subtle-hover: #f8005123; --primary-border: #d0004b41; --ring: #b6004a6c; }} html[data-accent="rose"].dark { --primary: #e93d82; --primary-hover: #ee518a; --primary-active: #ff92ad; --primary-foreground: #fff; --primary-subtle: #fe2a8b2a; --primary-subtle-hover: #fd158741; --primary-border: #fe459763; --ring: #fe418de8; }} html[data-accent="violet"] { --primary: #6e56cf; --primary-hover: #654dc4; --primary-active: #6550b9; --primary-foreground: #fff; --primary-subtle: #4400ee0f; --primary-subtle-hover: #4300ff1b; --primary-border: #3100fb35; --ring: #2b00d066; }} html[data-accent="violet"].dark { --primary: #6e56cf; --primary-hover: #7d66d9; --primary-active: #baa7ff; --primary-foreground: #fff; --primary-subtle: #8354fe36; --primary-subtle-hover: #7d51fd50; --primary-border: #8f6cfd6d; --ring: #8668ffcc; }}`

const isAccent = (v: unknown): v is Accent => typeof v === "string" && (ACCENTS as readonly string[]).includes(v)

function ensurePresets() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = PRESETS_CSS
  document.head.appendChild(style)
}

function readAccent(): Accent {
  const attr = document.documentElement.getAttribute("data-accent")
  if (isAccent(attr)) return attr
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isAccent(stored)) return stored
  } catch {
    // storage can be unavailable (private mode, sandboxed iframes)
  }
  return "blue"
}

function applyAccent(accent: Accent) {
  ensurePresets()
  const root = document.documentElement
  if (accent === "blue") root.removeAttribute("data-accent")
  else root.setAttribute("data-accent", accent)
  try {
    localStorage.setItem(STORAGE_KEY, accent)
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(ACCENT_CHANGE_EVENT))
}

/** Current accent and a setter. Re-applies the stored accent on mount. */
function useAccent(): [Accent, (accent: Accent) => void] {
  const [accent, setState] = React.useState<Accent>("blue")
  React.useEffect(() => {
    ensurePresets()
    const sync = () => setState(readAccent())
    const stored = readAccent()
    if (stored !== "blue" && !document.documentElement.hasAttribute("data-accent")) {
      document.documentElement.setAttribute("data-accent", stored)
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] })
    window.addEventListener(ACCENT_CHANGE_EVENT, sync)
    return () => {
      mo.disconnect()
      window.removeEventListener(ACCENT_CHANGE_EVENT, sync)
    }
  }, [])
  const set = React.useCallback((next: Accent) => {
    setState(next)
    applyAccent(next)
  }, [])
  return [accent, set]
}

const ACCENT_SCRIPT = `(function(){try{var a=localStorage.getItem("${STORAGE_KEY}");if(a&&a!=="blue"&&${JSON.stringify(ACCENTS)}.indexOf(a)>-1)document.documentElement.setAttribute("data-accent",a)}catch(e){}})()`

/**
 * The preset roles as a <style> plus a tiny pre-paint script that applies the stored
 * accent before first paint. Render once near the top of your root layout's <body>
 * (or <head>) so a reload never flashes the default blue.
 */
function AccentPresets() {
  return (
    <>
      <style id={STYLE_ID} dangerouslySetInnerHTML={{ __html: PRESETS_CSS }} />
      <script dangerouslySetInnerHTML={{ __html: ACCENT_SCRIPT }} />
    </>
  )
}

type AccentPickerProps = Omit<RadioGroupPrimitive.Props<string>, "value" | "defaultValue" | "onValueChange" | "children"> & {
  /** Presets to offer, in order. Default all six. */
  accents?: readonly Accent[]
  /** Show the name under each swatch. */
  showLabels?: boolean
}

function AccentPicker({ accents = ACCENTS, showLabels = false, className, ...props }: AccentPickerProps) {
  const [accent, setAccent] = useAccent()
  return (
    <RadioGroupPrimitive
      data-slot="accent-picker"
      value={accent}
      onValueChange={(v) => isAccent(v) && setAccent(v)}
      className={cn("flex flex-wrap items-start gap-3", className)}
      {...props}
      aria-label={props["aria-label"] ?? "Accent colour"}
    >
      {accents.map((a) => (
        <label key={a} className="flex cursor-pointer flex-col items-center gap-1.5 text-ui-sm text-muted-foreground has-data-checked:text-foreground">
          <RadioPrimitive.Root
            value={a}
            aria-label={ACCENT_LABELS[a]}
            style={{ "--swatch": SWATCH[a] } as React.CSSProperties}
            className="relative grid size-7 cursor-pointer place-items-center rounded-full bg-(--swatch) text-background outline-none ring-offset-2 ring-offset-background transition-[box-shadow] duration-150 after:absolute after:inset-0 after:rounded-full after:ring-1 after:ring-foreground/10 after:ring-inset focus-visible:ring-2 focus-visible:ring-ring/50 data-checked:ring-2 data-checked:ring-foreground/30"
          >
            <RadioPrimitive.Indicator className="flex transition-[opacity,scale] duration-150 data-ending-style:scale-50 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0 [&_svg]:size-3.5">
              <CheckIcon className={a === "neutral" ? "text-background" : "text-white"} />
            </RadioPrimitive.Indicator>
          </RadioPrimitive.Root>
          {showLabels && <span>{ACCENT_LABELS[a]}</span>}
        </label>
      ))}
    </RadioGroupPrimitive>
  )
}

export { AccentPicker, AccentPresets, useAccent, ACCENTS, ACCENT_LABELS, ACCENT_CHANGE_EVENT }
export type { Accent, AccentPickerProps }

"use client"

import type * as React from "react"

import { Badge } from "@/registry/base-nova/ui/badge"

import { PRESET_THEMES, type AccentVars } from "./accent-color"
import { useAccentState } from "./accent-store"
import type { ParsedTheme, TokenKind, TokenRole } from "./theming-tokens"

/** Tokens the accent replaces, mapped to their AccentVars key. */
const ACCENT_TOKENS: Record<string, keyof AccentVars> = { primary: "primary", "primary-foreground": "foreground", ring: "ring" }

/**
 * One mode's preview: a tile painted with that mode's own page background (so translucent
 * fills and hairlines read as they do in that mode, whatever mode the docs are in),
 * holding the token as a fill, as text, or as a line.
 */
function ModeSwatch({ kind, value, bg }: { kind: TokenKind; value: string; bg: string | undefined }) {
  const vars = { "--t-bg": bg, "--t-v": value } as React.CSSProperties
  return (
    <span
      aria-hidden
      style={vars}
      className="frame-md frame-p-1 flex h-8 w-11 shrink-0 bg-(--t-bg) shadow-chip"
    >
      {kind === "text" ? (
        <span className="grid flex-1 place-items-center text-ui font-semibold text-(--t-v)">Aa</span>
      ) : kind === "line" ? (
        <span className="grid flex-1 place-items-center">
          <span className="block h-full w-full rounded-inner border-2 border-(--t-v)" />
        </span>
      ) : (
        <span className="block flex-1 rounded-inner bg-(--t-v)" />
      )}
    </span>
  )
}

function ValueCell({ kind, value, bg }: { kind: TokenKind; value: string | undefined; bg: string | undefined }) {
  if (!value) return <span className="text-muted-foreground">—</span>
  return (
    <span className="flex items-center gap-2.5">
      <ModeSwatch kind={kind} value={value} bg={bg} />
      <span className="font-mono text-ui-xs whitespace-nowrap text-muted-foreground">{value}</span>
    </span>
  )
}

/**
 * Token tables by role: token and Tailwind class, light and dark value with a live swatch each.
 * Values come from app/globals.css (parsed at build time); primary, primary-foreground and
 * ring follow the accent you pick, in both modes.
 */
export function ThemingTokenTable({ role, theme }: { role: TokenRole; theme: ParsedTheme }) {
  const { accent, custom } = useAccentState()
  const accentTheme = accent === "custom" ? custom : accent === "neutral" ? null : PRESET_THEMES[accent]
  const valueFor = (name: string, which: "light" | "dark") => {
    const key = ACCENT_TOKENS[name]
    if (key && accentTheme) return accentTheme[which][key]
    return theme[which][name]
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
      <table className="w-full min-w-xl table-fixed border-collapse text-left text-sm">
        <thead className="text-muted-foreground">
          <tr className="border-b">
            <th className="w-2/5 px-4 py-2.5 font-medium">Token / Tailwind class</th>
            <th className="px-4 py-2.5 font-medium">Light</th>
            <th className="px-4 py-2.5 font-medium">Dark</th>
          </tr>
        </thead>
        <tbody>
          {role.tokens.map((t) => (
            <tr key={t.name} className="border-b last:border-b-0">
              <td className="px-4 py-2.5 align-middle whitespace-nowrap">
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <code className="font-mono text-xs text-foreground">--{t.name}</code>
                    {t.note === "accent" ? (
                      <Badge variant="primary" size="sm">
                        accent
                      </Badge>
                    ) : null}
                  </span>
                  <code className="font-mono text-ui-xs text-muted-foreground">{t.cls}</code>
                </span>
              </td>
              <td className="px-4 py-2.5 align-middle">
                <ValueCell kind={t.kind} value={valueFor(t.name, "light")} bg={valueFor(t.on ?? "background", "light")} />
              </td>
              <td className="px-4 py-2.5 align-middle">
                <ValueCell kind={t.kind} value={valueFor(t.name, "dark")} bg={valueFor(t.on ?? "background", "dark")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

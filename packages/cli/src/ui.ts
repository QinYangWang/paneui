import { createInterface } from "node:readline/promises"

const useColor = () =>
  !process.env.NO_COLOR && (process.env.FORCE_COLOR ? process.env.FORCE_COLOR !== "0" : Boolean(process.stdout.isTTY))

const wrap = (open: number, close: number) => (s: string) => (useColor() ? `\x1b[${open}m${s}\x1b[${close}m` : s)

export const c = {
  bold: wrap(1, 22),
  dim: wrap(2, 22),
  red: wrap(31, 39),
  green: wrap(32, 39),
  yellow: wrap(33, 39),
  cyan: wrap(36, 39),
}

export class CliError extends Error {
  constructor(
    message: string,
    readonly exitCode = 1,
  ) {
    super(message)
  }
}

export const log = {
  info: (msg = "") => console.log(msg),
  step: (msg: string) => console.log(`${c.cyan("›")} ${msg}`),
  ok: (msg: string) => console.log(`${c.green("✓")} ${msg}`),
  warn: (msg: string) => console.error(`${c.yellow("!")} ${msg}`),
  error: (msg: string) => console.error(`${c.red("✗")} ${msg}`),
}

const ANSI = /\x1b\[[0-9;]*m/g
const visible = (s: string) => s.replace(ANSI, "").length

function truncate(s: string, width: number) {
  if (width <= 1) return ""
  if (s.length <= width) return s
  return s.slice(0, width - 1) + "…"
}

/** Prints rows as aligned columns. The last column is truncated to the terminal width. */
export function table(headers: string[], rows: string[][]) {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => visible(r[i] ?? ""))))
  const total = process.stdout.columns || 120
  const fixed = widths.slice(0, -1).reduce((a, w) => a + w + 2, 0)
  const last = Math.max(20, total - fixed)
  widths[widths.length - 1] = Math.min(widths[widths.length - 1], last)
  const line = (cells: string[], style = (s: string) => s) =>
    cells
      .map((cell, i) => {
        const isLast = i === cells.length - 1
        const text = isLast ? truncate(cell, widths[i]) : cell
        return isLast ? style(text) : style(text) + " ".repeat(Math.max(0, widths[i] - visible(text)))
      })
      .join("  ")
  console.log(line(headers, c.dim))
  for (const r of rows) console.log(line(r))
}

/** Yes/no prompt; resolves `fallback` when stdin is not a terminal. */
export async function confirm(question: string, fallback = false): Promise<boolean> {
  if (!process.stdin.isTTY) return fallback
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  try {
    const answer = (await rl.question(`${question} ${c.dim(fallback ? "(Y/n)" : "(y/N)")} `)).trim().toLowerCase()
    if (!answer) return fallback
    return answer === "y" || answer === "yes"
  } finally {
    rl.close()
  }
}

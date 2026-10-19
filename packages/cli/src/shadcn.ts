import { spawn } from "node:child_process"

import { SHADCN_ENV } from "./meta.js"
import { CliError, c } from "./ui.js"

/** How to launch the shadcn CLI: $PANEUI_SHADCN (split on spaces) or `npx --yes shadcn@latest`. */
export function shadcnCommand(): string[] {
  const env = process.env[SHADCN_ENV]?.trim()
  if (env) return env.split(/\s+/)
  return [process.platform === "win32" ? "npx.cmd" : "npx", "--yes", "shadcn@latest"]
}

export function formatCommand(args: string[]) {
  return [...shadcnCommand(), ...args].map((a) => (/[\s"'$]/.test(a) ? JSON.stringify(a) : a)).join(" ")
}

/** Runs shadcn with inherited stdio. Rejects with the exit code when it fails. */
export function runShadcn(args: string[], opts: { cwd: string; quiet?: boolean }): Promise<void> {
  const [cmd, ...pre] = shadcnCommand()
  if (!opts.quiet) console.log(c.dim(`$ ${formatCommand(args)}`))
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, [...pre, ...args], {
      cwd: opts.cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: process.env,
    })
    child.on("error", (err) => reject(new CliError(`Could not start the shadcn CLI (${cmd}): ${err.message}`)))
    child.on("exit", (code, signal) => {
      if (code === 0) resolve()
      else reject(new CliError(`shadcn exited with ${signal ?? `code ${code}`}`, code ?? 1))
    })
  })
}

// Stands in for the shadcn CLI in tests: records its arguments and exits 0.
import { existsSync, readFileSync, writeFileSync } from "node:fs"

const file = process.env.FAKE_SHADCN_CALLS
const calls = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : []
calls.push({ args: process.argv.slice(2), cwd: process.cwd() })
writeFileSync(file, JSON.stringify(calls))

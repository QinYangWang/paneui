import fs from "node:fs"
import path from "node:path"

// Raw download of the qinyang-design agent skill. Single source: skills/qinyang-design/SKILL.md
// (also what `npx skills add QinYangWang/ui --skill qinyang-design` installs).
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(path.join(process.cwd(), "skills/qinyang-design/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

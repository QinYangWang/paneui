import fs from "node:fs"
import path from "node:path"

// Raw download of the paneui-design agent skill. Single source: skills/paneui-design/SKILL.md
// (also what `npx skills add QinYangWang/ui --skill paneui-design` installs).
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(path.join(process.cwd(), "skills/paneui-design/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

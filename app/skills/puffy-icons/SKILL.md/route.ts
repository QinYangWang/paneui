import fs from "node:fs"
import path from "node:path"

// Raw download of the puffy-icons agent skill. Single source: skills/puffy-icons/SKILL.md
// (also what `npx skills add QinYangWang/ui --skill puffy-icons` installs).
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(path.join(process.cwd(), "skills/puffy-icons/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

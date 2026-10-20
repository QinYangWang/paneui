import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"

// Raw download of the puffy-icons agent skill. Single source: skills/puffy-icons/SKILL.md
// (also what `npx skills add QinYangWang/paneui --skill puffy-icons` installs).
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(repoPath( "skills/puffy-icons/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"

// Raw download of the paneui-design agent skill. Single source: skills/paneui-design/SKILL.md
// (also what `npx skills add taimatsuorg/paneui --skill paneui-design` installs).
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(repoPath( "skills/paneui-design/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

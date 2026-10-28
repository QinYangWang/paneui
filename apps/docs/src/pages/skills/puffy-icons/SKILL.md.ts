import fs from "node:fs"

import { repoPath } from "@/lib/repo-path"

// Raw download of the puffy-icons agent skill. Single source: skills/puffy-icons/SKILL.md
// (also what `npx skills add taimatsuorg/paneui --skill puffy-icons` installs).
export const prerender = true

export function GET() {
  const body = fs.readFileSync(repoPath("skills/puffy-icons/SKILL.md"), "utf8")
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } })
}

import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"

// Raw download of the skill's preview script. Single source: skills/puffy-icons/scripts/preview.tsx
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(repoPath( "skills/puffy-icons/scripts/preview.tsx"), "utf8")
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } })
}

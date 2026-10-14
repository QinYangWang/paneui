import fs from "node:fs"
import path from "node:path"

// Raw download of the skill's preview script. Single source: skills/puffy-icons/scripts/preview.tsx
export const dynamic = "force-static"

export function GET() {
  const body = fs.readFileSync(path.join(process.cwd(), "skills/puffy-icons/scripts/preview.tsx"), "utf8")
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } })
}

// Renders the welcome template to HTML (template mode and with sample values) and checks the output.
// Run: esbuild scripts/test-email-editor-render.tsx --bundle --platform=node --jsx=automatic --outfile=/tmp/e.cjs && node /tmp/e.cjs [out-dir]
import { writeFileSync } from "node:fs"

import { renderEmailHtml, renderEmailText } from "@/registry/base-nova/blocks/email-editor/render"
import { sampleEmailValues, welcomeEmail } from "@/registry/base-nova/blocks/email-editor/templates"

async function main() {
  const out = process.argv[2]
  let failed = 0
  const check = (name: string, ok: boolean) => {
    console.log(`${ok ? "ok  " : "FAIL"} ${name}`)
    if (!ok) failed++
  }
  const template = await renderEmailHtml(welcomeEmail)
  const filled = await renderEmailHtml(welcomeEmail, { variables: sampleEmailValues })
  const text = await renderEmailText(welcomeEmail, { variables: sampleEmailValues })
  check("template keeps {{variables}}", template.includes("{{first_name}}") && template.includes("{{#each steps}}") && template.includes("{{#if is_team}}"))
  check("values fill variables", filled.includes("Welcome aboard, Ada!") && !filled.includes("{{first_name}}"))
  check("repeat renders every item", ["Connect your workspace", "Invite your team", "Ship your first page"].every((s) => filled.includes(s)))
  check("show-if renders when truthy", filled.includes("Bring your team"))
  check("button href filled", filled.includes('href="https://example.com/invite"'))
  check("table layout, no class-based CSS for content", filled.includes("<table") && !/class="[^"]*(text-|bg-|p-\d)/.test(filled))
  check("preheader present", filled.includes("Your Pro trial is live"))
  check("plain text version", /welcome aboard, ada!/i.test(text) && !text.includes("<table"))
  const hidden = await renderEmailHtml(welcomeEmail, { variables: { ...sampleEmailValues, is_team: false } })
  check("show-if hides when falsy", !hidden.includes("Bring your team"))
  if (out) {
    writeFileSync(`${out}/welcome.template.html`, template)
    writeFileSync(`${out}/welcome.sample.html`, filled)
  }
  console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed")
  process.exit(failed ? 1 : 0)
}
void main()

import { repoPath } from "@/lib/repo-path"
import fs from "node:fs"
import type * as React from "react"

import { CheckCircleIcon, XCircleIcon } from "@paneui/ui/icons"
import { AgentSkill } from "@/components/docs/agent-skill"
import type { TocEntry } from "@/components/docs/doc-toc"
import { DocsCode, highlight } from "@/components/docs/docs-code"
import { DocHeading } from "@/components/docs/doc-heading"
import { Code, GuideH2, GuidePage } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { ruleSlug, SKILL_EXAMPLE_FILES, SKILL_EXAMPLES } from "@/components/docs/skill-examples"
import { REGISTRY_NAME } from "@/lib/docs"

export const metadata = { title: "Design skill" }

type Rule = { n: number; title: string; why: string; id: string }

/** Rules straight from skills/paneui-design/SKILL.md: "### N. Title" and the sentence under it. */
function readSkill() {
  const skill = fs.readFileSync(repoPath( "skills/paneui-design/SKILL.md"), "utf8")
  const body = skill.slice(skill.indexOf("\n## Rules"), skill.indexOf("\n## References"))
  const rules: Rule[] = []
  for (const block of body.split(/\n### /).slice(1)) {
    const [head, ...rest] = block.split("\n")
    const m = head.match(/^(\d+)\.\s+(.+)$/)
    if (!m) continue
    const why = rest.join("\n").trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ")
    rules.push({ n: Number(m[1]), title: m[2], why, id: ruleSlug(m[2]) })
  }
  const missing = rules.filter((r) => !SKILL_EXAMPLES[r.id] && !SKILL_EXAMPLE_FILES[r.id]).map((r) => r.id)
  if (missing.length) console.warn(`[docs/skill] rules without an example in skill-examples.tsx: ${missing.join(", ")}`)
  return { skill, rules }
}

/** `code` spans in a line of markdown as inline code. */
function Md({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) => (part.startsWith("`") ? <Code key={i}>{part.slice(1, -1)}</Code> : part))}
    </>
  )
}

const LABEL = {
  good: { text: "Recommended", icon: <CheckCircleIcon className="size-4 text-success" /> },
  bad: { text: "Avoid", icon: <XCircleIcon className="size-4 text-destructive" /> },
} as const

function LiveExample({ tone, children }: { tone: keyof typeof LABEL; children: React.ReactNode }) {
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-xl bg-card shadow-raised">
      <figcaption className="flex h-10 items-center gap-2 border-b px-4 text-ui-sm font-medium">
        {LABEL[tone].icon}
        {LABEL[tone].text}
      </figcaption>
      <div className="grid min-h-40 flex-1 place-items-center bg-background p-6">{children}</div>
    </figure>
  )
}

/** The good/bad pair the skill ships in examples/<dir>/. */
function fileExample(dir: string) {
  const read = (kind: string) => fs.readFileSync(repoPath( "skills/paneui-design/examples", dir, `${kind}.tsx`), "utf8").trim()
  return { kind: "code" as const, lang: "tsx", good: read("good"), bad: read("bad") }
}

function RuleExamples({ id }: { id: string }) {
  const ex = SKILL_EXAMPLES[id] ?? (SKILL_EXAMPLE_FILES[id] ? fileExample(SKILL_EXAMPLE_FILES[id]) : undefined)
  if (!ex) return null
  if (ex.kind === "code")
    return (
      <div className="grid gap-3">
        <DocsCode code={ex.good} language={ex.lang} title={LABEL.good.text} icon={LABEL.good.icon} />
        <DocsCode code={ex.bad} language={ex.lang} title={LABEL.bad.text} icon={LABEL.bad.icon} />
      </div>
    )
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <LiveExample tone="good">{ex.good}</LiveExample>
      <LiveExample tone="bad">{ex.bad}</LiveExample>
    </div>
  )
}

const CHECK = `node .agents/skills/paneui-design/scripts/check.mjs
node .agents/skills/paneui-design/scripts/check.mjs app components --strict
node .agents/skills/paneui-design/scripts/check.mjs --list`

export default async function SkillPage() {
  const { skill, rules } = readSkill()
  const toc: TocEntry[] = [
    { id: "installation", title: "Installation" },
    { id: "check", title: "Check" },
    { id: "platforms", title: "Web and Native" },
    { id: "rules", title: "Rules" },
    ...rules.map((r) => ({ id: r.id, title: r.title.replace(/`/g, ""), depth: 2 as const })),
  ]
  return (
    <GuidePage href="/docs/skill" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="installation">Installation</GuideH2>
        <AgentSkill name="paneui-design" skill={skill} html={await highlight(skill, "markdown")} />
        <p className="text-muted-foreground">Or through the shadcn CLI, into <Code>.agents/skills</Code>:</p>
        <InstallCommand args={`add @${REGISTRY_NAME}/design-skill`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="check">Check</GuideH2>
        <p className="text-muted-foreground">
          Run it before you commit. It exits with an error when a rule breaks; allow-list a deliberate exception in{" "}
          <Code>paneui-design.config.json</Code> with its reason.
        </p>
        <DocsCode code={CHECK} language="bash" />
        <p className="text-muted-foreground">
          For what only the rendered page shows, open the screen and paste <Code>scripts/radius-probe.js</Code> (nested
          corners) or <Code>scripts/polish-probe.js</Code> (hit areas, image edges, live numbers) into the browser
          console.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="platforms">Web and Native</GuideH2>
        <p className="text-pretty text-muted-foreground">
          Share semantic colours, spacing and wording. Web uses CSS tokens and browser semantics;
          Native uses touch dimensions, system text scaling and native accessibility. The platform
          references in the skill explain where their implementations differ.
        </p>
        <p className="text-pretty text-muted-foreground">
          Native checks inspect visible styles and primitive props. Prop spreads, imported styles,
          effective touch bounds and device announcements still need review. Browser probes apply to
          Web elements; a browser preview does not replace a device run.
        </p>
        <RuleExamples id="native-touch-target" />
        <RuleExamples id="native-accessibility" />
      </section>

      <section className="flex flex-col gap-12">
        <GuideH2 id="rules">Rules</GuideH2>
        {rules.map((r) => (
          <section key={r.id} className="flex flex-col gap-3">
            <DocHeading as="h3" id={r.id} className="text-balance">
              <span className="me-2 text-muted-foreground tabular-nums">{r.n}.</span>
              <Md text={r.title} />
            </DocHeading>
            <p className="text-pretty text-muted-foreground">
              <Md text={r.why} />
            </p>
            <RuleExamples id={r.id} />
          </section>
        ))}
      </section>
    </GuidePage>
  )
}

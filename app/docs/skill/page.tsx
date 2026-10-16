import fs from "node:fs"
import path from "node:path"
import type * as React from "react"

import { CheckCircleIcon, XCircleIcon } from "@/components/icons"
import { AgentSkill } from "@/components/docs/agent-skill"
import type { TocEntry } from "@/components/docs/doc-toc"
import { DocsCode, highlight } from "@/components/docs/docs-code"
import { Code, GuideH2, GuidePage } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { ruleSlug, SKILL_EXAMPLES } from "@/components/docs/skill-examples"
import { REGISTRY_NAME } from "@/lib/docs"

export const metadata = { title: "Design skill" }

type Rule = { n: number; title: string; why: string; id: string }

/** Rules straight from skills/qinyang-design/SKILL.md: "### N. Title" and the sentence under it. */
function readSkill() {
  const skill = fs.readFileSync(path.join(process.cwd(), "skills/qinyang-design/SKILL.md"), "utf8")
  const body = skill.slice(skill.indexOf("\n## Rules"), skill.indexOf("\n## References"))
  const rules: Rule[] = []
  for (const block of body.split(/\n### /).slice(1)) {
    const [head, ...rest] = block.split("\n")
    const m = head.match(/^(\d+)\.\s+(.+)$/)
    if (!m) continue
    const why = rest.join("\n").trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ")
    rules.push({ n: Number(m[1]), title: m[2], why, id: ruleSlug(m[2]) })
  }
  const missing = rules.filter((r) => !SKILL_EXAMPLES[r.id]).map((r) => r.id)
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

function RuleExamples({ id }: { id: string }) {
  const ex = SKILL_EXAMPLES[id]
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

const CHECK = `node .agents/skills/qinyang-design/scripts/check.mjs
node .agents/skills/qinyang-design/scripts/check.mjs app components --strict
node .agents/skills/qinyang-design/scripts/check.mjs --list`

export default async function SkillPage() {
  const { skill, rules } = readSkill()
  const toc: TocEntry[] = [
    { id: "installation", title: "Installation" },
    { id: "check", title: "Check" },
    { id: "rules", title: "Rules" },
    ...rules.map((r) => ({ id: r.id, title: r.title.replace(/`/g, ""), depth: 2 as const })),
  ]
  return (
    <GuidePage href="/docs/skill" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="installation">Installation</GuideH2>
        <AgentSkill name="qinyang-design" skill={skill} html={await highlight(skill, "markdown")} />
        <p className="text-muted-foreground">Or through the shadcn CLI, into <Code>.agents/skills</Code>:</p>
        <InstallCommand args={`add @${REGISTRY_NAME}/design-skill`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="check">Check</GuideH2>
        <p className="text-muted-foreground">
          Run it before you commit. It exits with an error when a rule breaks; allow-list a deliberate exception in{" "}
          <Code>qinyang-design.config.json</Code> with its reason.
        </p>
        <DocsCode code={CHECK} language="bash" />
        <p className="text-muted-foreground">
          For nested corners as rendered, open the screen, then paste <Code>scripts/radius-probe.js</Code> into the
          browser console.
        </p>
      </section>

      <section className="flex flex-col gap-12">
        <GuideH2 id="rules">Rules</GuideH2>
        {rules.map((r) => (
          <section key={r.id} className="flex flex-col gap-3">
            <h3 id={r.id} className="flex scroll-mt-20 gap-2 text-lg font-semibold text-balance">
              <span className="text-muted-foreground tabular-nums">{r.n}.</span>
              <a href={`#${r.id}`} className="outline-none focus-visible:underline">
                <Md text={r.title} />
              </a>
            </h3>
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

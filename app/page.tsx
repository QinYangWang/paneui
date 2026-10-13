import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { demos } from "@/components/docs/demos"
import { getGroups } from "@/lib/docs"

const wide = new Set(["chat", "prompt-bar", "recommendation-card", "task-row"])

export default function Gallery() {
  const groups = getGroups()
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Soft, tactile components.</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Copy-paste React components on Base UI, Tailwind 4 and Motion, with a light touch of skeuomorphism. Install any
          of them with the shadcn CLI.
        </p>
      </section>
      {groups.map((g) => (
        <section key={g.category} className="flex flex-col gap-5">
          <h2 className="text-sm font-medium text-muted-foreground">{g.category}</h2>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {g.items.map((item) => {
              const Demo = demos[item.name]
              return (
                <div
                  key={item.name}
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-card shadow-surface ${wide.has(item.name) ? "lg:col-span-2" : ""}`}
                >
                  <div className="flex min-h-64 flex-1 items-center justify-center bg-background/40 p-8 shadow-[inset_0_-1px_0_var(--border)]">
                    {Demo ? <Demo /> : null}
                  </div>
                  <Link href={`/docs/${item.name}`} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <div className="font-medium">{item.title}</div>
                      <div className="truncate text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <ArrowRightIcon size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

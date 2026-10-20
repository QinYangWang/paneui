/** The starter project every new (or reset) workspace opens with. Paths are relative to the workspace root. */
export const SEED_FILES: Record<string, string> = {
  "package.json": `{
  "name": "tasks-web",
  "version": "0.4.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc -p .",
    "test": "node --test dist/**/*.test.js",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "typescript": "^5.8.0"
  }
}
`,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "outDir": "dist",
    "skipLibCheck": true
  },
  "include": ["src"]
}
`,
  "README.md": `# tasks-web

A small task list in React and TypeScript.

## Scripts

- \`npm run build\` compiles to \`dist/\`
- \`npm test\` runs the unit tests
- \`npm run typecheck\` checks types without emitting

## Layout

- \`src/components\`: UI parts
- \`src/hooks\`: state and persistence
- \`src/lib\`: pure helpers, with tests next to them
`,
  ".gitignore": `node_modules
dist
.env*
`,
  "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tasks</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  "src/main.tsx": `import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App"
import "./styles.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
`,
  "src/App.tsx": `import { useState } from "react"

import { TaskList } from "./components/TaskList"
import { useTasks } from "./hooks/useTasks"
import type { Filter } from "./types"

const FILTERS: Filter[] = ["all", "open", "done"]

export function App() {
  const { tasks, add, toggle, remove } = useTasks()
  const [filter, setFilter] = useState<Filter>("all")
  const [draft, setDraft] = useState("")

  const visible = tasks.filter((t) => (filter === "all" ? true : filter === "done" ? t.done : !t.done))

  return (
    <main className="app">
      <h1>Tasks</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!draft.trim()) return
          add(draft.trim())
          setDraft("")
        }}
      >
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a task" />
      </form>
      <nav className="filters">
        {FILTERS.map((f) => (
          <button key={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </nav>
      <TaskList tasks={visible} onToggle={toggle} onRemove={remove} />
    </main>
  )
}
`,
  "src/types.ts": `export type Task = {
  id: string
  title: string
  done: boolean
  createdAt: number
}

export type Filter = "all" | "open" | "done"
`,
  "src/components/TaskList.tsx": `import type { Task } from "../types"
import { TaskItem } from "./TaskItem"

type TaskListProps = {
  tasks: Task[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TaskList({ tasks, onToggle, onRemove }: TaskListProps) {
  if (tasks.length === 0) return <p className="empty">Nothing here yet.</p>
  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={() => onToggle(task.id)} onRemove={() => onRemove(task.id)} />
      ))}
    </ul>
  )
}
`,
  "src/components/TaskItem.tsx": `import { formatRelative } from "../lib/format"
import type { Task } from "../types"

type TaskItemProps = {
  task: Task
  onToggle: () => void
  onRemove: () => void
}

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <li className={task.done ? "task done" : "task"}>
      <label>
        <input type="checkbox" checked={task.done} onChange={onToggle} />
        <span>{task.title}</span>
      </label>
      <time dateTime={new Date(task.createdAt).toISOString()}>{formatRelative(task.createdAt)}</time>
      <button aria-label={\`Remove \${task.title}\`} onClick={onRemove}>
        ×
      </button>
    </li>
  )
}
`,
  "src/hooks/useTasks.ts": `import { useEffect, useState } from "react"

import type { Task } from "../types"

const KEY = "tasks:v1"

function load(): Task[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Task[]
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  // TODO: sync across tabs with the storage event
  const add = (title: string) =>
    setTasks((t) => [{ id: crypto.randomUUID(), title, done: false, createdAt: Date.now() }, ...t])
  const toggle = (id: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  const remove = (id: string) => setTasks((t) => t.filter((x) => x.id !== id))

  return { tasks, add, toggle, remove }
}
`,
  "src/lib/format.ts": `const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** "just now", "5m ago", "3h ago", "2d ago", then a short date. */
export function formatRelative(time: number, now = Date.now()): string {
  const diff = now - time
  if (diff < MINUTE) return "just now"
  if (diff < HOUR) return \`\${Math.floor(diff / MINUTE)}m ago\`
  if (diff < DAY) return \`\${Math.floor(diff / HOUR)}h ago\`
  if (diff < 7 * DAY) return \`\${Math.floor(diff / DAY)}d ago\`
  return new Date(time).toLocaleDateString(undefined, { month: "short", day: "numeric" })
}
`,
  "src/lib/format.test.ts": `import assert from "node:assert/strict"
import { test } from "node:test"

import { formatRelative } from "./format"

const now = Date.UTC(2026, 9, 15, 12)

test("recent times", () => {
  assert.equal(formatRelative(now - 10_000, now), "just now")
  assert.equal(formatRelative(now - 5 * 60_000, now), "5m ago")
})

test("hours and days", () => {
  assert.equal(formatRelative(now - 3 * 3_600_000, now), "3h ago")
  assert.equal(formatRelative(now - 2 * 86_400_000, now), "2d ago")
})
`,
  "src/styles.css": `:root {
  font-family: system-ui, sans-serif;
  color-scheme: light dark;
}

.app {
  max-width: 32rem;
  margin: 4rem auto;
  padding: 0 1rem;
}

.filters {
  display: flex;
  gap: 0.25rem;
  margin: 0.75rem 0;
}

.filters [aria-pressed="true"] {
  font-weight: 600;
}

.task {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0;
}

.task.done span {
  text-decoration: line-through;
  opacity: 0.6;
}

.empty {
  opacity: 0.6;
}
`,
}

/** Folders the seed creates even when empty. */
export const SEED_DIRS = ["public"]

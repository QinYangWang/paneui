"use client"

import * as React from "react"

import type { CitationSource } from "@paneui/ui/components/citations"
import { StreamingResponse, type StreamingResponseStatus } from "@paneui/ui/components/streaming-response"

const SOURCES: CitationSource[] = [
  {
    id: "react",
    title: "useOptimistic – React",
    url: "https://react.dev/reference/react/useOptimistic",
    snippet: "useOptimistic is a React Hook that lets you optimistically update the UI while an async action is underway.",
  },
  {
    id: "next",
    title: "Server Actions and Mutations",
    url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
    snippet: "Server Actions are asynchronous functions that are executed on the server.",
  },
]

const ANSWER = `Use **useOptimistic** to show the new todo instantly, then let the server action confirm it [1].

- Wrap the mutation in a form action so React tracks the pending state
- Call \`addOptimistic(todo)\` before awaiting the server action [2]
- If the action throws, React drops the optimistic entry automatically

\`\`\`tsx
const [todos, addOptimistic] = useOptimistic(initial, (s, t) => [...s, t])
\`\`\`

That keeps the list responsive without hand-rolled rollback logic.`

export default function StreamingResponseDemo() {
  const [length, setLength] = React.useState(0)
  const [status, setStatus] = React.useState<StreamingResponseStatus>("streaming")
  const [run, setRun] = React.useState(0)

  React.useEffect(() => {
    setLength(0)
    setStatus("streaming")
    let n = 0
    const id = window.setInterval(() => {
      n = Math.min(ANSWER.length, n + 3 + Math.floor(Math.random() * 6))
      setLength(n)
      if (n >= ANSWER.length) {
        window.clearInterval(id)
        setStatus("complete")
      }
    }, 40)
    return () => window.clearInterval(id)
  }, [run])

  return (
    <div className="w-full max-w-lg">
      <StreamingResponse
        text={ANSWER.slice(0, length)}
        status={status}
        sources={SOURCES}
        copyText={ANSWER}
        onRetry={() => setRun((r) => r + 1)}
      />
    </div>
  )
}

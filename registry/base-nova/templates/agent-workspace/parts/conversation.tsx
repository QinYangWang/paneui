"use client"

import * as React from "react"

import { BotIcon, CheckIcon } from "@/components/icons"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { FileDiff } from "@/registry/base-nova/ui/file-diff"
import { Message, MessageAvatar, MessageBubble, MessageContent, MessageHeader, MessageList, MessageMarker, MessageMeta } from "@/registry/base-nova/ui/message"
import { ReasoningText } from "@/registry/base-nova/ui/reasoning-text"
import { StreamingResponse, type StreamingResponseStatus } from "@/registry/base-nova/ui/streaming-response"
import { TodoList } from "@/registry/base-nova/ui/todo-list"
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

import { diffs, plan, summary, testLog, testSnippet } from "./data"

export type Turn = { id: string; text: string; reply?: string }

/** Assistant row: avatar plus a full-width column of agent blocks. */
function AgentTurn({ meta, children }: { meta: React.ReactNode; children: React.ReactNode }) {
  return (
    <Message from="assistant" className="items-start">
      <MessageAvatar className="mt-0.5">
        <BotIcon />
      </MessageAvatar>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <MessageHeader className="mb-0 h-8">
          <span className="text-foreground">Tessel</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{meta}</span>
        </MessageHeader>
        {children}
      </div>
    </Message>
  )
}

function useStream(text: string, run: boolean) {
  const [length, setLength] = React.useState(run ? 0 : text.length)
  const [status, setStatus] = React.useState<StreamingResponseStatus>(run ? "streaming" : "complete")
  React.useEffect(() => {
    if (!run) return
    let n = 0
    const id = window.setInterval(() => {
      n = Math.min(text.length, n + 4 + Math.floor(Math.random() * 6))
      setLength(n)
      if (n >= text.length) {
        window.clearInterval(id)
        setStatus("complete")
      }
    }, 28)
    return () => window.clearInterval(id)
  }, [text, run])
  return { text: text.slice(0, length), status }
}

function StreamedReply({ text, animate = true }: { text: string; animate?: boolean }) {
  const s = useStream(text, animate)
  return <StreamingResponse text={s.text} status={s.status} copyText={text} />
}

export function Conversation({ turns, working }: { turns: Turn[]; working: boolean }) {
  return (
    <MessageList className="mx-auto max-w-3xl">
      <MessageMarker>Today · 10:42</MessageMarker>
      <Message from="user">
        <MessageContent>
          <MessageBubble tone="primary">
            Invoices with fractional unit prices are coming out 1¢ high. INV-2045 is the one finance flagged. Can you find the cause
            and fix it?
          </MessageBubble>
          <MessageMeta>
            <CheckIcon /> 10:42
          </MessageMeta>
        </MessageContent>
      </Message>

      <AgentTurn meta="Worked for 1m 48s">
        <TodoList items={plan} title="Fix invoice rounding" defaultOpen />
        <ToolResult kind="terminal" tool="bash" title="Billing tests passed" status="success" duration={1.81} meta="exit 0" defaultOpen={false} copyText={testLog}>
          <ToolResultOutput>{testLog}</ToolResultOutput>
        </ToolResult>
        <FileDiff filename={diffs["invoice.ts"].filename} diff={diffs["invoice.ts"].diff} />
        <FileDiff filename={diffs["money.ts"].filename} diff={diffs["money.ts"].diff} defaultOpen={false} />
        <AgentCodeBlock filename="packages/billing/src/invoice.test.ts" code={testSnippet} highlightLines={[[9, 9]]} maxHeight={260} />
        <StreamedReply text={summary} />
        <ToolApproval
          tool="github.create_pull_request"
          title="Open a pull request?"
          description="Push fix/invoice-rounding and open a PR against main for review."
          risk="medium"
          defaultArgsOpen={false}
          args={{ repo: "acme/billing", head: "fix/invoice-rounding", base: "main", title: "Round line items to cents before tax", draft: false }}
        />
      </AgentTurn>

      {turns.map((t) => (
        <React.Fragment key={t.id}>
          <Message from="user" animateIn>
            <MessageContent>
              <MessageBubble tone="primary">{t.text}</MessageBubble>
            </MessageContent>
          </Message>
          {t.reply && (
            <AgentTurn meta="just now">
              <StreamedReply text={t.reply} />
            </AgentTurn>
          )}
        </React.Fragment>
      ))}

      {working && (
        <div className="flex h-8 items-center ps-11 text-sm">
          <ReasoningText phrases={["Reading the thread", "Checking the diff", "Drafting a reply"]} />
        </div>
      )}
    </MessageList>
  )
}

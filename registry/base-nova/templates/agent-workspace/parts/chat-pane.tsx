"use client"

import * as React from "react"

import { FolderIcon, GitPullRequestIcon, ShieldIcon } from "@/components/icons"
import { AgentComposer, AgentComposerBanner } from "@/registry/base-nova/blocks/agent-composer/agent-composer"
import { Loader } from "@/registry/base-nova/ui/loader"
import { MessageScroller } from "@/registry/base-nova/ui/message-scroller"
import { EffortPicker, ModelPicker, ModePicker } from "@/registry/base-nova/ui/model-picker"
import { TodoList } from "@/registry/base-nova/ui/todo-list"

import { configByCategory, flatOptions, type AcpClient, type ClientState, type SessionState, type TimelineItem } from "../acp/client"
import { ProviderIcon } from "./provider-icon"
import type { ThreadSummary } from "./threads-sidebar"
import { Timeline } from "./turn-timeline"

const isRisky = (id: string, name: string) => /full|bypass|yolo|danger/i.test(`${id} ${name}`)

function EmptyState({ thread, cwd }: { thread?: ThreadSummary; cwd: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <ProviderIcon provider={thread?.provider} className="size-8" />
      <h2 className="text-xl font-semibold tracking-tight text-balance">What should we work on?</h2>
      <p className="flex items-center gap-1.5 text-ui text-muted-foreground">
        <FolderIcon className="size-3.5" />
        {cwd || "No workspace"}
      </p>
    </div>
  )
}

export function ChatPane({
  client,
  state,
  session,
  thread,
  focused,
  onFocus,
  showAutofix,
  onDismissAutofix,
  onReview,
  onFork,
  onReveal,
}: {
  client: AcpClient
  state: ClientState
  session: SessionState | undefined
  thread?: ThreadSummary
  focused: boolean
  onFocus: () => void
  showAutofix: boolean
  onDismissAutofix: () => void
  onReview: (files: Extract<TimelineItem, { kind: "edits" }>["files"]) => void
  onFork: (text: string) => void
  onReveal: (path: string) => void
}) {
  const composerRef = React.useRef<HTMLTextAreaElement>(null)
  const [autofixOn, setAutofixOn] = React.useState(false)

  React.useEffect(() => {
    if (focused) composerRef.current?.focus({ preventScroll: true })
  }, [focused, session?.id])

  if (!session) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="md" label="Loading thread" className="text-muted-foreground" />
      </div>
    )
  }

  const working = session.status === "working"
  const model = configByCategory(session, "model")
  const effort = configByCategory(session, "thought_level")
  const modes = session.modes
  const plan = session.plan
  const showPlan = plan.length > 0 && (working || plan.some((p) => p.status !== "completed"))

  const header =
    showPlan || (showAutofix && thread?.pr) ? (
      <>
        {showPlan && (
          <TodoList
            title="Plan"
            items={plan.map((p, i) => ({
              id: String(i),
              title: p.content,
              status: p.status === "completed" ? "done" : p.status === "in_progress" ? "in-progress" : "pending",
            }))}
            maxHeight={160}
          />
        )}
        {showAutofix && thread?.pr && (
          <AgentComposerBanner
            icon={<GitPullRequestIcon />}
            title={autofixOn ? `Auto-fix is on for #${thread.pr.number}.` : "Want to turn on auto-fix for this PR?"}
            actionLabel={autofixOn ? undefined : "Turn on"}
            onAction={() => setAutofixOn(true)}
            onDismiss={onDismissAutofix}
          />
        )}
      </>
    ) : undefined

  return (
    <div className="flex h-full min-w-0 flex-col" onPointerDownCapture={onFocus} onFocusCapture={onFocus}>
      <MessageScroller
        key={session.id}
        className="min-h-0 flex-1"
        viewportClassName="scrollbar-thin"
        contentClassName="mx-auto flex w-full max-w-3xl flex-col px-5 pt-5 pb-8"
        jumpButton="icon"
        jumpLabel="Scroll to bottom"
      >
        {session.status === "loading" ? (
          <div className="flex justify-center py-16">
            <Loader size="md" label="Replaying thread" className="text-muted-foreground" />
          </div>
        ) : session.timeline.length === 0 ? (
          <EmptyState thread={thread} cwd={session.cwd} />
        ) : (
          <Timeline session={session} terminals={state.terminals} client={client} onReview={onReview} onFork={onFork} onReveal={onReveal} />
        )}
      </MessageScroller>
      <div className="shrink-0 px-4 pb-3">
        <div className="mx-auto w-full max-w-3xl">
          <AgentComposer
            ref={composerRef}
            busy={working}
            onSubmit={(text) => void client.prompt(session.id, text)}
            onStop={() => void client.cancel(session.id)}
            mentions={state.files.map((f) => ({ value: f }))}
            commands={session.commands.map((c) => ({ name: c.name, description: c.description, hint: c.input?.hint }))}
            onVoice={() => composerRef.current?.focus()}
            header={header}
            toolbarStart={
              modes && modes.availableModes.length > 0 ? (
                <ModePicker
                  label="Access"
                  value={modes.currentModeId}
                  onValueChange={(id) => void client.setMode(session.id, id)}
                  modes={modes.availableModes.map((m) => ({
                    id: m.id,
                    name: m.name,
                    description: m.description ?? undefined,
                    icon: <ShieldIcon />,
                    tone: isRisky(m.id, m.name) ? "warning" : "default",
                  }))}
                />
              ) : null
            }
            toolbarEnd={
              <>
                {working && <Loader variant="ring" size="sm" label="Agent is working" className="mr-0.5 size-3.5 text-muted-foreground" />}
                {model ? (
                  <ModelPicker
                    value={model.currentValue}
                    onValueChange={(v) => void client.setConfigOption(session.id, model.id, v)}
                    models={flatOptions(model.options).map((o) => ({
                      id: o.value,
                      name: o.name,
                      description: o.description ?? undefined,
                      provider: o.group,
                      icon: <ProviderIcon provider={o.group?.toLowerCase()} />,
                    }))}
                    align="end"
                  />
                ) : session.models ? (
                  <ModelPicker
                    value={session.models.currentModelId}
                    onValueChange={(v) => void client.setModel(session.id, v)}
                    models={session.models.availableModels.map((m) => ({ id: m.modelId, name: m.name, description: m.description ?? undefined }))}
                    align="end"
                  />
                ) : null}
                {effort && (
                  <EffortPicker
                    value={effort.currentValue}
                    onValueChange={(v) => void client.setConfigOption(session.id, effort.id, v)}
                    levels={flatOptions(effort.options).map((o) => ({ value: o.value, label: o.name, description: o.description ?? undefined }))}
                    align="end"
                  />
                )}
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

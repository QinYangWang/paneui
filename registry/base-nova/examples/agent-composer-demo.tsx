"use client"

import * as React from "react"

import { siClaude } from "simple-icons"

import { GitPullRequestIcon } from "@/components/icons"
import { markOpenai } from "@/lib/brand-marks"
import { AgentComposer, AgentComposerBanner } from "@/registry/base-nova/blocks/agent-composer/agent-composer"
import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { EffortPicker, ModelPicker, ModePicker } from "@/registry/base-nova/ui/model-picker"

export default function AgentComposerDemo() {
  const [busy, setBusy] = React.useState(false)
  const [banner, setBanner] = React.useState(true)
  const [sent, setSent] = React.useState<string | null>(null)
  const [mode, setMode] = React.useState("full")
  const [model, setModel] = React.useState("sol")
  const [effort, setEffort] = React.useState("high")
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 pt-48">
      {sent && <p className="self-end rounded-2xl bg-secondary px-3.5 py-2 text-ui-lg">{sent}</p>}
      <AgentComposer
        busy={busy}
        onSubmit={(text) => {
          setSent(text)
          setBusy(true)
          window.setTimeout(() => setBusy(false), 2500)
        }}
        onStop={() => setBusy(false)}
        onAttach={() => undefined}
        onVoice={() => undefined}
        mentions={["app/page.tsx", "app/layout.tsx", "components/split-pane.tsx", "lib/utils.ts"].map((value) => ({ value }))}
        commands={[
          { name: "review", description: "Review the current diff" },
          { name: "plan", description: "Outline steps first", hint: "goal" },
          { name: "test", description: "Run the tests and fix failures" },
        ]}
        header={
          banner ? (
            <AgentComposerBanner icon={<GitPullRequestIcon />} title="Want to turn on auto-fix for this PR?" actionLabel="Turn on" onAction={() => setBanner(false)} onDismiss={() => setBanner(false)} />
          ) : undefined
        }
        toolbarStart={
          <ModePicker
            label="Access"
            value={mode}
            onValueChange={setMode}
            modes={[
              { id: "ask", name: "Ask first" },
              { id: "full", name: "Full access", tone: "warning" },
            ]}
          />
        }
        toolbarEnd={
          <>
            <ModelPicker value={model} onValueChange={setModel} align="end" models={[
                { id: "sol", name: "GPT-6.1 Sol", icon: <BrandIcon icon={markOpenai} color="brand" /> },
                { id: "sonnet", name: "Sonnet 5.5", icon: <BrandIcon icon={siClaude} color="brand" /> },
              ]} />
            <EffortPicker value={effort} onValueChange={setEffort} align="end" />
          </>
        }
      />
    </div>
  )
}

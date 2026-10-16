"use client"

import * as React from "react"

import { PlusIcon, TrashIcon } from "@/components/icons"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Alert, AlertContent, AlertDescription } from "@/registry/base-nova/ui/alert"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/base-nova/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/registry/base-nova/ui/dialog"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { SettingsNav, SettingsNavItem } from "@/registry/base-nova/ui/settings-section"
import { Textarea } from "@/registry/base-nova/ui/textarea"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

import { formatEnv, parseArgs, parseEnv, type AgentConfig, type AgentProvider, type BridgeConfig } from "./agents"
import { ProviderIcon } from "./provider-icon"

const PROVIDERS: { value: AgentProvider; label: string }[] = [
  { value: "claude", label: "Claude" },
  { value: "codex", label: "Codex" },
  { value: "gemini", label: "Gemini" },
  { value: "custom", label: "Other" },
]

export function SettingsDialog({
  open,
  onOpenChange,
  agents,
  onAgentsChange,
  bridge,
  onBridgeChange,
  activeAgentId,
  connection,
  error,
  onConnect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  agents: AgentConfig[]
  onAgentsChange: (agents: AgentConfig[]) => void
  bridge: BridgeConfig
  onBridgeChange: (bridge: BridgeConfig) => void
  activeAgentId: string
  connection: string
  error?: string
  onConnect: (agentId: string) => void
}) {
  const [selectedId, setSelectedId] = React.useState(activeAgentId)
  const selected = agents.find((a) => a.id === selectedId) ?? agents[0]
  const [argsText, setArgsText] = React.useState("")
  const [envText, setEnvText] = React.useState("")

  React.useEffect(() => {
    if (!selected) return
    setArgsText(selected.args.map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" "))
    setEnvText(formatEnv(selected.env))
  }, [selected])

  const update = (patch: Partial<AgentConfig>) => onAgentsChange(agents.map((a) => (a.id === selected.id ? { ...a, ...patch } : a)))

  const add = () => {
    const id = `agent-${Date.now().toString(36)}`
    onAgentsChange([...agents, { id, name: "New agent", provider: "custom", command: "", args: [], env: {} }])
    setSelectedId(id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agents</DialogTitle>
          <DialogDescription>
            Any agent that speaks the Agent Client Protocol works. The bridge runs it on your machine and serves file and terminal access inside the workspace root.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-[13rem_1fr]">
          <div className="flex flex-col gap-1">
            <SettingsNav aria-label="Agents">
              {agents.map((a) => (
                <SettingsNavItem
                  key={a.id}
                  icon={<ProviderIcon provider={a.provider} />}
                  isActive={a.id === selected?.id}
                  render={<button type="button" />}
                  onClick={() => setSelectedId(a.id)}
                >
                  <span className="min-w-0 flex-1 truncate text-start">{a.name}</span>
                  {a.id === activeAgentId && connection === "ready" && <span aria-label="Connected" className="size-1.5 rounded-full bg-success" />}
                </SettingsNavItem>
              ))}
            </SettingsNav>
            <Button variant="ghost" size="sm" className="justify-start text-muted-foreground" onClick={add}>
              <PlusIcon data-icon="inline-start" />
              Add agent
            </Button>
          </div>

          {selected && (
            <div className="flex min-w-0 flex-col gap-3">
              {selected.builtin ? (
                <p className="text-ui text-pretty text-muted-foreground">
                  The demo agent runs in your browser and replays a scripted session, so the template works without a backend. It answers every ACP call the real agents do.
                </p>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="agent-name">Name</Label>
                      <Input id="agent-name" value={selected.name} onChange={(e) => update({ name: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>Provider</Label>
                      <Select value={selected.provider} onValueChange={(v) => update({ provider: v as AgentProvider })}>
                        <SelectTrigger aria-label="Provider">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PROVIDERS.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="agent-command">Command</Label>
                    <Input id="agent-command" value={selected.command} placeholder="npx" onChange={(e) => update({ command: e.target.value })} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="agent-args">Arguments</Label>
                    <Input
                      id="agent-args"
                      value={argsText}
                      placeholder="-y @zed-industries/claude-code-acp"
                     
                      onChange={(e) => setArgsText(e.target.value)}
                      onBlur={() => update({ args: parseArgs(argsText) })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="agent-env">Environment</Label>
                    <Textarea
                      id="agent-env"
                      value={envText}
                      rows={3}
                      placeholder={"ANTHROPIC_API_KEY=sk-…\nOne KEY=value per line"}
                     
                      onChange={(e) => setEnvText(e.target.value)}
                      onBlur={() => update({ env: parseEnv(envText) })}
                    />
                  </div>
                </>
              )}

              {!selected.builtin && (
                <Card variant="outline" size="sm">
                  <CardHeader>
                    <CardTitle>Bridge</CardTitle>
                    <CardDescription className="text-pretty">Start it in your project, then paste the address and token it prints.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                  <AgentCodeBlock code="node server/acp-bridge.mjs --root ." language="bash" showLineNumbers={false} />
                  <div className="grid gap-2 sm:grid-cols-[1fr_10rem]">
                    <Input value={bridge.url} aria-label="Bridge address" onChange={(e) => onBridgeChange({ ...bridge, url: e.target.value })} />
                    <Input value={bridge.token} aria-label="Bridge token" placeholder="token" onChange={(e) => onBridgeChange({ ...bridge, token: e.target.value })} />
                  </div>
                  </CardContent>
                </Card>
              )}

              {error && selected.id === activeAgentId && (
                <Alert variant="destructive" size="sm">
                  <AlertContent>
                    <AlertDescription className="text-pretty">{error}</AlertDescription>
                  </AlertContent>
                </Alert>
              )}

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    update({ args: parseArgs(argsText), env: parseEnv(envText) })
                    onConnect(selected.id)
                  }}
                  disabled={!selected.builtin && !selected.command}
                >
                  {selected.id === activeAgentId && connection === "ready" ? "Reconnect" : "Connect"}
                </Button>
                {selected.id === activeAgentId && (
                  <Badge size="sm" variant={connection === "ready" ? "success" : connection === "error" ? "destructive" : "outline"}>
                    {connection}
                  </Badge>
                )}
                <div className="flex-1" />
                {!selected.builtin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => {
                      onAgentsChange(agents.filter((a) => a.id !== selected.id))
                      setSelectedId(agents[0].id)
                    }}
                  >
                    <TrashIcon data-icon="inline-start" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="items-center justify-between">
          <span className="flex items-center gap-2 text-ui text-muted-foreground">
            Appearance <ThemeToggle variant="ghost" modes="tri" />
          </span>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

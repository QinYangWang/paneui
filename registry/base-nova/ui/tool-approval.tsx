"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { CheckIcon, ChevronDownIcon, ShieldIcon, UndoIcon, WarningIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { AGENT_EASE, CodeHighlight, type CodeLanguage } from "@/registry/base-nova/ui/tool-result"

type ToolApprovalDecision = "once" | "always" | "deny"
type ToolApprovalRisk = "low" | "medium" | "high"

const RISK: Record<ToolApprovalRisk, { label: string; variant: "chip" | "warning" | "destructive" }> = {
  low: { label: "Read only", variant: "chip" },
  medium: { label: "Makes changes", variant: "warning" },
  high: { label: "Destructive", variant: "destructive" },
}

const DECISION_COPY: Record<ToolApprovalDecision, string> = {
  once: "Allowed once",
  always: "Always allowed",
  deny: "Denied",
}

function readRemembered(key?: string) {
  if (!key || typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(key) === "always"
  } catch {
    return false
  }
}

function writeRemembered(key: string | undefined, value: boolean) {
  if (!key || typeof window === "undefined") return
  try {
    if (value) window.localStorage.setItem(key, "always")
    else window.localStorage.removeItem(key)
  } catch {}
}

/**
 * Forget a remembered "Always allow": removes the `rememberKey` entry from
 * localStorage (the value is stored under the key itself). Use it when a
 * controlled parent resets `decision` from "always" to `null`, which on its own
 * does not clear the saved permission. Safe to call on the server or with an unset key.
 */
function forgetToolApproval(rememberKey: string | undefined) {
  writeRemembered(rememberKey, false)
}

type ToolApprovalProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** Tool identifier, e.g. `github.create_pull_request`. */
  tool: string
  title?: React.ReactNode
  description?: React.ReactNode
  /** Arguments preview: an object is pretty-printed as JSON, a string is shown as-is. */
  args?: unknown
  /** Language for a string `args` preview (e.g. `bash` for a command). */
  argsLanguage?: CodeLanguage
  risk?: ToolApprovalRisk
  /** Controlled decision (`null` = pending). */
  decision?: ToolApprovalDecision | null
  defaultDecision?: ToolApprovalDecision | null
  onDecisionChange?: (decision: ToolApprovalDecision | null) => void
  /**
   * localStorage key that remembers "Always allow" across sessions. When it is
   * already set, the card mounts as approved and `onDecisionChange("always")` fires.
   * Only Revoke clears it; a controlled parent resetting `decision` to `null` must
   * call `forgetToolApproval(rememberKey)` itself.
   */
  rememberKey?: string
  /**
   * Show Undo (after Allow once / Deny) and Revoke (after Always allow) on the
   * resolved card. Only Revoke clears the `rememberKey` entry.
   */
  revocable?: boolean
  defaultArgsOpen?: boolean
}

/**
 * Human-in-the-loop permission card: tool name, risk, arguments preview and
 * Allow once / Always allow / Deny. Resolves into a compact remembered state
 * that can be revoked.
 */
function ToolApproval({
  tool,
  title = "Allow this tool to run?",
  description,
  args,
  argsLanguage = "bash",
  risk = "medium",
  decision: decisionProp,
  defaultDecision = null,
  onDecisionChange,
  rememberKey,
  revocable = true,
  defaultArgsOpen = true,
  className,
  ...props
}: ToolApprovalProps) {
  const reduce = useReducedMotion()
  const [internal, setInternal] = React.useState<ToolApprovalDecision | null>(defaultDecision)
  const decision = decisionProp !== undefined ? decisionProp : internal
  const [argsOpen, setArgsOpen] = React.useState(defaultArgsOpen && decision == null)
  const pending = decision == null
  const onChangeRef = React.useRef(onDecisionChange)
  onChangeRef.current = onDecisionChange

  // Follow the decision, controlled or not: resolving folds the arguments,
  // going back to pending (Undo, or a parent resetting `decision` to null)
  // reopens them as `defaultArgsOpen` says.
  const [prevDecision, setPrevDecision] = React.useState(decision)
  if (decision !== prevDecision) {
    setPrevDecision(decision)
    setArgsOpen(decision == null ? defaultArgsOpen : false)
  }

  const decide = React.useCallback(
    (next: ToolApprovalDecision | null) => {
      if (decisionProp === undefined) setInternal(next)
      if (next === "always") writeRemembered(rememberKey, true)
      // Only revoking an "Always allow" forgets it; undoing "Allow once" or
      // "Deny" leaves a permission saved earlier alone.
      if (next === null && decision === "always") writeRemembered(rememberKey, false)
      onChangeRef.current?.(next)
    },
    [decision, decisionProp, rememberKey]
  )

  // Remembered permission from an earlier session.
  React.useEffect(() => {
    if (pending && readRemembered(rememberKey)) {
      if (decisionProp === undefined) setInternal("always")
      onChangeRef.current?.("always")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rememberKey])

  const argsText = React.useMemo(() => {
    if (args == null) return null
    return typeof args === "string" ? args : JSON.stringify(args, null, 2)
  }, [args])
  const argsLang: CodeLanguage = typeof args === "string" ? argsLanguage : "json"
  const riskInfo = RISK[risk]

  return (
    <div
      role="group"
      aria-label={`Permission request for ${tool}`}
      data-slot="tool-approval"
      data-decision={decision ?? "pending"}
      className={cn(
        "w-full overflow-hidden rounded-2xl bg-card text-ui text-card-foreground shadow-raised",
        pending && "ring-1 ring-warning/35",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 p-3.5 pb-2.5">
        <IconChip
          tone={pending ? (risk === "high" ? "destructive" : "warning") : decision === "deny" ? "neutral" : "success"}
          className="transition-[background-color,color,box-shadow] duration-300"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={decision ?? "pending"}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="grid place-items-center"
            >
              {pending ? (
                risk === "high" ? <WarningIcon /> : <ShieldIcon />
              ) : decision === "deny" ? (
                <XIcon />
              ) : (
                <CheckIcon />
              )}
            </motion.span>
          </AnimatePresence>
        </IconChip>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-semibold">{pending ? title : DECISION_COPY[decision]}</span>
            <Badge size="sm" variant={pending ? riskInfo.variant : decision === "deny" ? "outline" : "success"}>
              {pending ? riskInfo.label : decision === "always" ? "Remembered" : decision === "once" ? "This run" : "Blocked"}
            </Badge>
          </div>
          <code className="truncate font-mono text-ui-sm text-muted-foreground">{tool}</code>
          {description && pending ? <p className="pt-1 leading-relaxed text-muted-foreground">{description}</p> : null}
        </div>
      </div>

      {argsText ? (
        <CollapsiblePrimitive.Root open={argsOpen} onOpenChange={setArgsOpen} className="px-3.5">
          <CollapsiblePrimitive.Trigger className="group/args -ml-1.5 inline-flex h-7 cursor-pointer items-center gap-1 rounded-md px-1.5 text-ui-sm font-medium text-muted-foreground outline-none select-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50">
            {argsOpen ? "Hide arguments" : "Show arguments"}
            <ChevronDownIcon className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-panel-open/args:rotate-180 motion-reduce:transition-none" />
          </CollapsiblePrimitive.Trigger>
          <CollapsiblePrimitive.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none">
            <div className="max-h-52 overflow-auto rounded-xl bg-code p-3 shadow-well scrollbar-thin">
              <CodeHighlight code={argsText} language={argsLang} wrap />
            </div>
          </CollapsiblePrimitive.Panel>
        </CollapsiblePrimitive.Root>
      ) : null}

      <div className="relative p-3.5 pt-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {pending ? (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6, filter: reduce ? "none" : "blur(2px)" }}
              transition={{ duration: 0.22, ease: AGENT_EASE }}
              className="flex flex-wrap items-center gap-2"
            >
              <Button size="sm" variant="ghost" onClick={() => decide("deny")} className="text-muted-foreground">
                Deny
              </Button>
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => decide("once")}>
                  Allow once
                </Button>
                <Button size="sm" onClick={() => decide("always")}>
                  Always allow
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="resolved"
              role="status"
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: AGENT_EASE }}
              className="flex min-h-8 items-center gap-2 text-ui-sm text-muted-foreground"
            >
              <span className="flex-1">
                {decision === "always"
                  ? "Future calls to this tool run without asking."
                  : decision === "once"
                    ? "Approved for this call only."
                    : "The agent was told not to run this tool."}
              </span>
              {revocable ? (
                <Button size="xs" variant="ghost" onClick={() => decide(null)} className="text-muted-foreground">
                  <UndoIcon />
                  {decision === "always" ? "Revoke" : "Undo"}
                </Button>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export { ToolApproval, forgetToolApproval, type ToolApprovalProps, type ToolApprovalDecision, type ToolApprovalRisk }

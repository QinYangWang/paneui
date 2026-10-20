# Tool Approval

> Asks the user to allow or deny an agent tool call.

Page: https://paneui.dev/docs/tool-approval/

## Installation

```bash
npx shadcn@latest add @paneui/tool-approval
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/tool-approval.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/tool-result`, `@paneui/icon-chip`, `@paneui/action-swap-roll`.

## Usage

```tsx
import { ToolApproval } from "@/components/ui/tool-approval"
```

```tsx
<ToolApproval
  tool="shell.exec"
  icon={<TerminalSquareIcon />}
  title={<>Run <code>rm -rf dist</code>?</>}
  description="The command runs in this project."
  decision={decision}
  onDecisionChange={setDecision}
  status={status}
/>
```

## Examples

### Risk Levels

```tsx
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalRisks() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval tool="gmail.search" title="Search your inbox?" risk="low" description="Looks for last week’s hotel confirmation." />
      <ToolApproval tool="calendar.create_event" title="Add an event?" risk="medium" description="“Flight CX 520” on Friday at 09:15." />
      <ToolApproval tool="drive.delete_folder" title="Delete a folder?" risk="high" description="Moves “Old invoices” and 214 files to the trash." />
    </div>
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalControlled() {
  const [decision, setDecision] = React.useState<ToolApprovalDecision | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="slack.post_message"
        title="Post to #design?"
        description="Review moved to Thursday 3 pm."
        args={{ channel: "#design", text: "Review moved to Thursday 3 pm." }}
        decision={decision}
        onDecisionChange={setDecision}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Decision: {decision ?? "pending"}</span>
        <Button size="sm" variant="ghost" onClick={() => setDecision(null)} disabled={decision === null}>
          Ask again
        </Button>
      </div>
    </div>
  )
}
```

### Outcomes

```tsx
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalResolved() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval tool="maps.directions" title="Get directions?" defaultDecision="once" />
      <ToolApproval tool="contacts.read" title="Read your contacts?" risk="low" defaultDecision="always" />
      <ToolApproval tool="shell.exec" title="Run the test suite?" defaultDecision="once" status="running" />
      <ToolApproval tool="shell.exec" title="Build the site?" defaultDecision="once" status="done" />
      <ToolApproval tool="deploy.preview" title="Deploy a preview?" defaultDecision="once" status="failed" />
      <ToolApproval tool="payments.send" title="Send a payment?" risk="high" defaultDecision="deny" revocable={false} />
    </div>
  )
}
```

### Remembered

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { ToolApproval, forgetToolApproval, type ToolApprovalDecision } from "@/registry/base-nova/ui/tool-approval"

const REMEMBER_KEY = "docs-tool-approval-weather"

export default function ToolApprovalRemembered() {
  const [decision, setDecision] = React.useState<ToolApprovalDecision | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="weather.forecast"
        title="Check the weather?"
        description="Hong Kong, next three days."
        risk="low"
        rememberKey={REMEMBER_KEY}
        args={{ city: "Hong Kong", days: 3 }}
        decision={decision}
        onDecisionChange={setDecision}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-pretty text-muted-foreground">
          {decision === "always" ? "Saved. Reload the page and the card stays approved." : "Pick Always allow, then reload the page."}
        </p>
        <Button
          size="sm"
          variant="ghost"
          disabled={decision !== "always"}
          onClick={() => {
            // Resetting a controlled decision doesn't clear the saved permission.
            forgetToolApproval(REMEMBER_KEY)
            setDecision(null)
          }}
        >
          Forget
        </Button>
      </div>
    </div>
  )
}
```

### Arguments

```tsx
import { TerminalSquareIcon } from "@/components/icons"
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalCommand() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="shell.exec"
        icon={<TerminalSquareIcon />}
        title="Run the database migration?"
        description="Applies pending migrations to production."
        risk="high"
        argsLanguage="bash"
        args="pnpm prisma migrate deploy --schema ./prisma/schema.prisma"
        defaultArgsOpen
      />
      <ToolApproval
        tool="k8s.apply"
        title="Apply the deployment?"
        description="Scales web to three replicas."
        argsLanguage="yaml"
        args={"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3"}
      />
    </div>
  )
}
```

## Accessibility

The item is a `role="group"` labelled "Permission request for {tool}". The risk is read out after the description, the arguments toggle sets `aria-expanded`, and the result line is a `role="status"` so the outcome is announced.

## Layout

Below a 384px container width (512px with Always allow) the buttons wrap under the text. The result line hides the tool identifier at the same width.

## Forgetting a remembered approval

Revoke clears the `rememberKey` entry, but a controlled parent that resets `decision` from `"always"` to `null` doesn't: the item would find the saved permission again on its next mount. Call `forgetToolApproval(rememberKey)` (or `localStorage.removeItem(rememberKey)`) alongside the reset.

## Motion

Answering, undoing and showing the arguments animate the height on a spring while the contents cross-fade. A permission found under `rememberKey` on mount resolves without animating. Under reduced motion the height changes at once and only the opacity fades.

## API Reference

### ToolApproval

Permission request that collapses into a result line. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tool` (required) | `string` | — | Tool identifier, e.g. `github.create_pull_request`. |
| `title` | `ReactNode` | `"Allow this tool to run?"` | Question while pending. Inline `<code>` is styled. |
| `description` | `ReactNode` | — | One line under the title while pending. Defaults to `tool` in mono. |
| `resultTitle` | `ReactNode` | — | Text of the result line. Defaults to a string `title` without its question mark, or `tool` when `title` is the default. |
| `icon` | `ReactNode` | — | Icon in the tile. Defaults to a shield, or a warning sign for `risk="high"`. |
| `args` | `unknown` | — | Arguments preview behind a toggle. Objects are pretty-printed as JSON; strings are shown as-is. |
| `argsLanguage` | `CodeLanguage` | `"bash"` | Highlight grammar for a string `args`. |
| `risk` | `"low" \| "medium" \| "high"` | `"medium"` | Sets the tile tone and the risk announced to screen readers. |
| `decision` | `"once" \| "always" \| "deny" \| null` | — | Controlled decision; `null` is pending. Approve sets `"once"`. |
| `defaultDecision` | `"once" \| "always" \| "deny" \| null` | `null` | Initial decision when uncontrolled; `revocable={false}` then hides Undo. |
| `onDecisionChange` | `(decision: "once" \| "always" \| "deny" \| null) => void` | — | Called on Approve, Always allow, Deny, Undo and when a remembered permission is found. |
| `status` | `"running" \| "done" \| "failed"` | — | Outcome of an approved call on the result line. Without it the line reads Approved or Always allowed. |
| `allowAlways` | `boolean` | `rememberKey != null` | Show Always allow between Deny and Approve. |
| `rememberKey` | `string` | — | `localStorage` key that remembers Always allow across sessions (stored as `localStorage[rememberKey] = "always"`), so the item mounts approved next time. Only Revoke clears it; a controlled parent resetting `decision` from `"always"` to `null` leaves it saved, so call `forgetToolApproval(rememberKey)` too. |
| `revocable` | `boolean` | `true` | Show Undo (after Approve / Deny) or Revoke (after Always allow) on the result line until a `status` arrives. Only Revoke clears `rememberKey`. |
| `defaultArgsOpen` | `boolean` | `false` | Show the arguments while pending, on mount and whenever the decision returns to `null`. |

| Data attribute | Description |
| --- | --- |
| `data-decision` | `pending`, `once`, `always` or `deny`. |
| `data-status` | `running`, `done` or `failed` once approved and reported. |

### forgetToolApproval

`forgetToolApproval(rememberKey)` removes a remembered Always allow (the same as `localStorage.removeItem(rememberKey)`). Call it when you reset a controlled `decision` to `null`; it doesn't change what a mounted item shows. A no-op on the server or with an undefined key.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `rememberKey` (required) | `string \| undefined` | — | The `rememberKey` passed to the item. |

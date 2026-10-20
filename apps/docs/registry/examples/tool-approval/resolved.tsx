import { ToolApproval } from "@paneui/ui/components/tool-approval"

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

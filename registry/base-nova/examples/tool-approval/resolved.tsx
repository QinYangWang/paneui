import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalResolved() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToolApproval tool="maps.directions" defaultDecision="once" />
      <ToolApproval tool="contacts.read" defaultDecision="always" />
      <ToolApproval tool="payments.send" defaultDecision="deny" revocable={false} />
    </div>
  )
}

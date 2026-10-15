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

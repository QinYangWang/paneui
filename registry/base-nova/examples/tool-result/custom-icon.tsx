import { CalendarDaysIcon, DatabaseIcon } from "@/components/icons"
import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

export default function ToolResultCustomIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult tool="calendar.find_free" title="Find a free hour" status="success" duration={0.9} icon={<CalendarDaysIcon />} defaultOpen={false}>
        <ToolResultOutput language="text">{"Thu 16 Oct, 15:00–16:00\nFri 17 Oct, 10:00–11:00"}</ToolResultOutput>
      </ToolResult>
      <ToolResult tool="sql.query" title="Count active users" status="success" duration={0.12} icon={<DatabaseIcon />} meta="1 row" defaultOpen={false}>
        <ToolResultOutput language="text">{"active_users\n4,812"}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}

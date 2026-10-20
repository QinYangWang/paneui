import { ToolResult, ToolResultRequest } from "@paneui/ui/components/tool-result"

const CREATED = JSON.stringify({ id: "evt_91c", title: "Design review", starts_at: "2026-10-16T15:00:00+08:00" }, null, 2)
const MISSING = JSON.stringify({ error: "not_found", message: "No booking with id bk_204" }, null, 2)

export default function ToolResultRequests() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult kind="request" tool="http.post" title="Create calendar event" status="success" duration={0.41} collapseOnComplete={false}>
        <ToolResultRequest method="POST" url="https://api.calendar.app/v1/events" statusCode={201} statusText="Created" body={CREATED} />
      </ToolResult>
      <ToolResult kind="request" tool="http.delete" title="Cancel booking" status="error" duration={0.22}>
        <ToolResultRequest method="DELETE" url="https://api.tables.app/v2/bookings/bk_204" statusCode={404} statusText="Not Found" body={MISSING} />
      </ToolResult>
    </div>
  )
}

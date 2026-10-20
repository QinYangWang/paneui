import { StreamingResponse } from "@paneui/ui/components/streaming-response"

const ROWS = [
  { day: "Mon", plan: "Gym, 7:00" },
  { day: "Wed", plan: "Dinner with Sam, 19:30" },
  { day: "Fri", plan: "Flight CX 520, 09:15" },
]

export default function StreamingResponseCustomChildren() {
  return (
    <StreamingResponse
      status="complete"
      copyText={ROWS.map((r) => `${r.day}: ${r.plan}`).join("\n")}
      className="max-w-lg"
    >
      <p>Here’s your week at a glance:</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        {ROWS.map((r) => (
          <div key={r.day} className="contents">
            <dt className="font-medium text-foreground">{r.day}</dt>
            <dd className="text-muted-foreground tabular-nums">{r.plan}</dd>
          </div>
        ))}
      </dl>
    </StreamingResponse>
  )
}

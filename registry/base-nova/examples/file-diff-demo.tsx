"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { FileDiff, parseUnifiedDiff, type FileDiffLine } from "@/registry/base-nova/ui/file-diff"

const DIFF = `diff --git a/components/booking-form.tsx b/components/booking-form.tsx
--- a/components/booking-form.tsx
+++ b/components/booking-form.tsx
@@ -12,9 +12,12 @@ export function BookingForm({ venue }: Props) {
   const [guests, setGuests] = useState(2)
-  const [time, setTime] = useState("19:00")
+  const [time, setTime] = useState<string | null>(null)
+  const slots = useAvailableSlots(venue.id, guests)
 
   async function submit() {
-    await book(venue.id, { guests, time })
+    if (!time) return
+    await book(venue.id, { guests, time })
+    toast.success(\`Booked for \${guests} at \${time}\`)
   }
 
   return (
`

const ALL = parseUnifiedDiff(DIFF)

export default function FileDiffDemo() {
  const [lines, setLines] = React.useState<FileDiffLine[]>(ALL)
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  React.useEffect(() => () => window.clearInterval(timer.current), [])

  const replay = () => {
    window.clearInterval(timer.current)
    let i = 0
    setLines([])
    setStreaming(true)
    timer.current = window.setInterval(() => {
      i += 1
      setLines(ALL.slice(0, i))
      if (i >= ALL.length) {
        window.clearInterval(timer.current)
        setStreaming(false)
      }
    }, 160)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <FileDiff filename="components/booking-form.tsx" lines={lines} status={streaming ? "streaming" : "complete"} diffStyleToggle />
      <FileDiff
        filename="lib/slots.ts"
        defaultOpen={false}
        diff={"@@ -1,3 +1,4 @@\n export const SLOT_MINUTES = 15\n-export const MAX_GUESTS = 8\n+export const MAX_GUESTS = 10\n+export const HOLD_SECONDS = 300\n"}
      />
      <Button size="sm" variant="secondary" className="self-end" onClick={replay} disabled={streaming}>
        {streaming ? "Applying…" : "Replay edit"}
      </Button>
    </div>
  )
}

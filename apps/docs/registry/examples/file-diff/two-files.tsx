import { FileDiff } from "@paneui/ui/components/file-diff"

const BEFORE = `import { z } from "zod"

export const tripSchema = z.object({
  id: z.string(),
  city: z.string(),
  country: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  travellers: z.number().int().min(1),
  budget: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Trip = z.infer<typeof tripSchema>

export function nights(trip: Pick<Trip, "startDate" | "endDate">) {
  const ms = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()
  return Math.round(ms / 86_400_000)
}

export function isUpcoming(trip: Trip, now = new Date()) {
  return new Date(trip.startDate) > now
}

export function byStartDate(a: Trip, b: Trip) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export const emptyTrip = { travellers: 1, tags: [] }
`

const AFTER = `import { z } from "zod"

export const tripSchema = z.object({
  id: z.string().uuid(),
  city: z.string(),
  country: z.string().length(2),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  travellers: z.number().int().min(1),
  budget: z.number().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  archived: z.boolean().default(false),
})

export type Trip = z.infer<typeof tripSchema>

export function nights(trip: Pick<Trip, "startDate" | "endDate">) {
  const ms = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()
  return Math.round(ms / 86_400_000)
}

export function isUpcoming(trip: Trip, now = new Date()) {
  return new Date(trip.startDate) > now
}

export function byStartDate(a: Trip, b: Trip) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
}

export const emptyTrip = { travellers: 1, tags: [], archived: false }
`

export default function FileDiffTwoFiles() {
  return <FileDiff filename="lib/schema/trip.ts" oldFile={BEFORE} newFile={AFTER} maxHeight={420} className="w-full max-w-xl" />
}

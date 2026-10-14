"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition } from "motion/react"

import { CopyIcon, PlusIcon, XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/base-nova/ui/button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/base-nova/ui/menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"
import { Switch } from "@/registry/base-nova/ui/switch"

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
type TimeRange = { id: string; start: string; end: string }
type DayAvailability = { enabled: boolean; ranges: TimeRange[] }
type WeekAvailability = Record<DayKey, DayAvailability>

const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
  { key: "sat", label: "Saturday", short: "Sat" },
  { key: "sun", label: "Sunday", short: "Sun" },
]
const WEEKDAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri"]

const DAY_MINUTES = 24 * 60
const ROW: Transition = { type: "spring", stiffness: 420, damping: 36, mass: 0.7 }

const toMinutes = (v: string) => {
  const [h, m] = v.split(":").map(Number)
  return h * 60 + m
}
const toValue = (mins: number) => {
  const c = Math.max(0, Math.min(DAY_MINUTES, mins))
  if (c === DAY_MINUTES) return "24:00"
  return `${String(Math.floor(c / 60)).padStart(2, "0")}:${String(c % 60).padStart(2, "0")}`
}
const formatTime = (v: string, hour12: boolean) => {
  const mins = toMinutes(v)
  const h = Math.floor(mins / 60) % 24
  const m = mins % 60
  if (!hour12) return mins === DAY_MINUTES ? "24:00" : v
  const suffix = h < 12 ? "am" : "pm"
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")}${suffix}`
}

let rangeSeq = 0
const newId = () => `r${Date.now().toString(36)}${(rangeSeq++).toString(36)}`

/** Ranges whose span crosses another range on the same day. */
function overlapping(ranges: TimeRange[]) {
  const bad = new Set<string>()
  const sorted = [...ranges].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
  for (let i = 1; i < sorted.length; i++) {
    if (toMinutes(sorted[i].start) < toMinutes(sorted[i - 1].end)) {
      bad.add(sorted[i].id)
      bad.add(sorted[i - 1].id)
    }
  }
  return bad
}

type AvailabilitySchedulerProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: WeekAvailability
  defaultValue?: WeekAvailability
  onValueChange?: (value: WeekAvailability) => void
  /** Minutes between selectable times. Default 30. */
  step?: number
  /** Length of a newly added range, in minutes. Default 60. */
  defaultDuration?: number
  /** Show times as 9:00am instead of 09:00. Default true. */
  hour12?: boolean
  /** Week order. Defaults to Monday first. */
  weekStartsOn?: "mon" | "sun"
}

/**
 * Weekly availability editor. Each day toggles between available and unavailable
 * on a spring, holds any number of time ranges that slide in and out, picks
 * times from a scrollable list, and copies its hours to other days (or all).
 */
function AvailabilityScheduler({
  value: valueProp,
  defaultValue,
  onValueChange,
  step = 30,
  defaultDuration = 60,
  hour12 = true,
  weekStartsOn = "mon",
  className,
  ...props
}: AvailabilitySchedulerProps) {
  const [inner, setInner] = React.useState<WeekAvailability>(() => defaultValue ?? emptyWeek())
  const value = valueProp ?? inner
  const valueRef = React.useRef(value)
  valueRef.current = value

  const commit = React.useCallback(
    (next: WeekAvailability) => {
      if (valueProp === undefined) setInner(next)
      onValueChange?.(next)
    },
    [valueProp, onValueChange]
  )
  const updateDay = (day: DayKey, fn: (d: DayAvailability) => DayAvailability) => {
    const current = valueRef.current
    commit({ ...current, [day]: fn(current[day]) })
  }

  const options = React.useMemo(() => {
    const out: Record<string, string> = {}
    for (let m = 0; m <= DAY_MINUTES; m += step) out[toValue(m)] = formatTime(toValue(m), hour12)
    return out
  }, [step, hour12])

  const days = weekStartsOn === "sun" ? [DAYS[6], ...DAYS.slice(0, 6)] : DAYS

  const copyTo = (from: DayKey, targets: DayKey[]) => {
    const current = valueRef.current
    const next = { ...current }
    for (const t of targets) {
      if (t === from) continue
      next[t] = {
        enabled: current[from].enabled,
        ranges: current[from].ranges.map((r) => ({ ...r, id: newId() })),
      }
    }
    commit(next)
  }

  return (
    <div
      data-slot="availability-scheduler"
      className={cn(
        "w-full max-w-xl rounded-2xl bg-card p-2 shadow-surface",
        className
      )}
      {...props}
    >
      <ul className="flex flex-col">
        {days.map((d, i) => (
          <DayRow
            key={d.key}
            day={d}
            first={i === 0}
            data={value[d.key]}
            options={options}
            step={step}
            defaultDuration={defaultDuration}
            onChange={(fn) => updateDay(d.key, fn)}
            onCopy={(targets) => copyTo(d.key, targets)}
            days={days}
          />
        ))}
      </ul>
    </div>
  )
}

function DayRow({
  day,
  first,
  data,
  options,
  step,
  defaultDuration,
  onChange,
  onCopy,
  days,
}: {
  day: (typeof DAYS)[number]
  first: boolean
  data: DayAvailability
  options: Record<string, string>
  step: number
  defaultDuration: number
  onChange: (fn: (d: DayAvailability) => DayAvailability) => void
  onCopy: (targets: DayKey[]) => void
  days: typeof DAYS
}) {
  const reduce = useReducedMotion()
  const labelId = React.useId()
  const bad = overlapping(data.ranges)
  const lastEnd = data.ranges.length ? Math.max(...data.ranges.map((r) => toMinutes(r.end))) : 0
  const canAdd = data.ranges.length === 0 || Math.min(lastEnd + 60, DAY_MINUTES - step) >= lastEnd

  const addRange = () =>
    onChange((d) => {
      const s = d.ranges.length ? Math.max(...d.ranges.map((r) => toMinutes(r.end))) + 60 : 9 * 60
      const start = Math.min(s, DAY_MINUTES - step)
      const end = Math.min(start + defaultDuration, DAY_MINUTES)
      return { enabled: true, ranges: [...d.ranges, { id: newId(), start: toValue(start), end: toValue(end) }] }
    })

  const setEdge = (id: string, edge: "start" | "end", v: string) =>
    onChange((d) => ({
      ...d,
      ranges: d.ranges.map((r) => {
        if (r.id !== id) return r
        let start = edge === "start" ? toMinutes(v) : toMinutes(r.start)
        let end = edge === "end" ? toMinutes(v) : toMinutes(r.end)
        // Keep the range valid: move the opposite edge, never the one just picked.
        if (end <= start) {
          if (edge === "start") end = Math.min(start + step, DAY_MINUTES)
          else start = Math.max(end - step, 0)
          if (end <= start) return r
        }
        return { ...r, start: toValue(start), end: toValue(end) }
      }),
    }))

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, height: 0, x: -8, filter: "blur(4px)" },
        animate: { opacity: 1, height: "auto", x: 0, filter: "blur(0px)" },
        exit: { opacity: 0, height: 0, x: 8, filter: "blur(4px)" },
      }

  const startOptions = Object.keys(options).filter((k) => toMinutes(k) < DAY_MINUTES)
  const endOptions = Object.keys(options).filter((k) => toMinutes(k) > 0)

  return (
    <li
      data-slot="availability-day"
      data-enabled={data.enabled || undefined}
      className={cn(
        "flex flex-col gap-3 rounded-xl px-3 py-3 sm:flex-row sm:items-start sm:gap-4",
        !first && "border-t border-border/60"
      )}
      role="group"
      aria-labelledby={labelId}
    >
      <label className="flex h-9 w-36 shrink-0 cursor-pointer items-center gap-3 text-sm font-medium select-none">
        <Switch
          checked={data.enabled}
          onCheckedChange={(checked) =>
            onChange((d) => ({
              enabled: checked,
              ranges: checked && d.ranges.length === 0 ? [{ id: newId(), start: "09:00", end: "17:00" }] : d.ranges,
            }))
          }
          aria-label={`${day.label} available`}
        />
        <span id={labelId} className={cn("transition-colors duration-200", !data.enabled && "text-muted-foreground")}>
          {day.label}
        </span>
      </label>

      <div className="min-w-0 flex-1">
        <AnimatePresence initial={false} mode="popLayout">
          {!data.enabled ? (
            <motion.p
              key="off"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, filter: "blur(3px)" }}
              transition={ROW}
              className="flex h-9 items-center text-sm text-muted-foreground"
            >
              Unavailable
            </motion.p>
          ) : (
            <motion.ul
              key="on"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, filter: "blur(3px)" }}
              transition={ROW}
              className="flex flex-col"
            >
              <AnimatePresence initial={false}>
                {data.ranges.map((r, i) => (
                  <motion.li key={r.id} {...slide} transition={ROW} className="overflow-visible">
                    <div className={cn("flex items-center gap-2", i > 0 && "pt-2")}>
                      <TimeSelect
                        label={`${day.label} range ${i + 1} start`}
                        value={r.start}
                        options={options}
                        keys={startOptions}
                        invalid={bad.has(r.id)}
                        onChange={(v) => setEdge(r.id, "start", v)}
                      />
                      <span aria-hidden className="text-muted-foreground">
                        –
                      </span>
                      <TimeSelect
                        label={`${day.label} range ${i + 1} end`}
                        value={r.end}
                        options={options}
                        keys={endOptions}
                        invalid={bad.has(r.id)}
                        onChange={(v) => setEdge(r.id, "end", v)}
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remove ${formatTime(r.start, true)} to ${formatTime(r.end, true)} on ${day.label}`}
                        onClick={() =>
                          onChange((d) => {
                            const ranges = d.ranges.filter((x) => x.id !== r.id)
                            return { enabled: ranges.length > 0, ranges }
                          })
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <XIcon />
                      </Button>
                      {i === 0 && (
                        <div className="ml-auto flex items-center gap-1 sm:ml-0">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Add a range on ${day.label}`}
                            disabled={!canAdd}
                            onClick={addRange}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <PlusIcon />
                          </Button>
                          <CopyMenu day={day} days={days} onCopy={onCopy} />
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {bad.size > 0 && (
                  <motion.li
                    key="overlap"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={ROW}
                    role="alert"
                    className="overflow-hidden text-xs text-destructive"
                  >
                    <span className="block pt-2">These hours overlap.</span>
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}

function TimeSelect({
  label,
  value,
  options,
  keys,
  invalid,
  onChange,
}: {
  label: string
  value: string
  options: Record<string, string>
  keys: string[]
  invalid?: boolean
  onChange: (v: string) => void
}) {
  const items = React.useMemo(() => {
    const all = keys.includes(value) ? keys : [...keys, value].sort((a, b) => toMinutes(a) - toMinutes(b))
    return all.map((k) => ({ value: k, label: options[k] ?? formatTime(k, true) }))
  }, [keys, value, options])
  return (
    <Select items={items} value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger
        size="sm"
        aria-label={label}
        aria-invalid={invalid || undefined}
        className="w-26 min-w-0 pl-3 tabular-nums aria-invalid:ring-2 aria-invalid:ring-destructive/40"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {items.map((o) => (
          <SelectItem key={o.value} value={o.value} className="tabular-nums">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function CopyMenu({
  day,
  days,
  onCopy,
}: {
  day: (typeof DAYS)[number]
  days: typeof DAYS
  onCopy: (targets: DayKey[]) => void
}) {
  const [picked, setPicked] = React.useState<DayKey[]>([])
  const others = days.filter((d) => d.key !== day.key)
  return (
    <Menu onOpenChange={(open) => open && setPicked([])}>
      <MenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Copy ${day.label} hours`}
            className="text-muted-foreground hover:text-foreground"
          />
        }
      >
        <CopyIcon />
      </MenuTrigger>
      <MenuContent align="end" className="min-w-52">
        <MenuItem onClick={() => onCopy(days.map((d) => d.key))}>Copy to all days</MenuItem>
        <MenuItem onClick={() => onCopy(WEEKDAYS)}>Copy to weekdays</MenuItem>
        <MenuSeparator />
        <MenuLabel>Copy {day.short} to…</MenuLabel>
        {others.map((d) => (
          <MenuCheckboxItem
            key={d.key}
            closeOnClick={false}
            checked={picked.includes(d.key)}
            onCheckedChange={(checked) =>
              setPicked((p) => (checked ? [...p, d.key] : p.filter((k) => k !== d.key)))
            }
          >
            {d.label}
          </MenuCheckboxItem>
        ))}
        <MenuSeparator />
        <MenuItem
          disabled={picked.length === 0}
          onClick={() => onCopy(picked)}
          className="justify-center font-medium text-primary"
        >
          Apply{picked.length ? ` to ${picked.length} day${picked.length > 1 ? "s" : ""}` : ""}
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

function emptyWeek(): WeekAvailability {
  const mk = (enabled: boolean): DayAvailability => ({
    enabled,
    ranges: enabled ? [{ id: newId(), start: "09:00", end: "17:00" }] : [],
  })
  return { mon: mk(true), tue: mk(true), wed: mk(true), thu: mk(true), fri: mk(true), sat: mk(false), sun: mk(false) }
}

export {
  AvailabilityScheduler,
  type AvailabilitySchedulerProps,
  type DayKey,
  type TimeRange,
  type DayAvailability,
  type WeekAvailability,
}

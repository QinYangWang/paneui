import { ScrollArea } from "@paneui/ui/components/scroll-area"

const RELEASES = [
  { version: "2.4.0", date: "Oct 14", note: "Accent presets and a blue default primary." },
  { version: "2.3.2", date: "Oct 9", note: "Faster table sorting on large datasets." },
  { version: "2.3.1", date: "Oct 2", note: "Fixed focus rings inside inset cards." },
  { version: "2.3.0", date: "Sep 25", note: "Pull to refresh and smooth scrolling." },
  { version: "2.2.4", date: "Sep 18", note: "Tooltips wait less before opening." },
  { version: "2.2.3", date: "Sep 11", note: "Dark mode contrast for muted text." },
  { version: "2.2.2", date: "Sep 4", note: "Combobox keeps the query after selecting." },
  { version: "2.2.1", date: "Aug 28", note: "Dialogs return focus to their trigger." },
  { version: "2.2.0", date: "Aug 21", note: "Editable table cells." },
  { version: "2.1.0", date: "Aug 7", note: "Command palette and keyboard shortcuts." },
]

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-full max-w-sm rounded-2xl bg-card shadow-raised">
      <ul className="divide-y divide-border">
        {RELEASES.map((r) => (
          <li key={r.version} className="flex flex-col gap-0.5 px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-sm font-medium text-foreground">{r.version}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{r.date}</span>
            </div>
            <p className="text-sm text-pretty text-muted-foreground">{r.note}</p>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

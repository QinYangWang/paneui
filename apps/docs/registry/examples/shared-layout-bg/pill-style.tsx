import { SharedLayoutBg, SharedLayoutBgItem } from "@paneui/ui/components/shared-layout-bg"

const people = [
  { name: "Mei Lin", role: "Design lead" },
  { name: "Kenji Sato", role: "Frontend" },
  { name: "Ana Ruiz", role: "Product" },
  { name: "Omar Haddad", role: "Infrastructure" },
]

export default function SharedLayoutBgPillStyle() {
  return (
    <SharedLayoutBg pillClassName="rounded-lg bg-primary/10 shadow-none" inset={8} className="w-full max-w-xs px-2">
      {people.map((p) => (
        <SharedLayoutBgItem
          key={p.name}
          render={<button type="button" />}
          className="h-11 justify-between gap-3 text-start text-sm outline-none"
        >
          <span className="font-medium">{p.name}</span>
          <span className="text-muted-foreground">{p.role}</span>
        </SharedLayoutBgItem>
      ))}
    </SharedLayoutBg>
  )
}

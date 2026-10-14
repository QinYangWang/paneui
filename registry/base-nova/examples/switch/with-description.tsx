import { Label } from "@/registry/base-nova/ui/label"
import { Switch } from "@/registry/base-nova/ui/switch"

const settings = [
  { id: "receipts", title: "Email receipts", description: "Send a copy of every order confirmation to your inbox.", on: true },
  { id: "weekly", title: "Weekly summary", description: "A Monday recap of spending and upcoming renewals.", on: false },
  { id: "alerts", title: "Price alerts", description: "Notify me when a saved item drops by 10% or more.", on: true },
]

export default function SwitchWithDescription() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {settings.map((s) => (
        <div key={s.id} className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor={s.id}>{s.title}</Label>
            <p className="text-sm text-pretty text-muted-foreground">{s.description}</p>
          </div>
          <Switch id={s.id} defaultChecked={s.on} />
        </div>
      ))}
    </div>
  )
}

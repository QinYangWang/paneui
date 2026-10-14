import { GlobeIcon, LockIcon, UsersIcon } from "@/components/icons"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const access = [
  { value: "private", label: "Only me", icon: LockIcon },
  { value: "team", label: "My team", icon: UsersIcon },
  { value: "public", label: "Anyone with the link", icon: GlobeIcon },
]

export default function SelectWithIcons() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label>Who can view</Label>
      <Select defaultValue="team">
        <SelectTrigger>
          <SelectValue>
            {(value: string) => {
              const item = access.find((a) => a.value === value)
              if (!item) return null
              const Icon = item.icon
              return (
                <span className="flex items-center gap-2">
                  <Icon className="text-muted-foreground" />
                  {item.label}
                </span>
              )
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {access.map(({ value, label, icon: Icon }) => (
            <SelectItem key={value} value={value}>
              <Icon className="text-muted-foreground" />
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

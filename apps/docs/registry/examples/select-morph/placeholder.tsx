import { Label } from "@paneui/ui/components/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@paneui/ui/components/select-morph"

const plans = [
  { value: null, label: "Choose a plan" },
  { value: "hobby", label: "Hobby" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
]

export default function SelectMorphPlaceholder() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Plan</Label>
      <MorphSelect items={plans}>
        <MorphSelectTrigger>
          <MorphSelectValue />
        </MorphSelectTrigger>
        <MorphSelectContent>
          {plans.slice(1).map((p) => (
            <MorphSelectItem key={p.value} value={p.value}>
              {p.label}
            </MorphSelectItem>
          ))}
        </MorphSelectContent>
      </MorphSelect>
    </div>
  )
}

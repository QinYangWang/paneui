import { Label } from "@paneui/ui/components/label"
import { MorphSelect, MorphSelectContent, MorphSelectItem, MorphSelectTrigger, MorphSelectValue } from "@paneui/ui/components/select-morph"

const sizes = [
  { value: "s", label: "Small · 1 vCPU" },
  { value: "m", label: "Medium · 2 vCPU" },
  { value: "l", label: "Large · 4 vCPU" },
  { value: "xl", label: "X-Large · 8 vCPU" },
]

export default function SelectMorphDisabled() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-end gap-4">
      <div className="flex w-full max-w-56 flex-col gap-2">
        <Label>Instance size</Label>
        <MorphSelect items={sizes} defaultValue="m">
          <MorphSelectTrigger>
            <MorphSelectValue />
          </MorphSelectTrigger>
          <MorphSelectContent>
            {sizes.map((s) => (
              <MorphSelectItem key={s.value} value={s.value} disabled={s.value === "xl"}>
                {s.label}
              </MorphSelectItem>
            ))}
          </MorphSelectContent>
        </MorphSelect>
      </div>
      <div className="flex w-full max-w-56 flex-col gap-2">
        <Label>Region (locked)</Label>
        <MorphSelect items={[{ value: "tpe", label: "Taipei" }]} defaultValue="tpe" disabled>
          <MorphSelectTrigger>
            <MorphSelectValue />
          </MorphSelectTrigger>
          <MorphSelectContent>
            <MorphSelectItem value="tpe">Taipei</MorphSelectItem>
          </MorphSelectContent>
        </MorphSelect>
      </div>
    </div>
  )
}

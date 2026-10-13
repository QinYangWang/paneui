import { Label } from "@/registry/base-nova/ui/label"
import {
  MorphSelect,
  MorphSelectContent,
  MorphSelectGroup,
  MorphSelectItem,
  MorphSelectLabel,
  MorphSelectSeparator,
  MorphSelectTrigger,
  MorphSelectValue,
} from "@/registry/base-nova/ui/select-morph"

const regions = [
  { value: null, label: "Pick a region" },
  { value: "tpe", label: "Taipei" },
  { value: "tyo", label: "Tokyo" },
  { value: "sin", label: "Singapore" },
  { value: "fra", label: "Frankfurt" },
  { value: "iad", label: "Virginia" },
]

export default function SelectMorphDemo() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-2">
      <Label>Deploy region</Label>
      <MorphSelect items={regions} defaultValue="tpe">
        <MorphSelectTrigger>
          <MorphSelectValue />
        </MorphSelectTrigger>
        <MorphSelectContent>
          <MorphSelectGroup>
            <MorphSelectLabel>Asia Pacific</MorphSelectLabel>
            {regions.slice(1, 4).map((r) => (
              <MorphSelectItem key={r.value} value={r.value}>
                {r.label}
              </MorphSelectItem>
            ))}
          </MorphSelectGroup>
          <MorphSelectSeparator />
          <MorphSelectGroup>
            <MorphSelectLabel>Europe &amp; US</MorphSelectLabel>
            {regions.slice(4).map((r) => (
              <MorphSelectItem key={r.value} value={r.value}>
                {r.label}
              </MorphSelectItem>
            ))}
          </MorphSelectGroup>
        </MorphSelectContent>
      </MorphSelect>
    </div>
  )
}

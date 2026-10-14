import { ArcPicker } from "@/registry/base-nova/ui/arc-picker"

const levels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "max", label: "Max" },
]

export default function ArcPickerDisabled() {
  return <ArcPicker aria-label="Fan speed" options={levels} defaultValue="medium" disabled className="w-48" />
}

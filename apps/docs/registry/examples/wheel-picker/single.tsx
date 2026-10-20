import { WheelPicker } from "@paneui/ui/components/wheel-picker"

const sizes = [
  { value: "xs", label: "Extra small" },
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra large" },
]

export default function WheelPickerSingle() {
  return (
    <div className="w-48">
      <WheelPicker aria-label="Shirt size" options={sizes} defaultValue="m" />
    </div>
  )
}

import { WheelPicker, WheelPickerGroup } from "@paneui/ui/components/wheel-picker"

export default function WheelPickerDisabled() {
  return (
    <WheelPickerGroup className="w-56">
      <WheelPicker aria-label="Month" options={["Jan", "Feb", "Mar", "Apr", "May"]} defaultValue="Mar" disabled />
      <WheelPicker aria-label="Day" options={["12", "13", "14", "15", "16"]} defaultValue="14" disabled />
    </WheelPickerGroup>
  )
}

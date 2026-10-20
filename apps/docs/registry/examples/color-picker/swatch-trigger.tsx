import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHue,
  ColorPickerPreset,
  ColorPickerPresets,
  ColorPickerTrigger,
} from "@paneui/ui/components/color-picker"

const labels = [
  { name: "Bug", color: "#dc2626" },
  { name: "Feature", color: "#2563eb" },
  { name: "Docs", color: "#16a34a" },
]

const presets = ["#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed"]

export default function ColorPickerSwatchTrigger() {
  return (
    <ul className="flex w-56 flex-col gap-2">
      {labels.map((l) => (
        <li key={l.name} className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">{l.name}</span>
          <ColorPicker defaultValue={l.color}>
            <ColorPickerTrigger showHex={false} aria-label={`${l.name} label colour`} />
            <ColorPickerContent align="end">
              <ColorPickerArea />
              <ColorPickerHue />
              <ColorPickerPresets>
                {presets.map((p) => (
                  <ColorPickerPreset key={p} value={p} />
                ))}
              </ColorPickerPresets>
            </ColorPickerContent>
          </ColorPicker>
        </li>
      ))}
    </ul>
  )
}

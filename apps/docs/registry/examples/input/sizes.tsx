import { Button } from "@paneui/ui/components/button"
import { Input } from "@paneui/ui/components/input"

const sizes = [
  { size: "xs", label: "Extra small" },
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
] as const

export default function InputSizes() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex items-center gap-2">
          <Input size={size} placeholder={label} aria-label={label} />
          <Button variant="secondary" size={size}>
            Save
          </Button>
        </div>
      ))}
    </div>
  )
}

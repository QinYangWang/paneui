import { NativeSelect, NativeSelectOption } from "@/registry/base-nova/ui/native-select"

export default function NativeSelectSizes() {
  return (
    <div className="flex w-48 flex-col gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <NativeSelect key={size} size={size} aria-label={`Sort (${size})`} defaultValue="recent">
          <NativeSelectOption value="recent">Most recent</NativeSelectOption>
          <NativeSelectOption value="name">Name</NativeSelectOption>
          <NativeSelectOption value="size">Size</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  )
}

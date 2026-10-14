import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperDecimals() {
  return (
    <div className="flex w-full max-w-xs items-center justify-between gap-6">
      <span className="text-sm font-medium">Playback speed</span>
      <Stepper
        aria-label="Playback speed"
        defaultValue={1}
        min={0.5}
        max={2}
        step={0.25}
        unit="×"
        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      />
    </div>
  )
}

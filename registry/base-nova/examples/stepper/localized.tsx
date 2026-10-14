import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperLocalized() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Nächte</span>
      <Stepper
        aria-label="Nächte"
        decrementLabel="Weniger"
        incrementLabel="Mehr"
        locale="de-DE"
        defaultValue={3}
        min={1}
        max={14}
      />
    </div>
  )
}

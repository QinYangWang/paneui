import { Stepper } from "@paneui/ui/components/stepper"

export default function StepperSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Stepper aria-label="Quantity" size="sm" defaultValue={1} min={0} />
      <Stepper aria-label="Quantity" defaultValue={1} min={0} />
    </div>
  )
}

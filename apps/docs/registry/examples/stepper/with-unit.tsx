import { Stepper } from "@paneui/ui/components/stepper"

export default function StepperWithUnit() {
  return (
    <div className="flex flex-col gap-3">
      <Stepper aria-label="Nights" unit="nights" defaultValue={3} min={1} max={30} />
      <Stepper aria-label="Rooms" unit="rooms" size="sm" defaultValue={1} min={1} max={4} />
    </div>
  )
}

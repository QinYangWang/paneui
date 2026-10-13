import { Stepper } from "@/registry/base-nova/ui/stepper"

export default function StepperDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Guests</span>
          <span className="text-xs text-muted-foreground">Up to 8 per table</span>
        </div>
        <Stepper aria-label="Guests" defaultValue={2} min={1} max={8} />
      </div>
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Monthly budget</span>
          <span className="text-xs text-muted-foreground">Steps of $50</span>
        </div>
        <Stepper
          aria-label="Monthly budget"
          size="sm"
          defaultValue={250}
          min={0}
          step={50}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
      </div>
    </div>
  )
}

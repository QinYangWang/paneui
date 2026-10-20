import { Label } from "@paneui/ui/components/label"
import { Radio, RadioGroup } from "@paneui/ui/components/radio"

const seats = [
  { value: "window", label: "Window", hint: "32A · views of the coast" },
  { value: "aisle", label: "Aisle", hint: "32C · easy to stretch" },
]

export default function RadioChoiceCards() {
  return (
    <RadioGroup defaultValue="window" aria-label="Seat" className="w-full max-w-xs gap-2">
      {seats.map((seat) => (
        <div
          key={seat.value}
          className="rounded-xl bg-card shadow-raised transition-shadow duration-200 has-data-checked:ring-2 has-data-checked:ring-primary"
        >
          <Label className="w-full gap-3 p-3">
            <Radio value={seat.value} />
            <span className="flex flex-col gap-1">
              {seat.label}
              <span className="text-xs font-normal text-muted-foreground">{seat.hint}</span>
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

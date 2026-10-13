import { Label } from "@/registry/base-nova/ui/label"
import { Radio, RadioGroup } from "@/registry/base-nova/ui/radio"

const plans = [
  { value: "starter", label: "Starter", hint: "1 agent · 500 runs" },
  { value: "pro", label: "Pro", hint: "5 agents · 10k runs" },
  { value: "team", label: "Team", hint: "Unlimited agents" },
]

export default function RadioDemo() {
  return (
    <RadioGroup defaultValue="pro" aria-label="Plan">
      {plans.map((plan) => (
        <Label key={plan.value} className="gap-3">
          <Radio value={plan.value} />
          <span className="flex flex-col gap-1">
            {plan.label}
            <span className="text-xs font-normal text-muted-foreground">{plan.hint}</span>
          </span>
        </Label>
      ))}
      <Label className="gap-3">
        <Radio value="enterprise" disabled />
        Enterprise (contact sales)
      </Label>
    </RadioGroup>
  )
}

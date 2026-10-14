import { Checkbox } from "@/registry/base-nova/ui/checkbox"
import { Label } from "@/registry/base-nova/ui/label"

export default function CheckboxWithDescription() {
  return (
    <Label className="max-w-xs items-start gap-3">
      <Checkbox defaultChecked />
      <span className="flex flex-col gap-1.5">
        Auto-approve small purchases
        <span className="text-xs leading-relaxed font-normal text-muted-foreground">
          Orders under $50 go through without asking. You still get a receipt.
        </span>
      </span>
    </Label>
  )
}

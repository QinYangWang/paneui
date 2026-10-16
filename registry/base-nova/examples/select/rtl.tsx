import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Label } from "@/registry/base-nova/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/base-nova/ui/select"

const fruits = [
  { value: "apple", label: "تفاح" },
  { value: "banana", label: "موز" },
  { value: "orange", label: "برتقال" },
  { value: "grape", label: "عنب" },
]

export default function SelectRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-56 flex-col gap-2">
        <Label>الفاكهة</Label>
        <Select items={fruits} defaultValue="banana">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </DirectionProvider>
  )
}

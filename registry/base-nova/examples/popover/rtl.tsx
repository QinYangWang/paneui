import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Label } from "@/registry/base-nova/ui/label"
import {
  Popover,
  PopoverClose,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Popover>
          <PopoverTrigger render={<Button variant="secondary" />}>تحديد ميزانية</PopoverTrigger>
          <PopoverContent align="start">
            <PopoverCloseButton aria-label="إغلاق" />
            <PopoverHeader className="pe-8">
              <PopoverTitle>الحد الشهري</PopoverTitle>
              <PopoverDescription>نسألك قبل أي شراء يتجاوزه.</PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="budget-rtl">المبلغ (دولار)</Label>
              <Input id="budget-rtl" defaultValue="250" inputMode="decimal" />
            </div>
            <PopoverFooter>
              <PopoverClose render={<Button variant="ghost" size="sm" />}>إلغاء</PopoverClose>
              <PopoverClose render={<Button size="sm" />}>حفظ</PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </DirectionProvider>
  )
}

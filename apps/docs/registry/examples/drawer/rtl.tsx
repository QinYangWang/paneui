"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@paneui/ui/components/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@paneui/ui/components/drawer"
import { Label } from "@paneui/ui/components/label"
import { Switch } from "@paneui/ui/components/switch"

const settings = [
  { label: "الموافقة التلقائية تحت ٥٠ دولارًا", on: true },
  { label: "ملخص يومي الساعة ٨:٠٠", on: true },
  { label: "تنبيهات حالة الرحلات", on: false },
]

export default function DrawerRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        {/* In right-to-left the start edge is on the right. */}
        <Drawer side="right">
          <DrawerTrigger render={<Button variant="secondary" />}>فتح الإعدادات</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>إعدادات المساعد</DrawerTitle>
              <DrawerDescription>اختر ما يمكن تنفيذه دون الرجوع إليك.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="flex flex-col gap-4">
              {settings.map((s) => (
                <Label key={s.label} className="justify-between gap-3">
                  {s.label}
                  <Switch defaultChecked={s.on} />
                </Label>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose render={<Button variant="ghost" />}>إلغاء</DrawerClose>
              <DrawerClose render={<Button />}>حفظ</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </DirectionProvider>
  )
}

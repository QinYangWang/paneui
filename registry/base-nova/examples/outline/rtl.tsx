import { DirectionProvider } from "@base-ui/react/direction-provider"

import { Outline, type OutlineItem } from "@/registry/base-nova/ui/outline"

const items: OutlineItem[] = [
  { id: "outline-rtl-install", title: "التثبيت", depth: 2 },
  { id: "outline-rtl-usage", title: "الاستخدام", depth: 2 },
  { id: "outline-rtl-props", title: "الخصائص", depth: 3 },
  { id: "outline-rtl-a11y", title: "إمكانية الوصول", depth: 2 },
]

export default function OutlineRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Outline items={items} title="في هذه الصفحة" backToTop={false} maxHeight="16rem" className="w-56" />
      </div>
    </DirectionProvider>
  )
}

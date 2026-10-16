"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@/registry/base-nova/ui/button"
import { ToastProvider, useToast } from "@/registry/base-nova/ui/toast"

function Trigger() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() => toast.add({ title: "تم تقديم الطلب", description: "تصل ٢٠٠ قطعة يوم الخميس.", type: "success" })}
    >
      إظهار إشعار
    </Button>
  )
}

export default function ToastRtl() {
  return (
    <DirectionProvider direction="rtl">
      {/* A provider inside the direction provider puts its toasts at the bottom left. */}
      <ToastProvider>
        <div dir="rtl">
          <Trigger />
        </div>
      </ToastProvider>
    </DirectionProvider>
  )
}

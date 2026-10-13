"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

export default function ToastDemo() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Order placed", description: "200 waffle cones arrive Thursday.", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "Sync failed",
            description: "The accounting token expired.",
            type: "error",
            actionProps: { children: "Reconnect" },
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          const id = toast.add({ title: "Forecasting…", description: "Reading 8 weeks of sales.", type: "loading", timeout: 0 })
          setTimeout(() => toast.update(id, { title: "Forecast ready", description: "About 4 days of stock left.", type: "success", timeout: 4000 }), 1800)
        }}
      >
        Loading → done
      </Button>
    </div>
  )
}

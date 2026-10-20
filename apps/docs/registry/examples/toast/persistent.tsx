"use client"

import { Button } from "@paneui/ui/components/button"
import { useToast } from "@paneui/ui/components/toast"

export default function ToastPersistent() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: "You’re offline",
            description: "Changes are saved on this device and sync when you reconnect.",
            type: "warning",
            timeout: 0,
            priority: "high",
          })
        }
      >
        Show until dismissed
      </Button>
      <Button variant="ghost" onClick={() => toast.close()}>
        Dismiss all
      </Button>
    </div>
  )
}

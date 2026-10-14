"use client"

import { Button } from "@/registry/base-nova/ui/button"
import { useToast } from "@/registry/base-nova/ui/toast"

export default function ToastTypes() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Invoice sent", description: "Acme Co. will get it in a minute.", type: "success" })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Payment declined", description: "The card ending 4242 was refused.", type: "error" })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "Storage almost full", description: "You’ve used 9.4 of 10 GB.", type: "warning" })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ title: "New version available", description: "Reload to get the latest fixes.", type: "info" })}
      >
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast.add({ title: "Draft saved" })}>
        Plain
      </Button>
    </div>
  )
}

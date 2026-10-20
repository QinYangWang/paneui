"use client"

import { Button } from "@paneui/ui/components/button"
import { useToast } from "@paneui/ui/components/toast"

export default function ToastWithAction() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        const id = toast.add({
          title: "3 emails archived",
          description: "They’re in All mail if you need them.",
          actionProps: {
            children: "Undo",
            onClick: () => {
              toast.close(id)
              toast.add({ title: "Moved back to Inbox", type: "success" })
            },
          },
        })
      }}
    >
      Archive selected
    </Button>
  )
}

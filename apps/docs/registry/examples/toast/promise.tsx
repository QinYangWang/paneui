"use client"

import { Button } from "@paneui/ui/components/button"
import { useToast } from "@paneui/ui/components/toast"

function exportReport() {
  return new Promise<number>((resolve) => setTimeout(() => resolve(128), 2000))
}

export default function ToastPromise() {
  const toast = useToast()
  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.promise(exportReport(), {
          loading: { title: "Exporting report…", type: "loading" },
          success: (rows) => ({ title: "Report ready", description: `${rows} rows saved to Downloads.`, type: "success" }),
          error: { title: "Export failed", description: "Check your connection and try again.", type: "error" },
        })
      }
    >
      Export CSV
    </Button>
  )
}

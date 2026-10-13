"use client"

import * as React from "react"

import {
  AttachmentUpload,
  type AttachmentItem,
  type AttachmentUploadHandler,
} from "@/registry/base-nova/blocks/attachment-upload/attachment-upload"

const seed: AttachmentItem[] = [
  { id: "s-1", kind: "image", name: "patio-golden-hour.jpg", size: 3_400_000, status: "success" },
  { id: "s-2", kind: "file", name: "lease-renewal-2027.pdf", size: 1_250_000, status: "uploading" },
  { id: "s-3", kind: "image", name: "new-signage-mockup.png", size: 2_100_000, status: "uploading" },
  { id: "s-4", kind: "link", name: "Permit application portal", href: "https://example.com/permits" },
  { id: "s-5", kind: "file", name: "floorplan-v4.dwg", size: 22_800_000, status: "error", error: "Network lost at 61%" },
]

export default function AttachmentUploadDemo() {
  const added = React.useRef(0)
  const upload = React.useCallback<AttachmentUploadHandler>((item, { onProgress, signal }) => {
    // Simulated: every third freshly added file fails once, so retry is easy to try.
    const fresh = !item.id.startsWith("s-") && item.progress === 0 && item.status !== "error"
    if (fresh) added.current += 1
    const fail = fresh && added.current % 3 === 0
    const duration = Math.min(4000, 1400 + (item.size ?? 0) / 5000)
    return new Promise<void>((resolve, reject) => {
      const t0 = performance.now()
      const id = window.setInterval(() => {
        const t = (performance.now() - t0) / duration
        if (fail && t > 0.5) {
          window.clearInterval(id)
          reject(new Error("Server rejected the chunk"))
        } else if (t >= 1) {
          window.clearInterval(id)
          resolve()
        } else onProgress(100 * (1 - Math.pow(1 - t, 2.2)))
      }, 80)
      signal.addEventListener("abort", () => window.clearInterval(id))
    })
  }, [])

  return (
    <AttachmentUpload
      className="w-full max-w-md"
      defaultValue={seed}
      upload={upload}
      maxFiles={10}
      maxFileSize={100 * 1024 * 1024}
      label="Renovation files"
    />
  )
}

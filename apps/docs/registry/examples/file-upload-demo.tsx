"use client"

import * as React from "react"

import { FileUpload, type FileUploadHandler, type FileUploadItem } from "@paneui/ui/blocks/file-upload/file-upload"

const seed: FileUploadItem[] = [
  { id: "seed-1", name: "q3-menu-photos.zip", size: 18_400_000, status: "success", progress: 100 },
  { id: "seed-2", name: "supplier-invoice-0412.pdf", size: 412_000, status: "uploading", progress: 0 },
  { id: "seed-3", name: "storefront-night.heic", size: 6_200_000, status: "error", error: "Connection dropped" },
]

// Simulated uploader: speed scales with size, and every 4th new file fails on its first attempt.
function useFakeUpload(): FileUploadHandler {
  const attempts = React.useRef(new Map<string, number>())
  const count = React.useRef(0)
  return React.useCallback<FileUploadHandler>((item, { onProgress, signal }) => {
    const tries = (attempts.current.get(item.id) ?? 0) + 1
    attempts.current.set(item.id, tries)
    if (tries === 1 && !item.id.startsWith("seed")) count.current += 1
    const shouldFail = tries === 1 && count.current % 4 === 0 && !item.id.startsWith("seed")
    const duration = Math.min(4200, 1100 + item.size / 6000)
    return new Promise<void>((resolve, reject) => {
      const startedAt = performance.now()
      const timer = window.setInterval(() => {
        const t = (performance.now() - startedAt) / duration
        if (shouldFail && t > 0.55) {
          window.clearInterval(timer)
          reject(new Error("Server timed out"))
          return
        }
        if (t >= 1) {
          window.clearInterval(timer)
          resolve()
          return
        }
        onProgress(100 * (1 - Math.pow(1 - t, 2)))
      }, 90)
      signal.addEventListener("abort", () => window.clearInterval(timer))
    })
  }, [])
}

export default function FileUploadDemo() {
  const upload = useFakeUpload()
  return (
    <FileUpload
      className="w-full max-w-md"
      defaultValue={seed}
      upload={upload}
      maxFiles={8}
      maxFileSize={50 * 1024 * 1024}
      title="Drop receipts, photos or exports"
      description="PDF, images and archives"
    />
  )
}

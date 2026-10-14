"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react"

import {
  AlertCircleIcon,
  AttachIcon,
  CheckIcon,
  FileIcon,
  GlobeIcon,
  ImageIcon,
  PlusIcon,
  RefreshIcon,
  XIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

export type AttachmentKind = "file" | "image" | "link"
export type AttachmentStatus = "queued" | "uploading" | "success" | "error"
export type AttachmentRejectReason = "too-large" | "max-files"

export type AttachmentItem = {
  id: string
  name: string
  kind: AttachmentKind
  size?: number
  type?: string
  /** For links. */
  href?: string
  /** Image preview source (object URL, data URL or remote). Falls back to a generated gradient. */
  previewUrl?: string
  /** 0–100 */
  progress?: number
  status?: AttachmentStatus
  error?: string
  file?: File
}

export type AttachmentUploadHandler = (
  item: AttachmentItem,
  helpers: { onProgress: (progress: number) => void; signal: AbortSignal }
) => Promise<void>

export interface AttachmentUploadProps {
  value?: AttachmentItem[]
  defaultValue?: AttachmentItem[]
  onValueChange?: (items: AttachmentItem[]) => void
  /** Uploads one item; report progress, resolve on success, throw to fail. Drives queued and retried items. */
  upload?: AttachmentUploadHandler
  onFilesAdded?: (items: AttachmentItem[], files: File[]) => void
  onFilesRejected?: (files: File[], reason: AttachmentRejectReason) => void
  onRemove?: (item: AttachmentItem) => void
  onRetry?: (item: AttachmentItem) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  /** Bytes. */
  maxFileSize?: number
  disabled?: boolean
  title?: string
  description?: string
  label?: string
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const
const iconButton =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,scale] duration-150 ease-out outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"

function formatBytes(bytes?: number) {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes <= 0) return ""
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  const v = bytes / 1024 ** i
  return `${v >= 10 || i === 0 ? Math.round(v) : v.toFixed(1)} ${units[i]}`
}

function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return Math.abs(h)
}

/** Deterministic two-stop gradient used when an image has no preview yet. */
export function attachmentGradient(seed: string) {
  const h = hash(seed) % 360
  return `linear-gradient(135deg, oklch(0.78 0.12 ${h}), oklch(0.58 0.16 ${(h + 55) % 360}))`
}

let counter = 0
export function createAttachment(file: File): AttachmentItem {
  counter += 1
  const image = file.type.startsWith("image/")
  return {
    id: `att-${Date.now().toString(36)}-${counter}`,
    name: file.name,
    kind: image ? "image" : "file",
    size: file.size,
    type: file.type,
    previewUrl: image && typeof URL !== "undefined" ? URL.createObjectURL(file) : undefined,
    progress: 0,
    status: "queued",
    file,
  }
}

function useItemList(
  value: AttachmentItem[] | undefined,
  defaultValue: AttachmentItem[] | undefined,
  onValueChange: ((items: AttachmentItem[]) => void) | undefined
) {
  const [internal, setInternal] = React.useState<AttachmentItem[]>(defaultValue ?? [])
  const items = value ?? internal
  const latest = React.useRef(items)
  latest.current = items
  const cb = React.useRef(onValueChange)
  cb.current = onValueChange
  const controlled = value !== undefined
  const update = React.useCallback(
    (updater: (items: AttachmentItem[]) => AttachmentItem[]) => {
      const next = updater(latest.current)
      latest.current = next
      if (!controlled) setInternal(next)
      cb.current?.(next)
    },
    [controlled]
  )
  return [items, update] as const
}

function ProgressRing({ progress }: { progress: number }) {
  const r = 9
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 24 24" className="size-6 -rotate-90" aria-hidden>
      <circle cx="12" cy="12" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/35" />
      <motion.circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - Math.max(0.04, progress / 100)) }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
      />
    </svg>
  )
}

function Thumb({ item, layout }: { item: AttachmentItem; layout: boolean }) {
  const status = item.status ?? "queued"
  return (
    <motion.span
      layoutId={layout ? `attachment-preview-${item.id}` : undefined}
      className="relative block size-full overflow-hidden rounded-[inherit] bg-cover bg-center"
      style={{
        backgroundImage: item.previewUrl ? `url("${item.previewUrl}")` : attachmentGradient(item.name),
      }}
    >
      <AnimatePresence>
        {(status === "uploading" || status === "queued") && (
          <motion.span
            key="ring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/35"
          >
            <ProgressRing progress={item.progress ?? 0} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  )
}

function StatusMark({ status }: { status: AttachmentStatus }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {status === "success" && (
        <motion.span
          key="ok"
          initial={reduce ? { opacity: 0 } : { scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{ type: "spring", stiffness: 520, damping: 22 }}
          className="inline-flex size-5 items-center justify-center rounded-full bg-success text-white"
          aria-label="Uploaded"
        >
          <CheckIcon size={12} />
        </motion.span>
      )}
      {status === "error" && (
        <motion.span
          key="err"
          initial={reduce ? { opacity: 0 } : { x: -4, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { x: [0, -3, 3, -2, 0], opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex text-destructive"
          aria-label="Failed"
        >
          <AlertCircleIcon size={17} />
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function AttachmentRow({
  item,
  delay,
  onRemove,
  onRetry,
  onPreview,
  previewing,
  disabled,
}: {
  item: AttachmentItem
  delay: number
  onRemove: (item: AttachmentItem) => void
  onRetry: (item: AttachmentItem) => void
  onPreview: (item: AttachmentItem) => void
  previewing: boolean
  disabled?: boolean
}) {
  const reduce = useReducedMotion()
  const status = item.status ?? (item.kind === "link" ? "success" : "queued")
  const progress = status === "success" ? 100 : Math.min(100, Math.max(0, item.progress ?? 0))
  const meta =
    item.kind === "link"
      ? item.href?.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : status === "uploading"
        ? `${Math.round(progress)}% of ${formatBytes(item.size)}`
        : status === "queued"
          ? `Waiting · ${formatBytes(item.size)}`
          : status === "error"
            ? (item.error ?? "Upload failed")
            : formatBytes(item.size)

  return (
    <motion.li
      layout={!reduce}
      data-slot="attachment-row"
      data-kind={item.kind}
      data-status={status}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.96, filter: "blur(4px)", transition: { duration: 0.2, ease: EASE } }
      }
      transition={{ type: "spring", stiffness: 380, damping: 32, delay }}
      className={cn(
        "group/row relative flex items-center gap-3 overflow-hidden rounded-2xl p-2 pr-1.5 transition-colors",
        status === "error" ? "bg-destructive/6" : "hover:bg-muted/60"
      )}
    >
      {item.kind === "image" ? (
        <button
          type="button"
          onClick={() => onPreview(item)}
          aria-label={`Preview ${item.name}`}
          className="relative size-11 shrink-0 cursor-zoom-in rounded-xl shadow-raised outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {!previewing && <Thumb item={item} layout={!reduce} />}
        </button>
      ) : (
        <span
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted shadow-well",
            status === "error" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {item.kind === "link" ? <GlobeIcon size={18} /> : <FileIcon size={18} />}
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          {item.kind === "link" && item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="truncate text-ui font-medium underline-offset-4 outline-none hover:underline focus-visible:underline"
            >
              {item.name}
            </a>
          ) : (
            <span className="truncate text-ui font-medium" title={item.name}>
              {item.name}
            </span>
          )}
          <StatusMark status={status} />
        </div>
        <span
          className={cn("truncate text-ui-sm tabular-nums", status === "error" ? "text-destructive" : "text-muted-foreground")}
        >
          {meta}
        </span>
        {item.kind === "file" && (status === "uploading" || status === "queued") && (
          <div
            role="progressbar"
            aria-label={`Uploading ${item.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="relative mt-0.5 h-1 w-full overflow-hidden rounded-full bg-muted shadow-well"
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              initial={false}
              animate={{ width: `${Math.max(3, progress)}%` }}
              transition={{ type: "spring", stiffness: 170, damping: 26 }}
            />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center">
        {status === "error" && (
          <button
            type="button"
            className={iconButton}
            onClick={() => onRetry(item)}
            disabled={disabled}
            aria-label={`Retry ${item.name}`}
          >
            <RefreshIcon size={15} />
          </button>
        )}
        <button
          type="button"
          className={cn(iconButton, "sm:opacity-0 sm:group-hover/row:opacity-100 sm:focus-visible:opacity-100", status === "error" && "sm:opacity-100")}
          onClick={() => onRemove(item)}
          disabled={disabled}
          aria-label={`Remove ${item.name}`}
        >
          <XIcon size={15} />
        </button>
      </div>
    </motion.li>
  )
}

export function AttachmentUpload({
  value,
  defaultValue,
  onValueChange,
  upload,
  onFilesAdded,
  onFilesRejected,
  onRemove,
  onRetry,
  accept,
  multiple = true,
  maxFiles,
  maxFileSize,
  disabled = false,
  title = "Drag files here",
  description = "Images, documents and archives",
  label = "Attachments",
  className,
}: AttachmentUploadProps) {
  const reduce = useReducedMotion()
  const [items, setItems] = useItemList(value, defaultValue, onValueChange)
  const [dragging, setDragging] = React.useState(false)
  const [previewId, setPreviewId] = React.useState<string | null>(null)
  const [announcement, setAnnouncement] = React.useState("")
  const depth = React.useRef(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const staggers = React.useRef(new Map<string, number>())
  const controllers = React.useRef(new Map<string, AbortController>())
  const uploadRef = React.useRef(upload)
  uploadRef.current = upload

  const patch = React.useCallback(
    (id: string, next: Partial<AttachmentItem>) =>
      setItems((all) => all.map((it) => (it.id === id ? { ...it, ...next } : it))),
    [setItems]
  )

  const start = React.useCallback(
    (item: AttachmentItem) => {
      const run = uploadRef.current
      if (!run || controllers.current.has(item.id)) return
      const controller = new AbortController()
      controllers.current.set(item.id, controller)
      patch(item.id, { status: "uploading", progress: 0, error: undefined })
      run(item, {
        signal: controller.signal,
        onProgress: (p) => {
          if (!controller.signal.aborted) patch(item.id, { progress: Math.min(99, Math.max(0, p)) })
        },
      })
        .then(() => {
          if (controller.signal.aborted) return
          patch(item.id, { status: "success", progress: 100 })
          setAnnouncement(`${item.name} uploaded`)
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          const message = err instanceof Error ? err.message : "Upload failed"
          patch(item.id, { status: "error", error: message })
          setAnnouncement(`${item.name} failed`)
        })
        .finally(() => {
          if (controllers.current.get(item.id) === controller) controllers.current.delete(item.id)
        })
    },
    [patch]
  )

  React.useEffect(() => {
    if (!upload) return
    for (const item of items) {
      if (item.kind === "link") continue
      const status = item.status ?? "queued"
      if (status === "queued" || (status === "uploading" && !controllers.current.has(item.id))) start(item)
    }
  }, [items, upload, start])

  React.useEffect(() => {
    const map = controllers.current
    return () => {
      map.forEach((c) => c.abort())
      map.clear()
    }
  }, [])

  const addFiles = (list: FileList | null) => {
    if (!list || disabled) return
    let files = Array.from(list)
    if (!multiple) files = files.slice(0, 1)
    if (maxFileSize !== undefined) {
      const tooLarge = files.filter((f) => f.size > maxFileSize)
      if (tooLarge.length) {
        onFilesRejected?.(tooLarge, "too-large")
        setAnnouncement(`${tooLarge.length} file${tooLarge.length === 1 ? " is" : "s are"} over ${formatBytes(maxFileSize)}`)
      }
      files = files.filter((f) => f.size <= maxFileSize)
    }
    if (maxFiles !== undefined) {
      const room = Math.max(0, maxFiles - items.length)
      if (files.length > room) {
        onFilesRejected?.(files.slice(room), "max-files")
        files = files.slice(0, room)
      }
    }
    if (!files.length) return
    const created = files.map(createAttachment)
    created.forEach((it, i) => staggers.current.set(it.id, i * 0.06))
    setItems((all) => (multiple ? [...all, ...created] : created))
    onFilesAdded?.(created, files)
    setAnnouncement(`${created.length} attachment${created.length === 1 ? "" : "s"} added`)
  }

  const remove = (item: AttachmentItem) => {
    controllers.current.get(item.id)?.abort()
    controllers.current.delete(item.id)
    if (item.file && item.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(item.previewUrl)
    setItems((all) => all.filter((it) => it.id !== item.id))
    onRemove?.(item)
    setAnnouncement(`${item.name} removed`)
  }

  const retry = (item: AttachmentItem) => {
    onRetry?.(item)
    staggers.current.set(item.id, 0)
    if (uploadRef.current) start(item)
    else patch(item.id, { status: "queued", progress: 0, error: undefined })
  }

  const full = maxFiles !== undefined && items.length >= maxFiles
  const inactive = disabled || full
  const compact = items.length > 0
  const preview = items.find((i) => i.id === previewId) ?? null
  const uploading = items.filter((i) => i.status === "uploading" || i.status === "queued").length

  return (
    <LayoutGroup>
      <div
        data-slot="attachment-upload"
        className={cn(
          "flex w-full flex-col gap-3 rounded-3xl bg-card p-3 shadow-raised",
          className
        )}
      >
        <div className="flex items-center justify-between gap-2 px-1.5 pt-0.5">
          <div className="flex items-center gap-2 text-ui font-medium">
            <AttachIcon size={16} className="text-muted-foreground" />
            {label}
            {items.length > 0 && (
              <span className="rounded-full bg-muted px-1.5 text-ui-sm leading-5 text-muted-foreground tabular-nums shadow-well">
                {items.length}
              </span>
            )}
          </div>
          <span className="text-ui-sm text-muted-foreground tabular-nums" aria-hidden>
            {uploading > 0 ? `Uploading ${uploading}…` : items.length > 0 ? "All synced" : ""}
          </span>
        </div>

        <motion.div
          layout={!reduce}
          data-slot="attachment-dropzone"
          data-dragging={dragging || undefined}
          onDragEnter={(e) => {
            e.preventDefault()
            if (inactive) return
            depth.current += 1
            setDragging(true)
          }}
          onDragOver={(e) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = inactive ? "none" : "copy"
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            depth.current = Math.max(0, depth.current - 1)
            if (!depth.current) setDragging(false)
          }}
          onDrop={(e) => {
            e.preventDefault()
            depth.current = 0
            setDragging(false)
            if (!inactive) addFiles(e.dataTransfer.files)
          }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className={cn(
            "relative flex rounded-2xl bg-background dark:bg-input/32 shadow-well transition-colors",
            "outline-2 -outline-offset-6 outline-transparent outline-dashed",
            compact ? "items-center gap-3 px-3 py-2.5" : "flex-col items-center gap-2.5 px-6 py-8 text-center",
            dragging && "bg-primary/8 outline-primary/50",
            inactive && "opacity-60"
          )}
        >
          <motion.span
            layout={!reduce}
            animate={reduce ? undefined : { y: dragging ? -3 : 0, rotate: dragging ? -8 : 0 }}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-xl bg-card shadow-raised",
              compact ? "size-8" : "size-11",
              dragging ? "text-primary" : "text-muted-foreground"
            )}
          >
            <AttachIcon size={compact ? 16 : 20} />
          </motion.span>
          <motion.div layout={!reduce ? "position" : false} className="flex min-w-0 flex-1 flex-col">
            <span className="text-ui font-medium">{dragging ? "Release to attach" : full ? "Attachment limit reached" : title}</span>
            {!compact && (
              <span className="text-ui-sm text-muted-foreground">
                {description}
                {maxFileSize !== undefined && ` · up to ${formatBytes(maxFileSize)} each`}
              </span>
            )}
          </motion.div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            tabIndex={-1}
            accept={accept}
            multiple={multiple}
            disabled={inactive}
            onChange={(e) => {
              addFiles(e.currentTarget.files)
              e.currentTarget.value = ""
            }}
          />
          <motion.button
            layout={!reduce ? "position" : false}
            type="button"
            disabled={inactive}
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-card pr-3.5 pl-2.5 text-ui-sm font-medium text-secondary-foreground shadow-raised transition-[box-shadow,background-color,scale] duration-150 ease-out outline-none hover:bg-accent hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none"
          >
            <PlusIcon size={14} />
            {compact ? "Add" : "Choose files"}
          </motion.button>
        </motion.div>

        {items.length > 0 && (
          <ul data-slot="attachment-list" aria-label={label} className="flex flex-col gap-0.5">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item) => (
                <AttachmentRow
                  key={item.id}
                  item={item}
                  delay={staggers.current.get(item.id) ?? 0}
                  onRemove={remove}
                  onRetry={retry}
                  onPreview={(it) => setPreviewId(it.id)}
                  previewing={previewId === item.id}
                  disabled={disabled}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}

        <span aria-live="polite" className="sr-only">
          {announcement}
        </span>
      </div>

      <DialogPrimitive.Root open={preview !== null} onOpenChange={(open) => !open && setPreviewId(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/45 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <DialogPrimitive.Popup
            className="fixed inset-0 z-50 flex items-center justify-center p-6 outline-none"
            onClick={(e) => e.target === e.currentTarget && setPreviewId(null)}
          >
            {preview && (
              <div className="flex w-full max-w-lg flex-col gap-3">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-surface">
                  <Thumb item={preview} layout={!reduce} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.25, ease: EASE }}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-popover px-4 py-2.5 text-popover-foreground shadow-surface"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <ImageIcon size={16} className="shrink-0 text-muted-foreground" />
                    <DialogPrimitive.Title className="truncate text-ui font-medium">{preview.name}</DialogPrimitive.Title>
                    <span className="shrink-0 text-ui-sm text-muted-foreground">{formatBytes(preview.size)}</span>
                  </div>
                  <DialogPrimitive.Close aria-label="Close preview" className={iconButton}>
                    <XIcon size={15} />
                  </DialogPrimitive.Close>
                </motion.div>
              </div>
            )}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </LayoutGroup>
  )
}

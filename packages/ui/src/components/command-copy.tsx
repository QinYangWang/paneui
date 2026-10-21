"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { CheckIcon, CopyIcon } from "@paneui/ui/icons"
import { cn } from "@paneui/ui/lib/utils"
import { ActionSwapBlurIcon } from "@paneui/ui/components/action-swap-blur"
import { Button } from "@paneui/ui/components/button"
import { useLocale } from "@paneui/ui/components/locale-provider"

/*
 * One shell command on a bar with a copy button. The command scrolls sideways when it does not
 * fit; the prompt glyph is decoration and never ends up in the copy. `lg` is the round hero bar
 * with a solid round button; `default` is a quieter bar for docs and settings.
 */
const commandCopyVariants = cva("flex w-full min-w-0 items-center text-card-foreground", {
  variants: {
    variant: {
      default: "bg-card shadow-raised",
      floating: "bg-card/80 shadow-xl backdrop-blur-xl",
    },
    size: {
      // The ghost button sits 6px from the bar's edge, so its corners follow the bar's.
      default: "frame-xl frame-inset-1.5 h-10 gap-2 ps-3 pe-1.5 text-ui",
      lg: "h-14 gap-3 rounded-full ps-4 pe-2 text-ui-sm sm:ps-6 sm:text-ui-lg",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function useCopied(timeout = 1600) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard?.writeText(text)
      } catch {
        // Clipboard blocked: leave the button as it is.
        return false
      }
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), timeout)
      return true
    },
    [timeout]
  )
  return { copied, copy }
}

type CommandCopyProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof commandCopyVariants> & {
    /** The command, exactly as it is copied. */
    command: string
    /** Glyph before the command; `null` hides it. */
    prompt?: React.ReactNode
    /** Accessible name of the copy button. Defaults to the locale's "Copy command". */
    label?: string
    /** Called after the command reaches the clipboard. */
    onCopy?: (command: string) => void
  }

function CommandCopy({
  command,
  prompt = "$",
  label,
  onCopy,
  variant = "default",
  size = "default",
  className,
  ...props
}: CommandCopyProps) {
  const { labels } = useLocale()
  const { copied, copy } = useCopied()
  const lg = size === "lg"
  return (
    <div
      data-slot="command-copy"
      data-variant={variant}
      data-size={size}
      className={cn(commandCopyVariants({ variant, size }), className)}
      {...props}
    >
      <code
        data-slot="command-copy-command"
        className="min-w-0 flex-1 overflow-x-auto text-start font-mono whitespace-nowrap scrollbar-none"
      >
        {prompt != null ? (
          <span aria-hidden className="text-muted-foreground select-none">
            {prompt}{" "}
          </span>
        ) : null}
        {command}
      </code>
      <Button
        data-slot="command-copy-button"
        variant={lg ? "inverse" : "ghost"}
        shape={lg ? "pill" : "default"}
        size={lg ? "icon-lg" : "icon-sm"}
        aria-label={copied ? labels.copied : (label ?? labels.copyCommand)}
        onClick={async () => {
          if (await copy(command)) onCopy?.(command)
        }}
        className={cn(lg ? "size-10" : "rounded-inner text-muted-foreground hover:text-foreground")}
      >
        <ActionSwapBlurIcon value={copied ? "copied" : "copy"}>
          {/* Full strength: the glyph is the whole button. */}
          {copied ? <CheckIcon size={16} className="opacity-100" /> : <CopyIcon size={16} className="opacity-100" />}
        </ActionSwapBlurIcon>
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? labels.copied : ""}
      </span>
    </div>
  )
}

export { CommandCopy, commandCopyVariants, type CommandCopyProps }

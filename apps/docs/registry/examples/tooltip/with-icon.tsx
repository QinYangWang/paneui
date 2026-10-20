import { InfoIcon, LockIcon } from "@paneui/ui/icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "@paneui/ui/components/tooltip"

export default function TooltipWithIcon() {
  return (
    <p className="max-w-sm text-center text-sm text-pretty text-muted-foreground">
      Your API key is stored{" "}
      <Tooltip>
        <TooltipTrigger render={<span tabIndex={0} />}>
          <span className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4">
            encrypted
            <InfoIcon size={14} className="text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <LockIcon size={14} />
          AES-256 at rest, never logged
        </TooltipContent>
      </Tooltip>{" "}
      and only used for requests you start.
    </p>
  )
}

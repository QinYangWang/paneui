import { Button } from "@paneui/ui/components/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@paneui/ui/components/tooltip"

export default function TooltipDelay() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" />}>Instant</TooltipTrigger>
          <TooltipContent>Shows with no delay</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delay={1000}>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" />}>Patient</TooltipTrigger>
          <TooltipContent>Shows after one second</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

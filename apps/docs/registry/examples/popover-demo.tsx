import { BellIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { Input } from "@paneui/ui/components/input"
import { Label } from "@paneui/ui/components/label"
import {
  Popover,
  PopoverClose,
  PopoverCloseButton,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@paneui/ui/components/popover"

export default function PopoverDemo() {
  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>Set a budget</PopoverTrigger>
        <PopoverContent align="start">
          <PopoverCloseButton />
          <PopoverHeader className="pr-8">
            <PopoverTitle>Monthly limit</PopoverTitle>
            <PopoverDescription>Hark asks before any purchase that would go over it.</PopoverDescription>
          </PopoverHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budget">Amount (USD)</Label>
            <Input id="budget" defaultValue="250" inputMode="decimal" />
          </div>
          <PopoverFooter>
            <PopoverClose render={<Button variant="ghost" size="sm" />}>Cancel</PopoverClose>
            <PopoverClose render={<Button size="sm" />}>Save</PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Notifications" />}>
          <BellIcon />
        </PopoverTrigger>
        <PopoverContent side="bottom" align="end" className="w-64">
          <PopoverTitle>All caught up</PopoverTitle>
          <PopoverDescription>No new approvals. Your flight check-in opens tomorrow at 9:00.</PopoverDescription>
        </PopoverContent>
      </Popover>
    </div>
  )
}

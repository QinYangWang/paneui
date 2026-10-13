import { BellIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import {
  MorphPopover,
  MorphPopoverClose,
  MorphPopoverCloseButton,
  MorphPopoverContent,
  MorphPopoverDescription,
  MorphPopoverFooter,
  MorphPopoverHeader,
  MorphPopoverTitle,
  MorphPopoverTrigger,
} from "@/registry/base-nova/ui/popover-morph"
import { Switch } from "@/registry/base-nova/ui/switch"
import { Label } from "@/registry/base-nova/ui/label"

export default function PopoverMorphDemo() {
  return (
    <MorphPopover>
      <MorphPopoverTrigger>
        <BellIcon />
        Alerts
      </MorphPopoverTrigger>
      <MorphPopoverContent>
        <MorphPopoverCloseButton />
        <MorphPopoverHeader>
          <MorphPopoverTitle>Deploy alerts</MorphPopoverTitle>
          <MorphPopoverDescription>Choose what pings you when a build ships.</MorphPopoverDescription>
        </MorphPopoverHeader>
        <div className="flex flex-col gap-2.5">
          <Label className="justify-between">
            Failed builds
            <Switch defaultChecked />
          </Label>
          <Label className="justify-between">
            Production deploys
            <Switch defaultChecked />
          </Label>
          <Label className="justify-between">
            Preview links
            <Switch />
          </Label>
        </div>
        <MorphPopoverFooter>
          <MorphPopoverClose render={<Button size="sm" />}>Done</MorphPopoverClose>
        </MorphPopoverFooter>
      </MorphPopoverContent>
    </MorphPopover>
  )
}

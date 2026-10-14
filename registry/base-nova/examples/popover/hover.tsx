import { Button } from "@/registry/base-nova/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/base-nova/ui/popover"

export default function PopoverHover() {
  return (
    <p className="text-sm text-muted-foreground">
      Assigned to{" "}
      <Popover>
        <PopoverTrigger openOnHover delay={200} render={<Button variant="link" />}>
          Dana Reyes
        </PopoverTrigger>
        <PopoverContent side="top" className="w-64">
          <PopoverHeader>
            <PopoverTitle>Dana Reyes</PopoverTitle>
            <PopoverDescription>Product designer · Lisbon · usually replies within an hour.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </p>
  )
}

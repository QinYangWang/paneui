import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"

const changes = [
  { version: "2.4.0", note: "Bottom sheets snap to two heights and dismiss with a flick." },
  { version: "2.3.2", note: "Popovers keep 8px from the viewport edge on small screens." },
  { version: "2.3.1", note: "Fixed the stepper skipping a digit when typing fast." },
  { version: "2.3.0", note: "New dock with magnifying items and a gliding active pill." },
  { version: "2.2.0", note: "Context menus grow out of the point you clicked." },
  { version: "2.1.0", note: "Alerts animate their height when they appear or dismiss." },
  { version: "2.0.0", note: "Flat tokens: neutral grays, calm primary blue, no gradient sheens." },
  { version: "1.9.0", note: "Slider ticks line up exactly under the thumb at every step." },
  { version: "1.8.0", note: "Breadcrumbs fold the middle into a menu past four items." },
]

export default function DrawerScrolling() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="secondary" />}>What&apos;s new</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Changelog</DrawerTitle>
          <DrawerDescription>The header stays put while the list scrolls.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <ol className="flex flex-col gap-4">
            {changes.map((change) => (
              <li key={change.version} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground">v{change.version}</span>
                <span className="text-pretty">{change.note}</span>
              </li>
            ))}
          </ol>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

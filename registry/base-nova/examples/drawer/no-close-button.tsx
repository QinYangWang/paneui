import { Button } from "@/registry/base-nova/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/base-nova/ui/drawer"

export default function DrawerNoCloseButton() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="secondary" />}>Show receipt</DrawerTrigger>
      <DrawerContent showClose={false}>
        <DrawerHeader className="pr-6">
          <DrawerTitle>Order #4821</DrawerTitle>
          <DrawerDescription>Paid Oct 12 with card ending 4242.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <dl className="flex flex-col gap-2 tabular-nums">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Noise-cancelling headphones</dt>
              <dd>$249.00</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>$0.00</dd>
            </div>
            <div className="flex justify-between font-medium">
              <dt>Total</dt>
              <dd>$249.00</dd>
            </div>
          </dl>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button className="w-full" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

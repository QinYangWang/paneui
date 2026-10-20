import { Button } from "@paneui/ui/components/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@paneui/ui/components/bottom-sheet"

export default function BottomSheetSingleSnap() {
  return (
    <BottomSheet snapPoints={[0.4]}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Share trip</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Share “Kyoto, November”</BottomSheetTitle>
          <BottomSheetDescription>Anyone with the link can view the itinerary.</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody className="text-muted-foreground">
          Bookings and prices stay private. Drag the handle down to dismiss.
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose render={<Button className="w-full" />}>Copy link</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  )
}

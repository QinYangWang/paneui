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

export default function BottomSheetNonDismissible() {
  return (
    <BottomSheet snapPoints={[0.45]} dismissible={false}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Confirm booking</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Book Hotel Gion for 3 nights?</BottomSheetTitle>
          <BottomSheetDescription>Nov 12–15 · $420 total · free cancellation until Nov 10.</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody className="text-muted-foreground">
          Dragging down, Esc and the backdrop won&apos;t close this sheet. Pick an answer.
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose render={<Button variant="ghost" />}>Cancel</BottomSheetClose>
          <BottomSheetClose render={<Button />}>Book</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  )
}

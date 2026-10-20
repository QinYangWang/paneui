"use client"

import { CalendarIcon, ClockIcon, PinIcon } from "@paneui/ui/icons"
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
import { Button } from "@paneui/ui/components/button"

const stops = [
  { icon: ClockIcon, title: "08:10 · Leave home", detail: "Taxi booked, 25 min to the airport" },
  { icon: PinIcon, title: "09:05 · HKG Terminal 1", detail: "Check-in row H, bag drop opens 08:40" },
  { icon: CalendarIcon, title: "10:45 · CX 520 to Tokyo", detail: "Seat 32A, gate shown 90 min before" },
  { icon: PinIcon, title: "15:50 · Arrive HND", detail: "Keikyu line to Shinagawa, 15 min" },
  { icon: ClockIcon, title: "17:30 · Hotel check-in", detail: "Confirmation sent to your inbox" },
]

export default function BottomSheetDemo() {
  return (
    <BottomSheet snapPoints={[0.45, 0.9]}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Show trip day</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Friday, travel day</BottomSheetTitle>
          <BottomSheetDescription>Drag the handle up for the full plan, or down to dismiss.</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody>
          <ol className="flex flex-col gap-2">
            {stops.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex items-start gap-3 rounded-2xl bg-muted/50 p-3 shadow-well">
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{title}</span>
                  <span className="text-muted-foreground">{detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </BottomSheetBody>
        <BottomSheetFooter>
          <BottomSheetClose render={<Button variant="ghost" />}>Close</BottomSheetClose>
          <BottomSheetClose render={<Button />}>Looks good</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  )
}

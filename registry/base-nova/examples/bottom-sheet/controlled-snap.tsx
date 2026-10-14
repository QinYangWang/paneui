"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/registry/base-nova/ui/bottom-sheet"

const SNAPS = [0.3, 0.6, 0.9]
const names = ["Peek", "Half", "Full"]

export default function BottomSheetControlledSnap() {
  const [snap, setSnap] = React.useState(0)

  return (
    <BottomSheet snapPoints={SNAPS} snap={snap} onSnapChange={setSnap}>
      <BottomSheetTrigger render={<Button variant="secondary" />}>Nearby stations</BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>3 stations within 500 m</BottomSheetTitle>
        </BottomSheetHeader>
        <BottomSheetBody className="flex flex-col gap-4">
          <div className="flex gap-2">
            {names.map((name, i) => (
              <Button key={name} size="sm" variant={snap === i ? "default" : "secondary"} onClick={() => setSnap(i)}>
                {name}
              </Button>
            ))}
          </div>
          <p className="text-muted-foreground">
            Drag the handle or press a button; both update the same snap index.
          </p>
        </BottomSheetBody>
      </BottomSheetContent>
    </BottomSheet>
  )
}

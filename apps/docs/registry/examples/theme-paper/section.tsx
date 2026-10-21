"use client"

import * as React from "react"

import { Button } from "@paneui/ui/components/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"

export default function ThemePaperSection() {
  const [style, setStyle] = React.useState("paper")
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <SegmentedControl value={style} onValueChange={setStyle} aria-label="Style">
        <SegmentedControlItem value="default">Default</SegmentedControlItem>
        <SegmentedControlItem value="paper">Paper</SegmentedControlItem>
      </SegmentedControl>
      <div data-style={style} className="w-full rounded-3xl bg-background p-4 text-foreground">
        <Card>
          <CardHeader>
            <CardTitle>Launch plan</CardTitle>
            <CardDescription>Ship the beta to the first hundred teams.</CardDescription>
          </CardHeader>
          <CardFooter className="gap-2">
            <Button>Start</Button>
            <Button variant="ghost">Edit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

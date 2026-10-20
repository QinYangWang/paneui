"use client"

import * as React from "react"

import { cn } from "@paneui/ui/lib/utils"
import { Badge, BadgeAvatar } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@paneui/ui/components/card"

type Confidence = "low" | "medium" | "high"

const confidenceLevel: Record<Confidence, number> = { low: 1, medium: 2, high: 3 }
const confidenceLabel: Record<Confidence, string> = {
  low: "Low confidence",
  medium: "Medium confidence",
  high: "High confidence",
}

function ConfidenceMeter({ value }: { value: Confidence }) {
  const level = confidenceLevel[value]
  return (
    <div data-slot="confidence-meter" className="flex items-center gap-2.5 text-ui-lg text-muted-foreground">
      <span className="flex items-center gap-0.75" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-3.5 w-1.25 rounded-full",
              i <= level
                ? "bg-success"
                : "bg-muted shadow-well"
            )}
          />
        ))}
      </span>
      {confidenceLabel[value]}
    </div>
  )
}

export function RecommendationCard({
  title = "Want me to place this restock order?",
  vendor = "Cone King",
  leadTime = "7 days",
  confidence = "high",
  onAccept,
  onAlternatives,
  className,
}: {
  title?: string
  vendor?: string
  leadTime?: string
  confidence?: Confidence
  onAccept?: () => void
  onAlternatives?: () => void
  className?: string
}) {
  return (
    <Card className={cn("w-full max-w-xl", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-9">
          Reorder waffle cones from{" "}
          <Badge className="mx-0.5 align-middle">
            <BadgeAvatar>{vendor.charAt(0)}</BadgeAvatar>
            {vendor}
          </Badge>{" "}
          with lead time{" "}
          <Badge variant="success" className="mx-0.5 align-middle">
            {leadTime}
          </Badge>
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-between pt-2">
        <ConfidenceMeter value={confidence} />
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onAlternatives}>
            Alternatives
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

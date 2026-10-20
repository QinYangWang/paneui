"use client"

import { Card, CardContent } from "@paneui/ui/components/card"
import { Timeline, TimelineDescription, TimelineItem, TimelineTitle } from "@paneui/ui/components/timeline"

export default function TimelineCards() {
  return (
    <Timeline className="w-full max-w-md">
      <TimelineItem time="Mon" timeDetail="Oct 12" tone="success">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Deployed v2.4</TimelineTitle>
            <TimelineDescription>All checks passed.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
      <TimelineItem time="Wed" timeDetail="Oct 14" tone="destructive">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Rollback</TimelineTitle>
            <TimelineDescription>Login errors on Safari.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
      <TimelineItem time="Fri" timeDetail="Oct 16" tone="primary">
        <Card size="sm">
          <CardContent>
            <TimelineTitle>Deploy v2.5</TimelineTitle>
            <TimelineDescription>Scheduled for 10:00.</TimelineDescription>
          </CardContent>
        </Card>
      </TimelineItem>
    </Timeline>
  )
}

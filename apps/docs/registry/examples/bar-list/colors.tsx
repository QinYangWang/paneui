"use client"

import { GithubIcon, GlobeIcon } from "@paneui/ui/icons"
import { BarList } from "@paneui/ui/components/bar-list"

export default function BarListColors() {
  return (
    <div className="w-full max-w-md">
      <BarList
        color={2}
        labels={["Source", "Sign-ups"]}
        items={[
          { name: "github.com", value: 1284, icon: <GithubIcon /> },
          { name: "google.com", value: 1021, icon: <GlobeIcon /> },
          { name: "news.ycombinator.com", value: 642, icon: <GlobeIcon /> },
        ]}
      />
    </div>
  )
}

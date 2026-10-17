"use client"

import * as React from "react"

import { HeartIcon, ThumbsUpIcon } from "@/components/icons"
import { ActionSwapBlurIcon, ActionSwapBlurText } from "@/registry/base-nova/ui/action-swap-blur"
import { Button } from "@/registry/base-nova/ui/button"

export default function ActionSwapBlurCustomSlots() {
  const [liked, setLiked] = React.useState(false)
  const count = liked ? 129 : 128
  return (
    <Button variant="secondary" aria-pressed={liked} onClick={() => setLiked((v) => !v)}>
      <ActionSwapBlurIcon value={liked ? "liked" : "like"}>
        {liked ? <HeartIcon data-icon="inline-start" className="text-destructive" /> : <ThumbsUpIcon data-icon="inline-start" />}
      </ActionSwapBlurIcon>
      <ActionSwapBlurText value={String(count)} className="tabular-nums">
        {count} likes
      </ActionSwapBlurText>
    </Button>
  )
}

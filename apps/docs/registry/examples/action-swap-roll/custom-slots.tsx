"use client"

import * as React from "react"

import { ArrowDownIcon, ArrowUpIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { ActionSwapRollIcon, ActionSwapRollText } from "@paneui/ui/components/action-swap-roll"

export default function ActionSwapRollCustomSlots() {
  const [asc, setAsc] = React.useState(true)
  const value = asc ? "asc" : "desc"
  return (
    <Button variant="ghost" onClick={() => setAsc((v) => !v)}>
      <ActionSwapRollText value={value}>{asc ? "Oldest first" : "Newest first"}</ActionSwapRollText>
      <ActionSwapRollIcon value={value}>{asc ? <ArrowUpIcon data-icon="inline-end" /> : <ArrowDownIcon data-icon="inline-end" />}</ActionSwapRollIcon>
    </Button>
  )
}

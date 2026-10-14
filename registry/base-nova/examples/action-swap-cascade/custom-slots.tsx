"use client"

import * as React from "react"

import { CartIcon, CheckIcon } from "@/components/icons"
import { ActionSwapCascadeIcon, ActionSwapCascadeText } from "@/registry/base-nova/ui/action-swap-cascade"
import { Button } from "@/registry/base-nova/ui/button"

export default function ActionSwapCascadeCustomSlots() {
  const [added, setAdded] = React.useState(false)
  const state = added ? "added" : "add"

  return (
    <Button variant="outline" aria-pressed={added} onClick={() => setAdded((a) => !a)}>
      <ActionSwapCascadeIcon value={state}>{added ? <CheckIcon /> : <CartIcon />}</ActionSwapCascadeIcon>
      <ActionSwapCascadeText value={state}>{added ? "In your cart" : "Add to cart"}</ActionSwapCascadeText>
    </Button>
  )
}

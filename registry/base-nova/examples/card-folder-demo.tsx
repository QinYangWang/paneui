"use client"

import * as React from "react"

import { CardFolder } from "@/registry/base-nova/blocks/card-folder/card-folder"

export default function CardFolderDemo() {
  const [note, setNote] = React.useState("Tap the pocket to pull the card out")
  return (
    <div className="flex flex-col items-center gap-3">
      <CardFolder
        title="Studio expenses"
        brand="Mercury"
        holder="Taimatsu LLC"
        cardNumber="5412 7534 9821 4821"
        expiry="08/29"
        cvv="317"
        onOpenChange={(open) => setNote(open ? "Card out — reveal details with the eye" : "Card tucked away")}
        onCopy={() => setNote("Card number copied")}
        onAction={() => setNote("More options")}
      />
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {note}
      </p>
    </div>
  )
}

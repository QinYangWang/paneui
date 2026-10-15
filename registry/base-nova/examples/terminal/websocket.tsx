"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { Terminal, createWebSocketTransport, type TerminalTransport } from "@/registry/base-nova/ui/terminal"

export default function TerminalWebSocket() {
  const [address, setAddress] = React.useState("ws://127.0.0.1:3457")
  const [token, setToken] = React.useState("")
  const [transport, setTransport] = React.useState<TerminalTransport | null>(null)

  React.useEffect(() => () => transport?.dispose?.(), [transport])

  const connect = (e: React.FormEvent) => {
    e.preventDefault()
    const url = new URL(address)
    url.searchParams.set("token", token)
    setTransport(createWebSocketTransport(url.toString()))
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <form onSubmit={connect} className="flex gap-2">
        <Input value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Bridge address" className="min-w-0 flex-1" />
        <Input value={token} onChange={(e) => setToken(e.target.value)} aria-label="Token" placeholder="Token" className="w-28" />
        <Button type="submit">{transport ? "Reconnect" : "Connect"}</Button>
      </form>
      <div className="h-64 overflow-hidden rounded-xl bg-background shadow-raised">
        {transport ? (
          <Terminal transport={transport} autoFocus className="h-full" />
        ) : (
          <div className="flex h-full items-center justify-center text-ui text-muted-foreground">Start the bridge, then connect.</div>
        )}
      </div>
    </div>
  )
}

"use client"

import * as React from "react"

import { WalletCard } from "@/registry/base-nova/blocks/wallet-card/wallet-card"

const ACCOUNTS = [
  { id: "main", name: "Main wallet", address: "0x8f3a91c2d4e5b6a7f8091a2b3c4d5e6f7a8b4c21" },
  { id: "savings", name: "Savings", address: "0x1b7e44a09c3d2e1f0a9b8c7d6e5f4a3b2c1d9e07" },
  { id: "trading", name: "Trading desk", address: "0xc4d2e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c18f" },
]

const BALANCES: Record<string, number> = { main: 12480.32, savings: 48210.0, trading: 3905.77 }

export default function WalletCardDemo() {
  const [account, setAccount] = React.useState("main")
  const [balance, setBalance] = React.useState(BALANCES.main)

  // Simulate a live portfolio: the balance drifts every few seconds.
  React.useEffect(() => {
    const t = window.setInterval(() => {
      setBalance((b) => Math.round((b + (Math.random() - 0.45) * 60) * 100) / 100)
    }, 3500)
    return () => window.clearInterval(t)
  }, [])

  return (
    <WalletCard
      accounts={ACCOUNTS}
      accountId={account}
      onAccountChange={(id) => {
        setAccount(id)
        setBalance(BALANCES[id])
      }}
      balance={balance}
      defaultChange={182.4}
      hasNotifications
      searchRecent={["USDC", "vitalik.eth", "Base bridge", "0x51…86ca"]}
      assets={[
        { id: "eth", symbol: "ETH", name: "Ether", amount: 2.41, value: 7572.22, change: 1.84, color: "#627eea" },
        { id: "usdc", symbol: "USDC", name: "USD Coin", amount: 4908.1, value: 4908.1, change: 0.01, color: "#2775ca" },
      ]}
    />
  )
}

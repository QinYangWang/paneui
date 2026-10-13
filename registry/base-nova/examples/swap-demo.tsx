import { Swap } from "@/registry/base-nova/blocks/swap/swap"

export default function SwapDemo() {
  return <Swap defaultFromId="eth-eth" defaultToId="sol-sol" defaultAmount="0.5" />
}

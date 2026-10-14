"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { VolumeProfile, type VolumeProfileDatum } from "@/registry/base-nova/ui/volume-profile"

function week(): VolumeProfileDatum[] {
  const r = seededRandom(42)
  return Array.from({ length: 500 }, () => {
    const price = 61200 + r() * 2400
    const volume = Math.round(1 + r() * 30)
    return { price, volume, buyVolume: Math.round(volume * (0.3 + r() * 0.4)) }
  })
}

const data = week()
const usd = (p: number) => `$${Math.round(p).toLocaleString("en-US")}`

export default function VolumeProfileNoValueArea() {
  return (
    <div className="w-full max-w-xl">
      <VolumeProfile
        data={data}
        valueArea={false}
        bins={16}
        unit="BTC"
        formatPrice={usd}
        height={260}
        label="BTC weekly volume profile"
      />
    </div>
  )
}

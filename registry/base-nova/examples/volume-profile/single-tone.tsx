"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { VolumeProfile, type VolumeProfileDatum } from "@/registry/base-nova/ui/volume-profile"

/** One balanced node around 188.40 with no buy/sell split. */
function session(): VolumeProfileDatum[] {
  const r = seededRandom(7)
  const gauss = () => (r() + r() + r() + r() - 2) / 2
  return Array.from({ length: 600 }, () => ({ price: 188.4 + gauss() * 1.6, volume: Math.round(200 + r() * 1800) }))
}

const data = session()
const usd = (p: number) => `$${p.toFixed(2)}`

export default function VolumeProfileSingleTone() {
  return (
    <div className="w-full max-w-xl">
      <VolumeProfile data={data} unit="shares" formatPrice={usd} height={280} label="AAPL volume profile, Tuesday" />
    </div>
  )
}

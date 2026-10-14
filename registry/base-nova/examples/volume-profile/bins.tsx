"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { VolumeProfile, type VolumeProfileDatum } from "@/registry/base-nova/ui/volume-profile"

function session(): VolumeProfileDatum[] {
  const r = seededRandom(3)
  const gauss = () => (r() + r() + r() + r() - 2) / 2
  return Array.from({ length: 700 }, () => {
    const node = r() < 0.5 ? 2104 : 2126
    const volume = Math.round(10 + r() * 90)
    return { price: node + gauss() * 7, volume, buyVolume: Math.round(volume * (0.4 + r() * 0.2)) }
  })
}

const data = session()

export default function VolumeProfileBins() {
  return (
    <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">12 rows</span>
        <VolumeProfile data={data} bins={12} height={240} showSummary={false} label="Gold profile, 12 rows" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">48 rows</span>
        <VolumeProfile data={data} bins={48} height={240} showSummary={false} label="Gold profile, 48 rows" />
      </div>
    </div>
  )
}

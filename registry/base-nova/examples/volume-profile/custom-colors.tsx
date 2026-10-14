"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { VolumeProfile, type VolumeProfileDatum } from "@/registry/base-nova/ui/volume-profile"

function session(): VolumeProfileDatum[] {
  const r = seededRandom(11)
  const gauss = () => (r() + r() + r() + r() - 2) / 2
  return Array.from({ length: 800 }, () => {
    const volume = Math.round(30 + r() * 120)
    return { price: 17840 + gauss() * 40, volume, buyVolume: Math.round(volume * (0.45 + r() * 0.25)) }
  })
}

const data = session()

export default function VolumeProfileCustomColors() {
  return (
    <div className="w-full max-w-xl">
      <VolumeProfile
        data={data}
        color="var(--success)"
        pocColor="var(--destructive)"
        valueArea={0.8}
        height={300}
        label="NQ session profile with an 80% value area"
      />
    </div>
  )
}

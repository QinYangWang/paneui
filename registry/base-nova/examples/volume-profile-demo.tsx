"use client"

import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { VolumeProfile, type VolumeProfileDatum } from "@/registry/base-nova/ui/volume-profile"

/** Seeded session: two volume nodes around 4,512 and 4,538 with a thin middle. */
function session(): VolumeProfileDatum[] {
  const r = seededRandom(19)
  const out: VolumeProfileDatum[] = []
  const gauss = () => (r() + r() + r() + r() - 2) / 2
  for (let i = 0; i < 900; i++) {
    const node = r() < 0.62 ? 4512 : 4538
    const price = node + gauss() * (node === 4512 ? 9 : 6)
    const volume = Math.round(20 + r() * 140)
    out.push({ price, volume, buyVolume: Math.round(volume * (0.35 + r() * 0.3)) })
  }
  return out
}

const data = session()

export default function VolumeProfileDemo() {
  return (
    <div className="w-full max-w-xl space-y-2">
      <div className="text-sm font-medium">ES · Regular session</div>
      <VolumeProfile data={data} bins={28} height={320} label="ES session volume profile" />
    </div>
  )
}

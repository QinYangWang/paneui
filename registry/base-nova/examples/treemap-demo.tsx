"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { seededRandom } from "@/registry/base-nova/ui/chart-utils"
import { Treemap, type TreemapNode } from "@/registry/base-nova/ui/treemap"

const usd = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

function spend(seed: number): TreemapNode[] {
  const r = seededRandom(seed)
  const jitter = (base: number) => Math.round(base * (0.6 + r() * 0.8))
  return [
    {
      id: "compute",
      label: "Compute",
      children: [
        { id: "ec2", label: "EC2", value: jitter(4200), description: "On-demand + reserved" },
        { id: "lambda", label: "Lambda", value: jitter(1300) },
        { id: "fargate", label: "Fargate", value: jitter(900) },
      ],
    },
    {
      id: "storage",
      label: "Storage",
      children: [
        { id: "s3", label: "S3", value: jitter(1800) },
        { id: "ebs", label: "EBS", value: jitter(700) },
      ],
    },
    {
      id: "data",
      label: "Databases",
      children: [
        { id: "rds", label: "RDS", value: jitter(2100) },
        { id: "dynamo", label: "DynamoDB", value: jitter(600) },
      ],
    },
    { id: "network", label: "Networking", value: jitter(1100), description: "Egress and NAT gateways" },
    { id: "other", label: "Other", value: jitter(450) },
  ]
}

export default function TreemapDemo() {
  const [seed, setSeed] = React.useState(3)
  const data = React.useMemo(() => spend(seed), [seed])
  return (
    <div className="w-full max-w-xl space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Cloud spend · September</div>
          <div className="text-xs text-muted-foreground">Hover a tile for its value and share</div>
        </div>
        <Button size="sm" variant="secondary" onClick={() => setSeed((s) => s + 1)}>
          Next month
        </Button>
      </div>
      <Treemap data={data} label="Cloud spend by service" formatValue={usd} height={300} />
    </div>
  )
}

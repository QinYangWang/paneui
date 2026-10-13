import { PredictionMarket } from "@/registry/base-nova/blocks/prediction-market/prediction-market"

export default function PredictionMarketDemo() {
  return (
    <PredictionMarket
      question="Will ETH close above $4,000 on Friday?"
      outcomes={[
        { id: "yes", label: "Yes", price: 0.34, tone: "positive" },
        { id: "no", label: "No", price: 0.66, tone: "negative" },
      ]}
      balance={250}
      positions={{ yes: 40, no: 12 }}
      defaultValue={{ amount: "20" }}
    />
  )
}

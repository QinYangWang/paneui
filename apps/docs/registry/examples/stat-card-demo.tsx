import {
  StatCard,
  StatCardDelta,
  StatCardFooter,
  StatCardHeader,
  StatCardHint,
  StatCardLabel,
  StatCardSparkline,
  StatCardValue,
} from "@paneui/ui/components/stat-card"

export default function StatCardDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Recurring revenue</StatCardLabel>
          <StatCardDelta value={12.4} />
        </StatCardHeader>
        <StatCardValue>$48,210</StatCardValue>
        <StatCardFooter>
          <StatCardHint>vs. last month</StatCardHint>
          <StatCardSparkline values={[30, 32, 31, 35, 38, 37, 41, 44, 43, 48]} label="Revenue trend" />
        </StatCardFooter>
      </StatCard>
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Churn rate</StatCardLabel>
          <StatCardDelta value={0.4} unit=" pts" invert />
        </StatCardHeader>
        <StatCardValue>2.4%</StatCardValue>
        <StatCardFooter>
          <StatCardHint>Trailing 90 days</StatCardHint>
          <StatCardSparkline values={[2.0, 2.1, 2.0, 2.2, 2.1, 2.3, 2.2, 2.4]} label="Churn trend" />
        </StatCardFooter>
      </StatCard>
    </div>
  )
}

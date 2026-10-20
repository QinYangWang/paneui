import { Button } from "@paneui/ui/components/button"

const accents = [
  { value: "blue", label: "Blue" },
  { value: "neutral", label: "Neutral" },
  { value: "green", label: "Green" },
  { value: "orange", label: "Orange" },
  { value: "rose", label: "Rose" },
  { value: "violet", label: "Violet" },
]

export default function ThemeAccentsDemo() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {accents.map(({ value, label }) => (
        <div key={value} data-accent={value}>
          <Button className="w-full">{label}</Button>
        </div>
      ))}
    </div>
  )
}

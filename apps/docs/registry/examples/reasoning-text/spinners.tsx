import { ReasoningText } from "@paneui/ui/components/reasoning-text"

export default function ReasoningTextSpinners() {
  return (
    <div className="flex flex-col gap-3">
      <ReasoningText spinner="braille" phrases={["Planning the trip"]} />
      <ReasoningText spinner="dots" phrases={["Checking train times"]} />
      <ReasoningText spinner="line" phrases={["Building the project"]} />
      <ReasoningText spinner="star" phrases={["Composing an answer"]} />
    </div>
  )
}

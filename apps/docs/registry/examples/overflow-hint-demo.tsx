import { OverflowHintText } from "@paneui/ui/components/overflow-hint"

const threads = [
  "Fix broken chat dragging",
  "Redesign split chats so both panes keep their own scroll position",
  "Hide empty threads",
  "Move the model picker into the composer toolbar and remember the last choice per project",
]

export default function OverflowHintDemo() {
  return (
    <ul className="flex w-60 flex-col frame-xl frame-p-1 bg-card text-ui shadow-raised">
      {threads.map((title) => (
        <li key={title} className="flex h-7 items-center rounded-inner px-2 hover:bg-secondary">
          <OverflowHintText>{title}</OverflowHintText>
        </li>
      ))}
    </ul>
  )
}

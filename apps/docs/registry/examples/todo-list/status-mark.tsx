import { TodoStatusMark, type TodoStatus } from "@paneui/ui/components/todo-list"

const STATUSES: { status: TodoStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "in-progress", label: "In progress" },
  { status: "done", label: "Done" },
  { status: "failed", label: "Failed" },
]

export default function TodoListStatusMark() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {STATUSES.map((s) => (
        <span key={s.status} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <TodoStatusMark status={s.status} />
          {s.label}
        </span>
      ))}
    </div>
  )
}

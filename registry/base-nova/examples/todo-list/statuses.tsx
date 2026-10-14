import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const ITEMS: TodoItem[] = [
  { id: "1", title: "Export last month’s receipts", status: "done", meta: "42 files" },
  { id: "2", title: "Match receipts to card charges", status: "failed", meta: "3 unmatched", detail: "Two Grab rides and one Apple charge" },
  { id: "3", title: "Fill in the expense report", status: "in-progress", detail: "Page 2 of 3" },
  { id: "4", title: "Send to finance for approval", status: "pending" },
]

export default function TodoListStatuses() {
  return <TodoList items={ITEMS} title="October expenses" className="max-w-sm" />
}

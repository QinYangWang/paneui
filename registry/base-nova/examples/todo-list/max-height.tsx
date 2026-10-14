import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const TITLES = [
  "Measure the living room",
  "Shortlist three sofas",
  "Book the movers",
  "Cancel the old internet plan",
  "Set up the new internet plan",
  "Forward mail to the new address",
  "Update the address with the bank",
  "Return the old keys",
]

const ITEMS: TodoItem[] = TITLES.map((title, i) => ({
  id: String(i),
  title,
  status: i < 3 ? "done" : i === 3 ? "in-progress" : "pending",
}))

export default function TodoListMaxHeight() {
  return <TodoList items={ITEMS} title="Moving checklist" maxHeight={176} className="max-w-sm" />
}

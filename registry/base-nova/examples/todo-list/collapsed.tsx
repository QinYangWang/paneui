import { TodoList, type TodoItem } from "@/registry/base-nova/ui/todo-list"

const ITEMS: TodoItem[] = [
  { id: "1", title: "Pull the failing CI log", status: "done" },
  { id: "2", title: "Reproduce the timezone bug locally", status: "in-progress" },
  { id: "3", title: "Write a regression test", status: "pending" },
  { id: "4", title: "Open a pull request", status: "pending" },
]

export default function TodoListCollapsed() {
  return <TodoList items={ITEMS} title="Fix formatDate" defaultOpen={false} className="max-w-sm" />
}

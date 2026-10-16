import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

const props = [
  { name: "variant", type: `"default" | "secondary" | "ghost"`, default: `"default"`, description: "How much the button stands out." },
  { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Height and padding." },
  { name: "disabled", type: "boolean", default: "false", description: "Dims the button and ignores presses." },
]

export default function SimpleTableDemo() {
  return (
    <SimpleTable className="min-w-xl">
      <SimpleTableHeader>
        <SimpleTableRow>
          <SimpleTableHead>Prop</SimpleTableHead>
          <SimpleTableHead>Type</SimpleTableHead>
          <SimpleTableHead>Default</SimpleTableHead>
          <SimpleTableHead>Description</SimpleTableHead>
        </SimpleTableRow>
      </SimpleTableHeader>
      <SimpleTableBody>
        {props.map((p) => (
          <SimpleTableRow key={p.name}>
            <SimpleTableCell variant="code">{p.name}</SimpleTableCell>
            <SimpleTableCell variant="type">{p.type}</SimpleTableCell>
            <SimpleTableCell variant="code-muted">{p.default}</SimpleTableCell>
            <SimpleTableCell>{p.description}</SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTableBody>
    </SimpleTable>
  )
}

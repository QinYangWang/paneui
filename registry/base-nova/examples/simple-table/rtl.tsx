import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@/registry/base-nova/ui/simple-table"

const rows = [
  { name: "size", use: "الارتفاع والحشو" },
  { name: "variant", use: "مدى بروز الزر" },
]

export default function SimpleTableRtl() {
  return (
    <div dir="rtl" className="w-full max-w-md">
      <SimpleTable>
        <SimpleTableHeader>
          <SimpleTableRow>
            <SimpleTableHead>الخاصية</SimpleTableHead>
            <SimpleTableHead>الاستخدام</SimpleTableHead>
          </SimpleTableRow>
        </SimpleTableHeader>
        <SimpleTableBody>
          {rows.map((r) => (
            <SimpleTableRow key={r.name}>
              <SimpleTableCell variant="code">{r.name}</SimpleTableCell>
              <SimpleTableCell>{r.use}</SimpleTableCell>
            </SimpleTableRow>
          ))}
        </SimpleTableBody>
      </SimpleTable>
    </div>
  )
}

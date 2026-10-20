import {
  SimpleTable,
  SimpleTableBody,
  SimpleTableCell,
  SimpleTableHead,
  SimpleTableHeader,
  SimpleTableRow,
} from "@paneui/ui/components/simple-table"

const plans = [
  { name: "Free", price: "$0", seats: "1", storage: "5 GB", sites: "3", support: "Community" },
  { name: "Plus", price: "$11 USD / mo", seats: "5", storage: "100 GB", sites: "Unlimited", support: "Email" },
  { name: "Team", price: "$29 USD / mo", seats: "20", storage: "1 TB", sites: "Unlimited", support: "Priority" },
]

export default function SimpleTableComparison() {
  return (
    <SimpleTable containerClassName="w-full max-w-2xl">
      <SimpleTableHeader>
        <SimpleTableRow>
          <SimpleTableHead>Plan</SimpleTableHead>
          <SimpleTableHead>Price</SimpleTableHead>
          <SimpleTableHead align="right">Seats</SimpleTableHead>
          <SimpleTableHead>Storage</SimpleTableHead>
          <SimpleTableHead>Sites</SimpleTableHead>
          <SimpleTableHead>Support</SimpleTableHead>
        </SimpleTableRow>
      </SimpleTableHeader>
      <SimpleTableBody>
        {plans.map((p) => (
          <SimpleTableRow key={p.name}>
            <SimpleTableCell>{p.name}</SimpleTableCell>
            <SimpleTableCell>{p.price}</SimpleTableCell>
            <SimpleTableCell variant="numeric" align="right">
              {p.seats}
            </SimpleTableCell>
            <SimpleTableCell>{p.storage}</SimpleTableCell>
            <SimpleTableCell>{p.sites}</SimpleTableCell>
            <SimpleTableCell>{p.support}</SimpleTableCell>
          </SimpleTableRow>
        ))}
      </SimpleTableBody>
    </SimpleTable>
  )
}

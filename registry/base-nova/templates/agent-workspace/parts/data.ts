/* Scripted session for the agent workspace template. */

import type { TodoItem } from "@/registry/base-nova/ui/todo-list"

export const sessions = {
  today: [
    { id: "s1", title: "Fix invoice rounding", meta: "running" },
    { id: "s2", title: "Add Stripe webhook retries", meta: "2h" },
    { id: "s3", title: "Explain ledger reconcile", meta: "4h" },
  ],
  earlier: [
    { id: "s4", title: "Migrate tax rates to JSON", meta: "Mon" },
    { id: "s5", title: "Flaky e2e on checkout", meta: "Sun" },
    { id: "s6", title: "Bump Next to 15.5", meta: "Oct 9" },
  ],
}

export const plan: TodoItem[] = [
  { id: "1", title: "Reproduce the 1¢ drift on INV-2045", status: "done", meta: "1 failing test" },
  { id: "2", title: "Round line items before applying tax", status: "done", meta: "2 files" },
  { id: "3", title: "Run the billing test suite", status: "done", meta: "69 passed" },
  { id: "4", title: "Open a pull request against main", status: "in-progress" },
]

export const testLog = [
  "$ pnpm vitest run packages/billing",
  "",
  " RUN  v3.2.4 /repo/packages/billing",
  "",
  " ✓ src/invoice.test.ts (13 tests) 51ms",
  " ✓ src/tax/rates.test.ts (31 tests) 108ms",
  " ✓ src/webhooks/stripe.test.ts (9 tests) 197ms",
  " ✓ src/ledger/reconcile.test.ts (16 tests) 384ms",
  "",
  " Test Files  4 passed (4)",
  "      Tests  69 passed (69)",
  "   Duration  1.81s",
].join("\n")

export const invoiceDiff = `@@ -18,11 +18,14 @@ export function totalFor(invoice: Invoice) {
   const lines = invoice.lines.map((line) => {
-    const net = line.unitPrice * line.quantity
-    return { ...line, net }
+    // Round each line to cents first so tax is applied to what the customer sees.
+    const net = roundCents(line.unitPrice * line.quantity)
+    return { ...line, net }
   })
 
   const subtotal = sum(lines.map((l) => l.net))
-  const tax = subtotal * invoice.taxRate
-  return { subtotal, tax, total: subtotal + tax }
+  const tax = roundCents(subtotal * invoice.taxRate)
+  return { subtotal, tax, total: roundCents(subtotal + tax) }
 }
`

export const moneyDiff = `@@ -1,6 +1,11 @@
 export const CURRENCY = "USD"
 
+/** Banker's rounding to whole cents; avoids drift when summing many lines. */
+export function roundCents(value: number) {
+  return Math.round((value + Number.EPSILON) * 100) / 100
+}
+
 export function formatMoney(value: number) {
   return new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY }).format(value)
 }
`

export const testSnippet = `it("rounds each line before tax (INV-2045)", () => {
  const invoice = makeInvoice({
    taxRate: 0.0825,
    lines: [
      { unitPrice: 19.99, quantity: 3 },
      { unitPrice: 4.333, quantity: 7 },
    ],
  })
  expect(totalFor(invoice).total).toBe(97.76)
})`

export const summary = `Fixed the 1¢ drift. Line items were summed at full precision and only the total was rounded, so invoices with fractional unit prices like **INV-2045** came out a cent high.

- Added \`roundCents()\` in \`lib/money.ts\` and applied it per line, to tax and to the total
- Added a regression test that reproduces INV-2045 exactly
- All **69** billing tests pass locally

Ready to push \`fix/invoice-rounding\` and open the PR when you approve it.`

export const diffs: Record<string, { filename: string; diff: string }> = {
  "invoice.ts": { filename: "packages/billing/src/invoice.ts", diff: invoiceDiff },
  "money.ts": { filename: "packages/billing/src/lib/money.ts", diff: moneyDiff },
}

import { FileDiff } from "@paneui/ui/components/file-diff"

const DIFF = `@@ -1,9 +1,10 @@
 export function formatPrice(cents: number, currency = "USD") {
-  const amount = cents / 100
-  return "$" + amount.toFixed(2)
+  return new Intl.NumberFormat("en-US", {
+    style: "currency",
+    currency,
+  }).format(cents / 100)
 }
 
 export function formatNights(n: number) {
-  return n + " nights"
+  return n === 1 ? "1 night" : \`\${n} nights\`
 }
`

export default function FileDiffSplit() {
  return (
    <FileDiff
      filename="lib/format.ts"
      diff={DIFF}
      defaultDiffStyle="split"
      diffStyleToggle
      inlineChanges="word"
      className="w-full max-w-3xl"
    />
  )
}

import { FileDiff } from "@paneui/ui/components/file-diff"

const DIFF = `@@ -1,6 +1,6 @@
 # Packing list
 - Passport
-- One adapter
+- Two adapters
 - Rain jacket
 - Walking shoes
 - Camera charger
`

export default function FileDiffPlain() {
  return <FileDiff filename="notes/packing.md" diff={DIFF} showLineNumbers={false} copyable={false} maxHeight={160} className="w-full max-w-xl" />
}

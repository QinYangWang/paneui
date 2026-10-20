import { EditedFilesCard } from "@paneui/ui/components/edited-files-card"

const DIFF = `@@ -1,4 +1,5 @@
 export const config = {
-  retries: 1,
+  retries: 3,
+  backoff: "exponential",
   timeout: 30_000,
 }`

export default function EditedFilesCardUnifiedDiff() {
  return (
    <div className="w-full max-w-lg">
      <EditedFilesCard files={[{ path: "src/http/config.ts", diff: DIFF }]} defaultOpen />
    </div>
  )
}

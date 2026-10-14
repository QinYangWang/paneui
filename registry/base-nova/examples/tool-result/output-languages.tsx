import { ToolResult, ToolResultOutput } from "@/registry/base-nova/ui/tool-result"

const PATCH = `--- a/src/config.yaml
+++ b/src/config.yaml
@@ -1,3 +1,3 @@
 region: ap-east-1
-replicas: 2
+replicas: 3
 timeout: 30s`

const CONFIG = `region: ap-east-1
replicas: 3
timeout: 30s
alerts:
  email: ops@example.com`

export default function ToolResultOutputLanguages() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <ToolResult tool="git.diff" title="Show the change" status="success" duration={0.08} collapseOnComplete={false}>
        <ToolResultOutput language="diff">{PATCH}</ToolResultOutput>
      </ToolResult>
      <ToolResult tool="fs.read" title="Read config" status="success" duration={0.02} maxHeight={96} collapseOnComplete={false}>
        <ToolResultOutput language="yaml">{CONFIG}</ToolResultOutput>
      </ToolResult>
    </div>
  )
}

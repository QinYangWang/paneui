import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalCommand() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToolApproval
        tool="shell.exec"
        title="Run database migration?"
        risk="high"
        argsLanguage="bash"
        args="pnpm prisma migrate deploy --schema ./prisma/schema.prisma"
      />
      <ToolApproval
        tool="k8s.apply"
        title="Apply deployment?"
        argsLanguage="yaml"
        defaultArgsOpen={false}
        args={"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3"}
      />
    </div>
  )
}

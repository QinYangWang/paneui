import { TerminalSquareIcon } from "@/components/icons"
import { ToolApproval } from "@/registry/base-nova/ui/tool-approval"

export default function ToolApprovalCommand() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolApproval
        tool="shell.exec"
        icon={<TerminalSquareIcon />}
        title="Run the database migration?"
        description="Applies pending migrations to production."
        risk="high"
        argsLanguage="bash"
        args="pnpm prisma migrate deploy --schema ./prisma/schema.prisma"
        defaultArgsOpen
      />
      <ToolApproval
        tool="k8s.apply"
        title="Apply the deployment?"
        description="Scales web to three replicas."
        argsLanguage="yaml"
        args={"apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3"}
      />
    </div>
  )
}

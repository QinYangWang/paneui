import { FileDiff, type FileDiffLine } from "@/registry/base-nova/ui/file-diff"

const LINES: FileDiffLine[] = [
  { type: "hunk", content: "@@ -1,3 +1,4 @@" },
  { type: "context", content: "FROM node:22-alpine", oldLine: 1, newLine: 1 },
  { type: "context", content: "WORKDIR /app", oldLine: 2, newLine: 2 },
  { type: "removed", content: "RUN npm install", oldLine: 3 },
  { type: "added", content: "RUN corepack enable", newLine: 3 },
  { type: "added", content: "RUN pnpm install --frozen-lockfile", newLine: 4 },
]

export default function FileDiffPreParsed() {
  return <FileDiff filename="Dockerfile" language="docker" lines={LINES} className="w-full max-w-xl" />
}

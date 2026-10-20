import path from "node:path"

export const REPO_ROOT = path.resolve(process.cwd(), "../..")

export function repoPath(...parts: string[]) {
  return path.join(REPO_ROOT, ...parts)
}

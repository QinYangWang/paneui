import { CLI_NAME, NAMESPACE } from "../meta.js"
import { search as find } from "../search.js"
import { c, log, table } from "../ui.js"
import { address, assertKnown, context, type CommonOptions } from "../context.js"

export interface SearchOptions extends CommonOptions {
  all?: boolean
  category?: string
  type?: string
  limit?: string
  json?: boolean
}

export async function search(query: string, opts: SearchOptions) {
  const { registry } = context(opts)
  const index = await registry.index()
  let results = find(index.items, query, opts)
  const total = results.length
  const limit = opts.limit ? Number(opts.limit) : 0
  if (limit > 0) results = results.slice(0, limit)

  if (opts.json) {
    console.log(
      JSON.stringify(
        results.map((i) => ({ name: i.name, title: i.title, type: i.type, category: i.meta?.category, description: i.description })),
        null,
        2,
      ),
    )
    return
  }
  if (results.length === 0) {
    log.info(`No items match "${query}".${opts.all ? "" : " Add --all to include hidden presets."}`)
    return
  }
  table(
    ["NAME", "CATEGORY", "DESCRIPTION"],
    results.map((i) => [c.bold(i.name), i.meta?.category ?? "", i.description ?? ""]),
  )
  log.info()
  log.info(c.dim(`${results.length}${total > results.length ? ` of ${total}` : ""} items · ${registry.base}`))
  log.info(c.dim(`Install with \`${CLI_NAME} add <name>\` or \`npx shadcn@latest add ${NAMESPACE}/<name>\`.`))
}

export async function info(name: string, opts: CommonOptions & { json?: boolean }) {
  const { project, registry } = context(opts)
  const bare = registry.nameOf(name) ?? name
  assertKnown(await registry.index(), [bare])
  const item = await registry.item(bare)
  if (opts.json) {
    console.log(JSON.stringify({ ...item, files: item.files?.map((f) => ({ path: f.path, type: f.type, target: f.target })) }, null, 2))
    return
  }
  const row = (label: string, value?: string) => value && log.info(`${c.dim(label.padEnd(14))}${value}`)
  log.info(c.bold(item.title ?? item.name))
  if (item.description) log.info(item.description)
  log.info()
  row("Name", item.name)
  row("Type", item.type)
  row("Category", item.meta?.category)
  row("Version", item.meta?.version)
  row("npm", item.dependencies?.join(", "))
  row("npm (dev)", item.devDependencies?.join(", "))
  row(
    "Requires",
    item.registryDependencies?.map((d) => registry.nameOf(d) ?? d.replace(/^.*\/([^/]+)\.json$/, "$1")).join(", "),
  )
  if (item.files?.length) {
    log.info(c.dim("Files"))
    for (const f of item.files) {
      const dest = project.installPaths(f)[0].slice(project.cwd.length + 1)
      log.info(`  ${dest}${f.content ? c.dim(`  ${f.content.split("\n").length} lines`) : ""}`)
    }
  }
  if (item.cssVars) {
    const n = Object.keys(item.cssVars.light ?? {}).length
    log.info(`${c.dim("CSS variables".padEnd(14))}${n} light, ${Object.keys(item.cssVars.dark ?? {}).length} dark`)
  }
  log.info()
  log.info(`${c.dim("$")} ${CLI_NAME} add ${item.name}`)
  log.info(`${c.dim("$")} npx shadcn@latest add ${address(project, registry, item.name)}`)
}

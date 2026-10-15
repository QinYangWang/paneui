import type { TocEntry } from "@/components/docs/doc-toc"
import { Code, GuideH2, GuideH3, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { REGISTRY_NAME, REGISTRY_URL, SITE_URL } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"

export const metadata = { title: "CLI & registry" }

export default function CliPage() {
  const ns = `@${REGISTRY_NAME}`
  const config = JSON.stringify({ registries: { [ns]: REGISTRY_URL } }, null, 2)
  const itemUrl = REGISTRY_URL.replace("{name}", "button")
  const itemJson = `{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Triggers an action or submits a form.",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["${ns}/theme"],
  "files": [{ "path": "registry/base-nova/ui/button.tsx", "type": "registry:ui", "content": "…" }]
}`
  const templateUrl = (name: string) => REGISTRY_URL.replace("{name}", name)
  const templates: { name: string; what: string; routes: string[] }[] = [
    { name: "saas", what: "Marketing pages, sign-in and a dashboard", routes: ["app/page.tsx", "app/not-found.tsx", "app/pricing", "app/changelog", "app/(auth)", "app/dashboard"] },
    { name: "agent-workspace", what: "The agent workspace with its ACP bridge server", routes: ["app/page.tsx", "server/acp-bridge.mjs"] },
    { name: "docs", what: "A docs site", routes: ["app/docs/page.tsx"] },
    { name: "blog", what: "A blog with a post page", routes: ["app/blog"] },
  ]
  const toc: TocEntry[] = [
    { id: "templates", title: "Templates in one command" },
    { id: "new-project", title: "New project", depth: 2 },
    { id: "existing-project", title: "Existing project", depth: 2 },
    { id: "the-registry", title: "The registry" },
    { id: "add", title: "add" },
    { id: "view", title: "view" },
    { id: "search", title: "search" },
    { id: "by-url", title: "Install by URL" },
    { id: "updating", title: "Updating" },
    { id: "icon-style", title: "Switch the icon style" },
    { id: "item-types", title: "Item types" },
  ]
  return (
    <GuidePage href="/docs/cli" toc={toc}>
      <section className="flex flex-col gap-4">
        <GuideH2 id="templates">Templates in one command</GuideH2>
        <p className="text-muted-foreground">
          Templates install by URL. Pick the path that matches where you start.
        </p>
        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="new-project">New project</GuideH3>
          <p className="text-muted-foreground">
            Use <Code>init</Code> when you&apos;re starting from nothing. It creates the Next.js app with the theme and every
            component the template needs, so there is nothing to set up first.
          </p>
          <InstallCommand args={`init -d -n my-saas ${templateUrl("saas")}`} />
          <p className="text-muted-foreground">
            Then run <Code>cd my-saas</Code> and <Code>pnpm dev</Code>.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="existing-project">Existing project</GuideH3>
          <p className="text-muted-foreground">
            Use <Code>add</Code> when the app is already set up and you want the template&apos;s pages next to your own.
          </p>
          <InstallCommand args={`add ${templateUrl("saas")}`} />
          <p className="text-muted-foreground">Before you run it, check these.</p>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
            <li>
              The app uses the App Router and Tailwind CSS 4. If it has no <Code>components.json</Code>, the CLI offers to
              create one first.
            </li>
            <li>
              Your work is committed, so you can review the diff afterwards. Add <Code>--dry-run</Code> to list the files
              without writing them.
            </li>
            <li>
              Nothing you need lives at the template&apos;s routes (table below). The CLI asks before replacing an existing
              file; <Code>--overwrite</Code> replaces it without asking.
            </li>
            <li>
              The theme rewrites its variables in your global CSS, so custom values under the same names are replaced.
              Re-apply them after.
            </li>
          </ul>
          <p className="text-muted-foreground">
            The notion-editor and email-editor blocks install the same way, for example{" "}
            <Code>add {templateUrl("notion-editor")}</Code>.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <GuideH3 id="template-list">Pick a template</GuideH3>
          <p className="text-muted-foreground">
            Swap <Code>saas</Code> in either command for another name. Each one also adds its parts under{" "}
            <Code>components/&lt;name&gt;/</Code>.
          </p>
          <div className="overflow-x-auto rounded-xl bg-card shadow-raised">
            <table className="w-full min-w-xl border-collapse text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-4 py-2.5 font-medium">Template</th>
                  <th className="px-4 py-2.5 font-medium">You get</th>
                  <th className="px-4 py-2.5 font-medium">Writes to</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t) => (
                  <tr key={t.name} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-2.5 align-top font-mono text-xs whitespace-nowrap text-foreground">{t.name}</td>
                    <td className="px-4 py-2.5 align-top text-muted-foreground">{t.what}</td>
                    <td className="px-4 py-2.5 align-top">
                      <span className="flex flex-wrap gap-1">
                        {t.routes.map((r) => (
                          <Code key={r}>{r}</Code>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="the-registry">The registry</GuideH2>
        <p className="text-muted-foreground">
          qinyang/ui is published as one static JSON file per item at <Code>{SITE_URL}/r/&lt;name&gt;.json</Code>. Register
          the namespace so every command below accepts short names like <Code>{ns}/button</Code>.
        </p>
        <AgentCodeBlock code={config} filename="components.json" language="json" />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="add">add</GuideH2>
        <p className="text-muted-foreground">
          Copies one or more items into your project, along with their <Code>registryDependencies</Code> (other{" "}
          <Code>{ns}</Code> items) and npm <Code>dependencies</Code>.
        </p>
        <InstallCommand args={`add ${ns}/date-range-picker ${ns}/tool-result`} />
        <p className="text-muted-foreground">
          Add <Code>--dry-run</Code> to preview the files without writing them, or <Code>--diff &lt;path&gt;</Code> to see
          what would change in a file you already have. Use <Code>--overwrite</Code> to replace existing files and{" "}
          <Code>--path</Code> to choose where they go.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="view">view</GuideH2>
        <p className="text-muted-foreground">Prints an item&apos;s metadata and source before you install it.</p>
        <InstallCommand args={`view ${ns}/prompt-bar`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="search">search</GuideH2>
        <p className="text-muted-foreground">
          Lists the items in the registry, optionally filtered with <Code>-q</Code>. <Code>list</Code> is an alias.
        </p>
        <InstallCommand args={`search ${ns} -q "chart"`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="by-url">Install by URL</GuideH2>
        <p className="text-muted-foreground">
          Any command also takes an item&apos;s URL in place of its name. Keep the namespace registered anyway, because
          items depend on other <Code>{ns}</Code> items such as the theme.
        </p>
        <InstallCommand args={`add ${itemUrl}`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="updating">Updating</GuideH2>
        <p className="text-muted-foreground">
          Installed files are yours, so nothing updates on its own. To pull a newer version of an item, compare first with{" "}
          <Code>--diff</Code>, then re-add it with <Code>--overwrite</Code> and re-apply any local edits. Check the{" "}
          <TextLink href="/docs/changelog">Changelog</TextLink> for what moved.
        </p>
        <InstallCommand args={`add ${ns}/button --diff components/ui/button.tsx`} />
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="icon-style">Switch the icon style</GuideH2>
        <p className="text-muted-foreground">
          The icon set comes in three styles with the same exports, and all of them install to the same file. Replace it to
          switch the icons in every component.
        </p>
        <InstallCommand args={`add ${templateUrl("icons-puffy")} --overwrite`} />
        <InstallCommand args={`add ${templateUrl("icons-outline")} --overwrite`} />
        <p className="text-muted-foreground">To go back to the default rounded set, run this.</p>
        <InstallCommand args={`add ${templateUrl("icons")} --overwrite`} />
        <p className="text-muted-foreground">
          When you later add an item that uses icons, the CLI asks before overwriting <Code>components/icons.tsx</Code>.
          Answer no to keep your style. A non-interactive run stops at that question. If you add with{" "}
          <Code>--overwrite</Code>, the rounded set comes back, so run your style&apos;s command again. Compare the styles on{" "}
          <TextLink href="/docs/icons#icon-styles">Icons</TextLink>.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <GuideH2 id="item-types">Item types</GuideH2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
          <li>
            <Code>registry:ui</Code> is a component, installed to your <Code>ui</Code> alias.
          </li>
          <li>
            <Code>registry:block</Code> is a block or template, which can ship several files including a{" "}
            <Code>page.tsx</Code>.
          </li>
          <li>
            <Code>registry:theme</Code> is the theme or an accent preset, which writes CSS variables rather than files (see{" "}
            <TextLink href="/docs/theming">Theming</TextLink>).
          </li>
          <li>
            <Code>registry:lib</Code> and <Code>registry:component</Code> are shared files such as <Code>{ns}/utils</Code>{" "}
            and <Code>{ns}/icons</Code>.
          </li>
        </ul>
        <p className="text-muted-foreground">This is a trimmed item file as the CLI receives it.</p>
        <AgentCodeBlock code={itemJson} filename={itemUrl.replace(/^https?:\/\//, "")} language="json" />
      </section>
    </GuidePage>
  )
}

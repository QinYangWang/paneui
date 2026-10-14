import { Code, GuidePage, TextLink } from "@/components/docs/guide-page"
import { InstallCommand } from "@/components/docs/install-command"
import { getItems, REGISTRY_NAME, REGISTRY_URL } from "@/lib/docs"
import { AgentCodeBlock } from "@/registry/base-nova/ui/agent-code-block"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/base-nova/ui/alert"

export const metadata = { title: "Installation" }

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 id={id} className="flex scroll-mt-20 items-center gap-3 text-lg font-semibold">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-card text-ui tabular-nums shadow-raised">{n}</span>
        {title}
      </h2>
      <div className="flex flex-col gap-3 sm:pl-10">{children}</div>
    </section>
  )
}

const USAGE = `import { Button } from "@/components/ui/button"

export function Save() {
  return <Button>Save changes</Button>
}`

export default function Installation() {
  const config = JSON.stringify({ registries: { [`@${REGISTRY_NAME}`]: REGISTRY_URL } }, null, 2)
  const count = getItems().length
  const toc = [
    { id: "requirements", title: "Requirements" },
    { id: "add-the-registry", title: "Add the registry" },
    { id: "install-the-theme", title: "Install the theme" },
    { id: "add-components", title: "Add components" },
    { id: "use-them", title: "Use them" },
  ]
  return (
    <GuidePage
      href="/docs/installation"
      toc={toc}
      lede={`${count} components are distributed through a shadcn namespaced registry. Add the namespace once, then install anything with the shadcn CLI.`}
    >
      <Alert variant="info" id="requirements" className="scroll-mt-20">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Requirements</AlertTitle>
          <AlertDescription>
            A React project (Next.js, Vite or similar) with Tailwind CSS 4 and shadcn initialised on a Base UI style (base-nova). Run{" "}
            <Code>shadcn init</Code> first if you have no components.json yet. Starting a new app? The SaaS, agent workspace,
            docs and blog templates install in one command: see <TextLink href="/docs/cli#templates">Templates in one command</TextLink>.
          </AlertDescription>
        </AlertContent>
      </Alert>

      <Step n={1} id="add-the-registry" title="Add the registry">
        <p className="text-muted-foreground">Add the namespace to your components.json:</p>
        <AgentCodeBlock code={config} filename="components.json" language="json" />
      </Step>

      <Step n={2} id="install-the-theme" title="Install the theme">
        <p className="text-muted-foreground">
          The native desktop tokens every component relies on (system UI font on a 13px scale, translucent fills,
          hairline elevation), a <Code>cn</Code> helper that knows the text-ui sizes, and the icon set.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/icons`} />
        <p className="text-muted-foreground">
          The colours follow BoardUI&apos;s system and the accent is blue. For another accent, add one preset after the
          theme: neutral (black / white), green, orange, rose or violet. <TextLink href="/docs/theming#accent-presets">Theming</TextLink>{" "}
          covers what each token does.
        </p>
        <InstallCommand args={`add @${REGISTRY_NAME}/theme-violet`} />
      </Step>

      <Step n={3} id="add-components" title="Add components">
        <InstallCommand args={`add @${REGISTRY_NAME}/button @${REGISTRY_NAME}/prompt-bar`} />
        <p className="text-muted-foreground">
          The CLI resolves each item&apos;s registry dependencies (for example a block pulls in the components it uses) and
          installs its npm packages. Components land in your project as source, so you can edit them freely.
        </p>
      </Step>

      <Step n={4} id="use-them" title="Use them">
        <p className="text-muted-foreground">
          Import from the path your components.json aliases point to. Every component page lists its parts and props under
          API Reference.
        </p>
        <AgentCodeBlock code={USAGE} filename="save.tsx" language="tsx" />
        <p className="text-muted-foreground">
          More commands (view, search, installing by URL) are on <TextLink href="/docs/cli">CLI &amp; registry</TextLink>.
        </p>
      </Step>
    </GuidePage>
  )
}

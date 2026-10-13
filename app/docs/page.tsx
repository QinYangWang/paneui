import { CodeBlock } from "@/components/docs/code-block"
import { REGISTRY_NAME, REGISTRY_URL } from "@/lib/docs"

export const metadata = { title: "Installation" }

export default async function Installation() {
  const config = JSON.stringify({ registries: { [`@${REGISTRY_NAME}`]: REGISTRY_URL } }, null, 2)
  return (
    <article className="flex max-w-3xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="text-muted-foreground">
          Components are distributed through a shadcn namespaced registry. You need a project with Tailwind CSS 4 and shadcn
          initialised on a Base UI style.
        </p>
      </header>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">1. Add the registry</h2>
        <p className="text-muted-foreground">Add the namespace to your components.json:</p>
        <CodeBlock code={config} lang="json" title="components.json" />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">2. Install the theme</h2>
        <p className="text-muted-foreground">The depth tokens (raised, pressed, well…) every component relies on.</p>
        <CodeBlock code={`pnpm dlx shadcn@latest add @${REGISTRY_NAME}/theme @${REGISTRY_NAME}/icons`} lang="bash" />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">3. Add components</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @${REGISTRY_NAME}/button @${REGISTRY_NAME}/prompt-bar`} lang="bash" />
      </section>
    </article>
  )
}

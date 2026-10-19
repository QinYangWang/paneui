# qinyang/ui

A shadcn registry (`@qinyang/*`, headless primitives, Tailwind CSS 4, spring motion) and its
Next.js docs site. Docs and gallery: https://qinyangwang.github.io/ui

## Templates in one command

Each template is a complete app. `init` creates a Next.js project, writes the theme, installs
every component the template uses and puts its routes in `app/`:

```bash
pnpm dlx shadcn@latest init -d -n my-saas  https://qinyangwang.github.io/ui/r/saas.json
pnpm dlx shadcn@latest init -d -n my-agent https://qinyangwang.github.io/ui/r/agent-workspace.json
pnpm dlx shadcn@latest init -d -n my-docs  https://qinyangwang.github.io/ui/r/docs.json
pnpm dlx shadcn@latest init -d -n my-blog  https://qinyangwang.github.io/ui/r/blog.json
```

| Template | Routes |
| --- | --- |
| `saas` | `/` marketing home, `/pricing`, `/changelog`, `/login`, `/signup`, `/forgot-password`, `/verify`, `/dashboard` (overview, analytics, customers, settings), 404 |
| `agent-workspace` | `/` the Agent Client Protocol workspace (offline demo agent); `node server/acp-bridge.mjs --root .` connects real agents |
| `docs` | `/docs` |
| `blog` | `/blog`, `/blog/post` |

Into an existing Next.js app (Tailwind 4), use `add` with the same URL:
`pnpm dlx shadcn@latest add https://qinyangwang.github.io/ui/r/saas.json`. The editor blocks install
the same way: `.../r/notion-editor.json` (MDX import/export) and `.../r/email-editor.json`.

No `components.json` setup is needed: published items list their dependencies as absolute URLs
(`scripts/registry-postbuild.mjs`). To use short names (`shadcn add @qinyang/button`), add
`"registries": { "@qinyang": "https://qinyangwang.github.io/ui/r/{name}.json" }` to components.json.

If you scaffold the app yourself with `create-next-app` and pnpm 10+, approve its native builds
(`pnpm approve-builds`, or `allowBuilds` in `pnpm-workspace.yaml`) or pnpm stops with
`ERR_PNPM_IGNORED_BUILDS`; `shadcn init -d` already does this.

## The qinyang CLI

`packages/cli` publishes `qinyang`, which runs the shadcn CLI and remembers what you installed:

```bash
npx @qinyang/ui@latest init           # register @qinyang in components.json, install the theme
npx @qinyang/ui@latest add button     # or: npx shadcn@latest add @qinyang/button
npx @qinyang/ui@latest search chart
npx @qinyang/ui@latest update         # reinstall the theme and every installed item (--dry-run first)
```

See [packages/cli/README.md](packages/cli/README.md).

## Icon style

The icon set ships in two styles with the same exports, both installed to `components/icons.tsx`.
One command switches every component in your project:

```bash
pnpm dlx shadcn@latest add https://qinyangwang.github.io/ui/r/icons-outline.json --overwrite  # outline
pnpm dlx shadcn@latest add https://qinyangwang.github.io/ui/r/icons.json --overwrite          # puffy (default)
```

Items that use icons depend on `icons`; adding one later asks before overwriting your
`components/icons.tsx` (answer no, the default). Adding with `--overwrite` restores the puffy set, so
re-run the outline command afterwards. In this repo the outline file is generated:
`components/icons.tsx` is the source, `scripts/icon-outline-overrides.mjs` holds per-icon outline
redraws, and `pnpm icons:gen` (also part of `pnpm registry:build`) writes
`registry/base-nova/icons/outline/icons.tsx`.

## Development

```bash
pnpm install
pnpm lint && pnpm exec tsc --noEmit -p .
pnpm docs:gen          # regenerate docs indexes after adding content/docs or examples
pnpm registry:build    # shadcn build + post-process into public/r
pnpm cli:test          # build and test packages/cli
```

The root is a pnpm workspace: the docs site and registry at the root, publishable packages in
`packages/`. `apps/desktop` installs on its own (`cd apps/desktop && pnpm install`).

Design rules for contributors and coding agents: [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE), © 2026 Wang Qinyang. Notices for bundled work are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

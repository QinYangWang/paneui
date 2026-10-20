# paneui

React components you own and edit.

[Docs and previews](https://qinyangwang.github.io/ui)

## Install

Start in a React project with Tailwind CSS 4:

```bash
npx @oukinyou/paneui@latest init
npx @oukinyou/paneui@latest add button card
```

The CLI writes source files into your project and records installs in `paneui.json`.

You can also register the namespace in `components.json`:

```json
{ "registries": { "@paneui": "https://qinyangwang.github.io/ui/r/{name}.json" } }
```

```bash
npx shadcn@latest add @paneui/theme @paneui/button
```

See the [CLI guide](packages/cli/README.md) for updates and theme options.

## Templates

Start an app from a template:

```bash
pnpm dlx shadcn@latest init -d -n my-app https://qinyangwang.github.io/ui/r/saas.json
```

[Browse templates](https://qinyangwang.github.io/ui/#templates).

## Development

```bash
pnpm install
pnpm lint
pnpm exec tsc --noEmit -p .
pnpm design:check
pnpm docs:gen
pnpm cli:test
```

The docs and registry live at the root. Publishable packages live in `packages/`.
The desktop app installs separately in `apps/desktop`.

Read [AGENTS.md](AGENTS.md) for design rules and contribution checks.

## License

[MIT](LICENSE), © 2026 Wang Qinyang.
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for notices.

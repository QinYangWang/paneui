# Contributing to paneui

Thanks for helping out. This file covers setup, where things live, and what to
run before opening a PR. The design rules live in
[AGENTS.md](AGENTS.md) and the `paneui-design` skill
(`skills/paneui-design/SKILL.md`) — read them before any UI work.

## Setup

```bash
pnpm install      # installs the docs site, registry tooling and packages/*
pnpm dev          # the docs site; keep a single instance running
```

The repo is a pnpm workspace. The docs site and the shadcn registry live at the
root; the publishable CLI lives in `packages/cli`. `apps/desktop` is a separate
workspace with its own lockfile — install it inside `apps/desktop/` if you need it.

## Project layout

| Path | What |
| --- | --- |
| `packages/ui/src/components/` | Components (`registry:ui`) |
| `packages/ui/src/blocks/<name>/` | Composed blocks (`registry:block`) |
| `packages/ui/src/icons/index.tsx` | Hand-drawn icon set; the outline set is generated from it |
| `apps/docs/registry/examples/` | One demo per item, written as a consumer |
| `apps/docs/content/docs/<name>.ts` | Docs page content (usage, composition, examples, API) |
| `apps/docs/app/`, `apps/docs/components/docs/`, `apps/docs/components/landing/` | The docs site and landing page |
| `packages/cli/` | The `paneui` CLI |
| `skills/paneui-design/` | The design rules and the design check |
| `tooling/scripts/` | Generation and audit scripts (`gen-docs.mjs`, `gen-docs-md.mjs`, `audit-radius.mjs`, …) |

## Adding a component

1. Create `packages/ui/src/components/<name>.tsx` (or `blocks/<name>/…`) with named
   part exports, `data-slot` on each part and `cva` variants.
2. Add a demo at `apps/docs/registry/examples/<name>-demo.tsx`. It must pass
   consumer lint: theme tokens only, no restyling.
3. Register the item in `packages/registry/registry.json` (type, title, one-sentence description
   of 12 words or fewer, dependencies, files, `meta.category`).
4. Add docs content at `apps/docs/content/docs/<name>.ts` and per-example files under
   `apps/docs/registry/examples/<name>/`.
5. Add the demo to `apps/docs/components/docs/demos.tsx`, run `node tooling/scripts/gen-docs.mjs`
   and commit the generated files.

Never edit `packages/ui/src/icons/outline/icons.tsx` by hand; change
`packages/ui/src/icons/index.tsx` or `tooling/scripts/icon-outline-overrides.mjs` and run
`pnpm icons:gen`.

## Design rules

Follow `skills/paneui-design/SKILL.md` (colour tokens, concentric radius,
`text-ui-*` sizes, motion, copy density). Running checks catches most of it:

```bash
pnpm design:check
```

If a rule is wrong for a legitimate case, allow-list it in
`paneui-design.config.json` with a reason instead of working around it.

## Checks before a PR

```bash
npx tsc --noEmit -p .
pnpm lint
pnpm design:check
pnpm registry:build   # when registry items or icons changed
pnpm docs:gen         # when a docs page or demo was added or renamed
```

`pnpm build` also regenerates the Markdown twins of the docs pages. Keep the
working tree clean of generated drift: commit regenerated files together with
the change that caused them.

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org/), enforced by
commitlint (`.github/workflows/commitlint.yml`):

```
<type>(<scope>): <summary>
```

Types come from `@commitlint/config-conventional` (`feat`, `fix`, `docs`,
`style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`). The
scope is the component or item name (`button`, `command-palette`, …), or one of
`site`, `cli`, `registry`, `docs`, `ci` for everything else. Keep the summary in
the imperative, without a trailing period.

## Release

The CLI is the only published package. Bump `version` in
`packages/cli/package.json`, then push a matching tag:

```bash
git tag cli-vX.Y.Z
git push origin cli-vX.Y.Z
```

`.github/workflows/release-cli.yml` verifies the tag against the package
version, runs the CLI tests and publishes `paneui` to npm with trusted
publishing (OIDC, no token). Cloudflare Pages builds and deploys the site from
`main` through its Git integration; there is no separate site release.
See [Deployment](README.md#deployment) for setup.

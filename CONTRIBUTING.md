# Contributing to paneui

Thanks for helping out. This file covers setup, where things live, and what to
run before opening a PR. The design rules live in
[AGENTS.md](AGENTS.md) and the `qinyang-design` skill
(`skills/qinyang-design/SKILL.md`) — read them before any UI work.

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
| `registry/base-nova/ui/` | Components (`registry:ui`) |
| `registry/base-nova/blocks/<name>/` | Composed blocks (`registry:block`) |
| `components/icons.tsx` | Hand-drawn icon set; the outline set is generated from it |
| `registry/base-nova/examples/` | One demo per item, written as a consumer |
| `content/docs/<name>.ts` | Docs page content (usage, composition, examples, API) |
| `app/`, `components/docs/`, `components/landing/` | The docs site and landing page |
| `packages/cli/` | The `paneui` CLI |
| `skills/qinyang-design/` | The design rules and the design check |
| `scripts/` | Generation and audit scripts (`gen-docs.mjs`, `gen-docs-md.mjs`, `audit-radius.mjs`, …) |

## Adding a component

1. Create `registry/base-nova/ui/<name>.tsx` (or `blocks/<name>/…`) with named
   part exports, `data-slot` on each part and `cva` variants.
2. Add a demo at `registry/base-nova/examples/<name>-demo.tsx`. It must pass
   consumer lint: theme tokens only, no restyling.
3. Register the item in `registry.json` (type, title, one-sentence description
   of 12 words or fewer, dependencies, files, `meta.category`).
4. Add docs content at `content/docs/<name>.ts` and per-example files under
   `registry/base-nova/examples/<name>/`.
5. Add the demo to `components/docs/demos.tsx`, run `node scripts/gen-docs.mjs`
   and commit the generated files.

Never edit `registry/base-nova/icons/outline/icons.tsx` by hand; change
`components/icons.tsx` or `scripts/icon-outline-overrides.mjs` and run
`pnpm icons:gen`.

## Design rules

Follow `skills/qinyang-design/SKILL.md` (colour tokens, concentric radius,
`text-ui-*` sizes, motion, copy density). Running checks catches most of it:

```bash
pnpm design:check
```

If a rule is wrong for a legitimate case, allow-list it in
`qinyang-design.config.json` with a reason instead of working around it.

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
version, runs the CLI tests and publishes `@oukinyou/paneui` to npm with trusted
publishing (OIDC, no token). The site deploys from the default branch through
the Pages workflow; there is no separate site release.

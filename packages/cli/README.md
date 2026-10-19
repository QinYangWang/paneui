# qinyang

Add, search and update [qinyang/ui](https://qinyangwang.github.io/ui) components and themes from the
command line. It runs the shadcn CLI to write files and install dependencies, so the result is the
same as `shadcn add`, and it remembers what you installed so one command can update all of it.

```bash
npx @qinyang/ui@latest init            # register @qinyang in components.json, install the theme
npx @qinyang/ui@latest add button card # add items
npx @qinyang/ui@latest update          # reinstall the theme and every installed item
```

Requires Node.js 18.17 or later and a project the shadcn CLI supports (React, Tailwind CSS 4).

## Commands

| Command | What it does |
| --- | --- |
| `init` | Runs `shadcn init` if there is no `components.json`, registers `@qinyang`, installs the theme. `--no-theme`, `--accent <name>`, `--radius <size>`; arguments after `--` go to `shadcn init`. |
| `add <items...>` | Runs `shadcn add` for the items and records them in `qinyang.json`. Accepts `button`, `@qinyang/button` or an item URL. `--overwrite`, `--yes`, `--path`, `--dry-run`. |
| `search [query]` | Matches name, title, description and category. `--category`, `--type`, `--all` (hidden presets), `--limit`, `--json`. |
| `list` | Every item, same options as `search`. |
| `info <item>` | Dependencies, files and where they install, and the install commands. `--json`. |
| `update` | Reinstalls the theme, then every recorded or detected item with `--overwrite`, then your accent, radius and icon style. `--dry-run` shows changed files and the commands; `--theme-only`; `--yes`; `--templates`; `--no-detect`. |
| `theme [accent]` | Reinstalls the theme with an accent and `--radius <size>`. `--list` shows the choices. |

Every command takes `--cwd <dir>` and `--registry <url>`.

## How update finds your items

`add` writes `qinyang.json` next to `components.json`:

```json
{
  "items": ["button", "card"],
  "theme": { "accent": "violet" },
  "icons": "icons-outline"
}
```

Without it, `update` looks for each registry item's files where the shadcn CLI would have written them
(using your `components.json` aliases and `tsconfig.json` paths) and counts an item as installed when
the local files share at least half their lines with the registry version. The accent, radius and icon
style are read from your stylesheet and `components/icons.tsx`. Page templates are left out unless you
pass `--templates`, because reinstalling one replaces its routes.

`update` replaces files whole. Commit first and review the diff; `--dry-run` lists what would change.

## With the shadcn CLI

`init` adds this to `components.json`, so `npx shadcn@latest add @qinyang/<name>` works too:

```json
{ "registries": { "@qinyang": "https://qinyangwang.github.io/ui/r/{name}.json" } }
```

Items added with the shadcn CLI are not in `qinyang.json`, but `update` still finds them.

## Configuration

| Setting | Default |
| --- | --- |
| Registry: `--registry`, then `$QINYANG_REGISTRY`, then `registries["@qinyang"]` in components.json | `https://qinyangwang.github.io/ui/r` |
| shadcn command: `$QINYANG_SHADCN` | `npx --yes shadcn@latest` |
| Colours: `NO_COLOR`, `FORCE_COLOR` | on in a terminal |

## Development

```bash
pnpm --filter qinyang build
pnpm --filter qinyang test   # builds, then runs node:test against a mock registry
node packages/cli/dist/index.js search chart
```

Releases publish from the `cli-v*` tags (`.github/workflows/release-cli.yml`).

## License

MIT

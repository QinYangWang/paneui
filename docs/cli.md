# CLI & registry

Page: https://paneui.dev/docs/cli/

Find, inspect and install components from the command line.

## Templates in one command

Templates install by URL. Pick the path that matches where you start.

### New project

Use `init` when you're starting from nothing. It creates the Next.js app with the theme and every component the template needs, so there is nothing to set up first.

```bash
pnpm dlx shadcn@latest init -d -n my-saas https://paneui.dev/r/saas.json
```

Then run `cd my-saas` and `pnpm dev`.

### Existing project

Use `add` when the app is already set up and you want the template's pages next to your own.

```bash
pnpm dlx shadcn@latest add https://paneui.dev/r/saas.json
```

Before you run it, check these.

- The app uses the App Router and Tailwind CSS 4. If it has no `components.json`, the CLI offers to create one first.
- Your work is committed, so you can review the diff afterwards. Add `--dry-run` to list the files without writing them.
- Nothing you need lives at the template's routes (table below). The CLI asks before replacing an existing file; `--overwrite` replaces it without asking.
- The theme rewrites its variables in your global CSS, so custom values under the same names are replaced. Re-apply them after.

The notion-editor and email-editor blocks install the same way, for example `add https://paneui.dev/r/notion-editor.json`.

### Pick a template

Swap `saas` in either command for another name. Each one also adds its parts under `components/<name>/`.

| Template | You get | Writes to |
| --- | --- | --- |
| `saas` | Marketing pages, sign-in and a dashboard | `app/page.tsx` `app/not-found.tsx` `app/pricing` `app/changelog` `app/(auth)` `app/dashboard` |
| `vscode` | A code editor with a shared workspace and terminals | `app/page.tsx` |
| `agent-workspace` | The agent workspace with its ACP bridge server | `app/page.tsx` `server/acp-bridge.mjs` |
| `docs` | A docs site | `app/docs/page.tsx` |
| `blog` | A blog with a post page | `app/blog` |

## The registry

paneui is published as one static JSON file per item at `https://paneui.dev/r/<name>.json`. Register the namespace so every command below accepts short names like `@paneui/button`.

```json title="components.json"
{
  "registries": {
    "@paneui": "https://paneui.dev/r/{name}.json"
  }
}
```

## The function(){throw Error("Attempted to call CLI_NAME() from the server but CLI_NAME is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")} CLI

Runs the shadcn CLI for you and records what it installs, so one command updates every item and the theme. Both CLIs write the same files; use either.

```bash
pnpm dlx paneui@latest init
```

Registers the namespace above in `components.json`, running `shadcn init` first if there is none, and installs the theme.

| Command | What it does |
| --- | --- |
| `add <items...>` | Adds items and records them in `paneui.json`. |
| `search [query]` | Finds items by name, title, description or category. `list` shows them all. |
| `info <item>` | Lists an item's dependencies and files, and where the files go. |
| `update` | Reinstalls the theme and every installed item, then your accent, radius and icon style. |
| `theme [accent]` | Reinstalls the theme with an accent and `--radius`. `--list` shows the choices. |

`update` replaces files whole, so commit first and preview with `--dry-run`. It also finds items you added with the shadcn CLI. Templates are skipped unless you pass `--templates`, because reinstalling one replaces its routes.

```bash
pnpm dlx paneui@latest update --dry-run
```

## add

Copies one or more items into your project, along with their `registryDependencies` (other `@paneui` items) and npm `dependencies`.

```bash
pnpm dlx shadcn@latest add @paneui/date-range-picker @paneui/tool-result
```

Add `--dry-run` to preview the files without writing them, or `--diff <path>` to see what would change in a file you already have. Use `--overwrite` to replace existing files and `--path` to choose where they go.

## view

Prints an item's metadata and source before you install it.

```bash
pnpm dlx shadcn@latest view @paneui/prompt-bar
```

## search

Lists the items in the registry, optionally filtered with `-q`. `list` is an alias.

```bash
pnpm dlx shadcn@latest search @paneui -q "chart"
```

## Install by URL

Any command also takes an item's URL in place of its name. Keep the namespace registered anyway, because items depend on other `@paneui` items such as the theme.

```bash
pnpm dlx shadcn@latest add https://paneui.dev/r/button.json
```

## Updating

Installed files are yours, so nothing updates on its own. To pull a newer version of an item, compare first with `--diff`, then re-add it with `--overwrite` and re-apply any local edits. Check the [Changelog](https://paneui.dev/docs/changelog/) for what moved.

```bash
pnpm dlx shadcn@latest add @paneui/button --diff components/ui/button.tsx
```

To update everything at once, run `update` from the paneui CLI.

## Upgrading after a theme change

When a release changes the theme, update it first, then the components that use it. Commit before you start so you can review every change.

1. Reinstall the theme. `--overwrite` is required: the theme also ships `lib/utils.ts`, and without it a non-interactive run stops at that question before the stylesheet is touched.

```bash
pnpm dlx shadcn@latest add @paneui/theme --overwrite
```

1. Reinstall your accent and radius presets, if you use them, so they apply on top of the new theme.
2. Run the upgrade check. It lists tokens the release removed, broken rules from older installs and code that uses a changed API, with a fix for each. `--fix` cleans the stylesheet, then checks again and lists only what is left; it never edits your source.

```bash
pnpm dlx shadcn@latest add @paneui/upgrade-check
```

```
node scripts/paneui-upgrade-check.mjs
node scripts/paneui-upgrade-check.mjs --fix
```

1. Re-add the components you use with `--overwrite`, a few at a time, and re-apply local edits from the diff.

### Migrations

Newest first. Each step lists only what needs your attention.

| Theme | What changed | What to do |
| --- | --- | --- |
| `2.3` | The frame inputs (`--frame-r`, `--frame-p`, `--frame-b`) reset on every element in `@layer base` instead of `@property`, so reinstalling the theme leaves the stylesheet unchanged. | Reinstall the theme, then run the upgrade check with `--fix` to delete the old `@property` rules. |
| `2.2` | Every radius token stops at `--radius-max` (16px), and the supported `--radius` range is 0 to 1rem. Old `rounded-4xl` and `rounded-5xl` corners come out at 16px. | Reinstall the theme. The upgrade check flags a stylesheet without the cap or a base above 1rem. |
| `2.1` | Wide-gamut colours and the layered popover shadow now apply. Older installs wrote them without the leading `--`, so browsers ignored them. | Reinstall the theme, then run the upgrade check with `--fix` to delete the broken lines. |
| `2` | New foundation. The `--accent-50` to `--accent-950` ramp is replaced by eight role tokens; `--radius` goes from 0.625rem to 0.5rem; alpha grey text and borders; four shadow levels; Inter, JetBrains Mono and Newsreader font stacks; `frame-*` and `rounded-inner` utilities. | Move `accent-*` classes to `primary` roles, then delete the ramp (`--fix`). Keep 0.625rem with `theme-radius-lg` if you prefer it. Install `fonts` to self-host the fonts. Reinstall components so nested corners use the frame utilities. |
| `1.x` | `size` on `Input` and `NativeSelect` became the control size; the native attribute moved to `htmlSize`. | Rename numeric `size` props to `htmlSize`. The upgrade check lists each one. |

The installed version is `meta.version` in `@paneui/theme`; `view @paneui/theme` prints the current one.

### What the CLI merges

- Variables in `:root`, `.dark` and `@theme` are added or updated in place, so new values replace old ones under the same name.
- Nothing is ever removed. A token a release drops stays in your stylesheet, along with any utility it generates; the upgrade check finds them.
- Rules inside `@supports` and `@media` blocks merge by selector and property, the same as variables.
- `@property` rules are appended again on every reinstall, so the theme ships none. Copies left by theme 2.2 and earlier are harmless; the upgrade check removes them.
- Files with a `~/` target, such as the design skill and the upgrade check, land at the project root even when your components live under `src/`.
- Component files are replaced whole with `--overwrite`, or skipped after a prompt without it. Use `--diff` or `--dry-run` first; there is no three-way merge of your edits.

## Switch the icon style

The icon set comes in three styles with the same exports, and all of them install to the same file. Replace it to switch the icons in every component.

```bash
pnpm dlx shadcn@latest add https://paneui.dev/r/icons-puffy.json --overwrite
```

```bash
pnpm dlx shadcn@latest add https://paneui.dev/r/icons-outline.json --overwrite
```

To go back to the default rounded set, run this.

```bash
pnpm dlx shadcn@latest add https://paneui.dev/r/icons.json --overwrite
```

When you later add an item that uses icons, the CLI asks before overwriting `components/icons.tsx`. Answer no to keep your style. A non-interactive run stops at that question. If you add with `--overwrite`, the rounded set comes back, so run your style's command again. Compare the styles on [Icons](https://paneui.dev/docs/icons/#icon-styles).

## Item types

- `registry:ui` is a component, installed to your `ui` alias.
- `registry:block` is a block or template, which can ship several files including a `page.tsx`.
- `registry:theme` is the theme or an accent preset, which writes CSS variables rather than files (see [Theming](https://paneui.dev/docs/theming/)).
- `registry:lib` and `registry:component` are shared files such as `@paneui/utils` and `@paneui/icons`.

This is a trimmed item file as the CLI receives it.

```json title="paneui.dev/r/button.json"
{
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Triggers an action or submits a form.",
  "dependencies": ["@base-ui/react", "class-variance-authority"],
  "registryDependencies": ["@paneui/theme"],
  "files": [{ "path": "registry/base-nova/ui/button.tsx", "type": "registry:ui", "content": "…" }]
}
```

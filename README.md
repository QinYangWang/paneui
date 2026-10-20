# paneui

React components you own and edit.

[Docs and previews](https://paneui.dev)

## Install

Start in a React project with Tailwind CSS 4:

```bash
npx paneui@latest init
npx paneui@latest add button card
```

The CLI writes source files into your project and records installs in `paneui.json`.

You can also register the namespace in `components.json`:

```json
{ "registries": { "@paneui": "https://paneui.dev/r/{name}.json" } }
```

```bash
npx shadcn@latest add @paneui/theme @paneui/button
```

See the [CLI guide](packages/cli/README.md) for updates and theme options.

## Templates

Start an app from a template:

```bash
pnpm dlx shadcn@latest init -d -n my-app https://paneui.dev/r/saas.json
```

[Browse templates](https://paneui.dev/#templates).

## Development

```bash
pnpm install
pnpm lint
pnpm exec tsc --noEmit -p .
pnpm design:check
pnpm docs:gen
pnpm cli:test
```

Applications live in `apps/`; shared source and distribution packages live in `packages/`.
Web and Native have independent showcases.
The desktop app installs separately in `apps/desktop`.

Read [AGENTS.md](AGENTS.md) for design rules and contribution checks.

## Workspace

| Path | Responsibility |
| --- | --- |
| `apps/docs` | Web docs, live examples and templates |
| `apps/native` | Independent Native component showcase for devices and browsers |
| `apps/desktop` | Desktop shell with its own install |
| `packages/ui` | Web component source |
| `packages/ui-native` | Native component source |
| `packages/tokens` | Shared design values and theme styles |
| `packages/core` | Platform-independent React state and hooks |
| `packages/registry` | Registry metadata and source publication |
| `packages/cli` | Component installer |
| `tooling` | Generators, checks and shared configuration |

```bash
pnpm dev              # Web docs
pnpm native           # Native showcase on a device
pnpm native:web       # Native showcase in a browser
pnpm native:build     # Export the Native showcase to apps/native/dist
pnpm typecheck        # Check all workspace packages
pnpm registry:test    # Verify registry source portability
```

The Native showcase has its own component catalogue and theme controls. The
combined Pages build serves Web at `/` and the Native browser showcase at `/native/`.
Both showcases consume shared tokens and keep independent runtime bundles.
See [Native development](apps/native/README.md).

## Deployment

Cloudflare Pages connects directly to this Git repository and builds the docs
site, registry and Native browser showcase on each push in one Pages project.
Set it up once in the Cloudflare dashboard:

1. Open **Workers & Pages**, create a **Pages** project, and choose **Connect to
   Git**. Authorize access to this repository and select it.
2. Configure the build:

   | Setting | Value |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Root directory | Repository root (leave empty) |
   | Build command | `pnpm build:cloudflare` |
   | Build output directory | `apps/docs/out` |

3. Set these environment variables for both production and preview builds:

   | Variable | Value |
   | --- | --- |
   | `NODE_VERSION` | `22.23.2` |
   | `PNPM_VERSION` | `12.9.1` (match `packageManager` in `package.json`) |
   | `SITE_URL` | `https://paneui.dev` (your production domain) |
   | `NEXT_TELEMETRY_DISABLED` | `1` |

4. Save and deploy. The build generates registry files, exports the site to
   `apps/docs/out/`, generates and audits the Markdown docs, then exports the Native
   showcase with a `/native` asset prefix into `apps/docs/out/native/`. Pushes to `main` update
   production; enable preview branches to deploy other branches automatically.
5. After the first successful deployment, add `paneui.dev` under the project's
   **Custom domains** and follow the DNS instructions. In the Git repository's
   **Settings > Pages**, disable the old publishing source. Replace the old
   Pages DNS records when switching the domain, then delete the unused
   `gh-pages` branch after confirming the new site works.

One project publishes the complete `apps/docs/out` directory. Do not set the
root directory to either application folder. `/native/` is a separate exported
application; ordinary links switch between its runtime and the Web docs. No
global SPA rewrite is added, so missing Web routes retain the Web 404 page.

Deployment is managed by the dashboard's Git integration. No deployment workflow
or Cloudflare API secrets are needed in the Git repository. If you already
created a Direct Upload project, create a new Git-connected Pages project for
this setup.

To build and preview the exported site locally (Node.js 22 required):

```bash
pnpm build:cloudflare
pnpm dlx wrangler@4 pages dev apps/docs/out
```

See the [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/)
and [build environment settings](https://developers.cloudflare.com/pages/configuration/build-image/).

## License

[MIT](LICENSE), © 2026 Wang Qinyang.
See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for notices.

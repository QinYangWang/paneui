# Introduction

Page: https://paneui.dev/docs/

React components you own and edit.

paneui is a shadcn registry, not an npm package. Add the `@paneui` namespace to your project once, then the CLI copies each component and its dependencies into your codebase. From then on the code is yours.

Use it for app interfaces. Start from a template when you want the pieces already wired together.

## Principles

- **Open code**: Every item installs into your project as source through the shadcn CLI. To change a component, edit its file.
- **Native desktop style**: Sizes and surfaces are tuned for dense app screens rather than marketing pages.
- **Accessible primitives**: Interactive parts sit on headless primitives, so focus, keyboard and ARIA behaviour come built in.
- **Motion with restraint**: Animations settle without bounce, and each one becomes a cross-fade when the user prefers reduced motion.
- **Tokens only**: Components read theme tokens, never raw colours, so a theme or accent change restyles everything at once. Lint rules enforce it.

## What's inside

- [Foundations](https://paneui.dev/docs/components/#foundations)
- [Forms](https://paneui.dev/docs/components/#forms)
- [Overlays](https://paneui.dev/docs/components/#overlays)
- [Display](https://paneui.dev/docs/components/#display)
- [Navigation](https://paneui.dev/docs/components/#navigation)
- [Text](https://paneui.dev/docs/components/#text)
- [Motion](https://paneui.dev/docs/components/#motion)
- [Data](https://paneui.dev/docs/components/#data)
- [Agents](https://paneui.dev/docs/components/#agents)
- [Charts](https://paneui.dev/docs/components/#charts)
- [Blocks](https://paneui.dev/docs/components/#blocks)
- [Templates](https://paneui.dev/docs/components/#templates)

## Stack

- Headless primitives for interactive parts (the `base-nova` style).
- [Tailwind CSS 4](https://tailwindcss.com) with CSS-variable tokens declared in `@theme inline`.
- `motion/react` for springs and layout animation.
- The [shadcn CLI](https://ui.shadcn.com/docs/cli) for distribution, and an icon set shipped as `@paneui/icons`.

## Quick start

Add the namespace (see [Installation](https://paneui.dev/docs/installation/)), then install the theme and a first component.

```bash
pnpm dlx shadcn@latest add @paneui/theme @paneui/button
```

- [Installation](https://paneui.dev/docs/installation/)
- [Browse components](https://paneui.dev/docs/components/)

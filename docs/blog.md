# Personal Blog

> Personal blog with a post list and an article page.

Page: https://paneui.dev/docs/blog/

## Installation

```bash
npx shadcn@latest add @paneui/blog
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/blog.json
```

Packages: `motion`, `simple-icons`.

Registry items it builds on: `@paneui/theme`, `@paneui/typeset`, `@paneui/badge`, `@paneui/button`, `@paneui/icons`, `@paneui/input`, `@paneui/scroll-progress`, `@paneui/theme-toggle`, `@paneui/toast`, `@paneui/brand-icon`, `@paneui/code-block`, `@paneui/outline`, `@paneui/cover-art`.

## Usage

```tsx
// app/blog/page.tsx and app/blog/post/page.tsx: each route renders one page of the template.
// Pass hrefs if your blog lives somewhere other than /blog. Live preview: /templates/blog
import { BlogHome } from "@/registry/base-nova/templates/blog/blog"
import { BlogPost } from "@/registry/base-nova/templates/blog/post"

const hrefs = { home: "/blog", post: "/blog/post" }

export function BlogPostDemo() {
  return <BlogPost hrefs={hrefs} />
}

export default function BlogDemo() {
  return <BlogHome hrefs={hrefs} />
}
```

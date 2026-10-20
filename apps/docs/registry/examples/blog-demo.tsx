// app/blog/page.tsx and app/blog/post/page.tsx: each route renders one page of the template.
// Pass hrefs if your blog lives somewhere other than /blog. Live preview: /templates/blog
import { BlogHome } from "@/registry/templates/blog/blog"
import { BlogPost } from "@/registry/templates/blog/post"

const hrefs = { home: "/blog", post: "/blog/post" }

export function BlogPostDemo() {
  return <BlogPost hrefs={hrefs} />
}

export default function BlogDemo() {
  return <BlogHome hrefs={hrefs} />
}

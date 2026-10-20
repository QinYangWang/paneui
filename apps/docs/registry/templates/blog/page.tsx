import { BlogHome } from "@/registry/templates/blog/blog"

export default function BlogPage() {
  return <BlogHome hrefs={{ home: "/blog", post: "/blog/post" }} />
}

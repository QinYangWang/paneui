import { BlogHome } from "@/registry/base-nova/templates/blog/blog"

export default function BlogPage() {
  return <BlogHome hrefs={{ home: "/blog", post: "/blog/post" }} />
}

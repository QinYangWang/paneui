import type { Metadata } from "next"

import { BlogHome } from "@/registry/base-nova/templates/blog/blog"

export const metadata: Metadata = { title: "Blog template" }

export default function BlogTemplateRoute() {
  return <BlogHome hrefs={{ home: "/templates/blog", post: "/templates/blog/post" }} />
}

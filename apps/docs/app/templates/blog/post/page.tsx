import type { Metadata } from "next"

import { BlogPost } from "@/registry/templates/blog/post"

export const metadata: Metadata = { title: "Blog post template" }

export default function BlogPostTemplateRoute() {
  return <BlogPost hrefs={{ home: "/templates/blog", post: "/templates/blog/post" }} />
}

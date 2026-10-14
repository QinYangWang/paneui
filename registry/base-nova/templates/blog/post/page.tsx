import { BlogPost } from "@/registry/base-nova/templates/blog/post"

export default function BlogPostPage() {
  return <BlogPost hrefs={{ home: "/blog", post: "/blog/post" }} />
}

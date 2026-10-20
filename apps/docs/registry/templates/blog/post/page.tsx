import { BlogPost } from "@/registry/templates/blog/post"

export default function BlogPostPage() {
  return <BlogPost hrefs={{ home: "/blog", post: "/blog/post" }} />
}

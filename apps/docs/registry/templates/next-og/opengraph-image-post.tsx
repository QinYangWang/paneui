import { ImageResponse } from "next/og"

import { OgCoverArt, OgImage, ogImageContentType, ogImageSize } from "@paneui/ui/components/og-image"

/*
 * One share image per post: app/blog/[slug]/opengraph-image.tsx. Swap `getPost` for your content
 * source. With `generateStaticParams` on the page, every image is rendered at build time.
 */

type Post = { title: string; description: string; author: string; date: string; tags: string[] }

async function getPost(slug: string): Promise<Post> {
  return { title: slug.replace(/-/g, " "), description: "", author: "Acme", date: "", tags: [] }
}

export const alt = "Blog post"
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: size.width, height: size.height }}>
      <OgCoverArt seed={slug} style={{ position: "absolute", left: 0, top: 0 }} />
      <OgImage
        title={post.title}
        description={post.description || undefined}
        siteName="Acme Blog"
        author={post.author}
        date={post.date || undefined}
        tags={post.tags}
        pattern="none"
        // a scrim over the art so the text stays readable
        style={{ position: "absolute", left: 0, top: 0, backgroundColor: "#ffffffd9" }}
      />
    </div>,
    size
  )
}

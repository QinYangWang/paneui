"use client"

import { BlogHome } from "@/registry/templates/blog/blog"
import { BlogPost } from "@/registry/templates/blog/post"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

/** Which blog preview route to render. */
export type BlogTemplatePage = "home" | "post"

export type BlogTemplateData = { page: BlogTemplatePage }

/** The preview mounts the blog under /templates/blog, so its own links point there too. */
const HREFS = { home: "/templates/blog", post: "/templates/blog/post" }

/**
 * A blog template page under /templates/blog. The preview route never applied the template's own
 * layout (the site shell already supplies the toast provider it adds), so nothing wraps the page here.
 */
export default function BlogTemplateRoute({ site, data }: { site: SiteProps; data: BlogTemplateData }) {
  return <SiteRoot {...site}>{data.page === "post" ? <BlogPost hrefs={HREFS} /> : <BlogHome hrefs={HREFS} />}</SiteRoot>
}

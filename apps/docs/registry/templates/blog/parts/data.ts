/** Replace these with your own posts. Dates are ISO `YYYY-MM-DD` so they sort and group as text. */
export type Post = {
  slug: string
  title: string
  date: string
}

export const author = {
  name: "Mira Okafor",
  role: "design engineer",
  location: "Lisbon",
}

/** The wordmark in the breadcrumb and the title on the index page. */
export const site = { name: author.name }

export const posts: Post[] = [
  { slug: "concentric-corners", title: "Concentric corners", date: "2026-08-19" },
  { slug: "reading-on-small-screens", title: "Reading order on a small screen", date: "2026-02-07" },
  { slug: "markdown-typesetting", title: "Typesetting notes in Markdown", date: "2025-11-14" },
  { slug: "quiet-navigation", title: "Navigation you can find without looking", date: "2025-06-22" },
  { slug: "numbers-that-hold-still", title: "Numbers that hold still", date: "2025-01-09" },
  { slug: "first-principles", title: "Starting from a simple page", date: "2024-11-03" },
  { slug: "keeping-notes", title: "Writing down what I notice", date: "2024-03-12" },
]

export type PostYear = { year: string; posts: Post[] }

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/** Posts newest first, grouped under the year in their date. */
export function groupPostsByYear(list: Post[] = posts): PostYear[] {
  const groups = new Map<string, Post[]>()
  for (const post of [...list].sort((a, b) => b.date.localeCompare(a.date))) {
    const year = post.date.slice(0, 4)
    const group = groups.get(year)
    if (group) group.push(post)
    else groups.set(year, [post])
  }
  return [...groups].map(([year, group]) => ({ year, posts: group }))
}

/** `08/19`, the short form in the list. */
export function formatPostDate(date: string): string {
  const [, month, day] = date.split("-")
  return `${month}/${day}`
}

/** `19 August 2026`, the line under a post title. */
export function formatLongDate(date: string): string {
  const [year, month, day] = date.split("-")
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
}

export type Social = { label: string; href: string; icon: "code" | "mail" }

/** The row of links under the intro. Icons come from the house set, so the labels stay plain. */
export const socials: Social[] = [
  { label: "Code", href: "#", icon: "code" },
  { label: "Mail", href: "#", icon: "mail" },
]

export const author = {
  name: "Mira Okafor",
  role: "Design engineer",
  bio: "I build interfaces at the seam between design and code, and write about the small details that make software feel calm.",
  location: "Lisbon",
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: number
  tags: string[]
  cover: 0 | 1 | 2 | 3
}

export const posts: Post[] = [
  {
    slug: "concentric-corners",
    title: "Concentric corners, and other things your eye notices first",
    excerpt: "Why a card inside a card looks wrong when both share a radius, and the one-line rule that fixes nested surfaces.",
    date: "Oct 9, 2026",
    readingTime: 7,
    tags: ["Design", "CSS"],
    cover: 0,
  },
  {
    slug: "motion-budgets",
    title: "A motion budget for product UI",
    excerpt: "Spend animation on moments that happen once. Everything you touch a hundred times a day should feel instant.",
    date: "Sep 22, 2026",
    readingTime: 9,
    tags: ["Motion", "Design"],
    cover: 1,
  },
  {
    slug: "oklch-in-practice",
    title: "OKLCH in practice: one hue, twelve jobs",
    excerpt: "Building a neutral and an accent ramp where every step has a role, and dark mode is more than the list reversed.",
    date: "Aug 30, 2026",
    readingTime: 11,
    tags: ["Color", "CSS"],
    cover: 2,
  },
  {
    slug: "tabular-numbers",
    title: "Numbers that don't wiggle",
    excerpt: "Tabular figures, fixed-width counters and the three places every dashboard forgets to use them.",
    date: "Aug 4, 2026",
    readingTime: 4,
    tags: ["Typography"],
    cover: 3,
  },
  {
    slug: "agent-interfaces",
    title: "Designing for an agent that asks permission",
    excerpt: "Approval cards, live plans and diffs: notes from a year of building interfaces for coding agents.",
    date: "Jul 12, 2026",
    readingTime: 13,
    tags: ["AI", "Design"],
    cover: 1,
  },
]

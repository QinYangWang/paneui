import { CoverArt } from "@paneui/ui/components/cover-art"

const posts = [
  { slug: "plain-text", title: "Plain text" },
  { slug: "small-websites", title: "Small websites" },
  { slug: "summer-reading", title: "Summer reading" },
  { slug: "concentric-corners", title: "Concentric corners" },
  { slug: "desktop-density", title: "Designing for desktop density" },
  { slug: "one-accent", title: "One accent, eight roles" },
]

export default function CoverArtSeed() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
      {posts.map((p) => (
        <article key={p.slug} className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-xl shadow-raised">
            <CoverArt seed={p.slug} aria-label={`Cover for ${p.title}`} className="aspect-video" />
          </div>
          <p className="text-ui font-medium">{p.title}</p>
        </article>
      ))}
    </div>
  )
}

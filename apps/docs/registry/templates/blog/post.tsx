"use client"

import Link from "next/link"

import { ArrowLeftIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { CodeBlock } from "@paneui/ui/components/code-block"
import { ScrollProgress } from "@paneui/ui/components/scroll-progress"

import { PostMeta, Tags, type BlogHrefs } from "./blog"
import { Avatar } from "./parts/author-avatar"
import { nestedSurface } from "./parts/code"
import { BlogFooter, BlogHeader, Container, Newsletter } from "./parts/chrome"
import { CoverArt } from "@paneui/ui/components/cover-art"
import { author, posts } from "./parts/data"
import { Stagger, StaggerItem } from "./parts/stagger"
import { Outline, type OutlineItem } from "@paneui/ui/components/outline"

const post = posts[0]

const toc: OutlineItem[] = [
  { id: "the-rule", title: "The rule", depth: 2 },
  { id: "why-it-looks-wrong", title: "Why equal radii look wrong", depth: 2 },
  { id: "in-tailwind", title: "Writing it in Tailwind", depth: 2 },
  { id: "when-to-stop", title: "When to stop", depth: 2 },
  { id: "checklist", title: "A short checklist", depth: 3 },
]

/** Blog post: cover, prose article, sticky TOC, author card, related posts and newsletter. */
export function BlogPost({ hrefs = { home: "/blog", post: "/blog/post" } }: { hrefs?: BlogHrefs }) {
  const related = posts.slice(1, 4)
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <BlogHeader homeHref={hrefs.home} />
      <ScrollProgress className="top-14" />
      <main className="flex-1">
        <Container className="flex flex-col gap-10 pt-10 pb-24 sm:pt-14">
          <Stagger className="flex max-w-3xl flex-col items-start gap-5">
            <StaggerItem>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={hrefs.home} />} className="-ms-3 text-muted-foreground">
                <ArrowLeftIcon className="rtl:-scale-x-100" data-icon="inline-start" />
                All writing
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Tags tags={post.tags} />
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">{post.title}</h1>
            </StaggerItem>
            <StaggerItem className="flex items-center gap-3">
              <Avatar name={author.name} />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{author.name}</span>
                <PostMeta date={post.date} minutes={post.readingTime} />
              </div>
            </StaggerItem>
          </Stagger>

          <div className="overflow-hidden rounded-2xl outline -outline-offset-1 outline-(--image-outline)">
            <CoverArt seed={post.slug} className="aspect-video w-full sm:aspect-21/9" />
          </div>

          <div className="flex justify-between gap-12">
            <article className="typeset typeset-reading min-w-0 flex-1 max-w-reading">
              <p>
                Put a rounded card inside another rounded card with a little padding between them, give both the same radius, and
                something feels off. Most people can&apos;t say what. The inner corners look too sharp next to the outer ones, and the
                gap between them bulges at each corner.
              </p>
              <h2 id="the-rule">The rule</h2>
              <p>
                When two surfaces share an even inset, the outer radius should equal the inner radius plus the padding between them.
                Add the border width too, if there is one. That keeps the gap the same thickness all the way around the curve.
              </p>
              <blockquote>
                <p>Outer radius = inner radius + padding.</p>
              </blockquote>
              <h2 id="why-it-looks-wrong">Why equal radii look wrong</h2>
              <p>
                A corner radius describes a circle. If both corners use the same circle but one sits inset from the other, the two arcs
                don&apos;t share a centre. At the straight edges the gap is your padding; at the corner it&apos;s wider, by roughly{" "}
                <code>0.41 × radius</code>. Your eye reads that as the inner shape shrinking away from its frame.
              </p>
              <ul>
                <li>The effect is strongest on small, tight insets like segmented controls and chips.</li>
                <li>It nearly disappears once the padding passes about 24px.</li>
                <li>Dark mode makes it more visible, because shadows give way to hairline rings.</li>
              </ul>
              <h2 id="in-tailwind">Writing it in Tailwind</h2>
              <p>
                With a radius scale, pick the inner token first and walk up the scale by the padding. Here a <code>12px</code> panel
                sits in a <code>4px</code> frame, so the frame takes <code>16px</code>.
              </p>
              <div className="not-typeset">
                <CodeBlock title="nested-surface.tsx" language="tsx" html={nestedSurface} />
              </div>
              <p>
                The image in the middle is not part of the chain. Its padding is <code>16px</code>, which would leave it a radius of
                only 4px; at that distance it reads as its own surface, so it keeps its own token.
              </p>
              <h2 id="when-to-stop">When to stop</h2>
              <p>
                The rule is about shapes your eye compares directly. Past roughly 24px of padding, or with deliberately uneven insets,
                the layers stop reading as one object and each should keep the radius it would have on its own.
              </p>
              <h3 id="checklist">A short checklist</h3>
              <ol>
                <li>Find every padded parent whose child has the same radius.</li>
                <li>Add the padding (and border) to the parent.</li>
                <li>If the result is larger than your biggest token, the layers are separate surfaces anyway.</li>
              </ol>
              <hr />
              <p>
                Thanks to Leo Park and Yuki Tanaka for reading drafts of this. If you have a counterexample, I&apos;d love to see it:{" "}
                <a href="#">write to me</a>.
              </p>
            </article>
            <aside className="sticky top-24 w-56 shrink-0 self-start max-lg:hidden">
              <Outline items={toc} maxHeight="calc(100svh - 7.5rem)" />
            </aside>
          </div>

          <section aria-label="About the author" className="flex max-w-reading flex-col gap-4 rounded-2xl bg-card p-6 shadow-raised sm:flex-row sm:items-center sm:gap-5">
            <Avatar name={author.name} size="lg" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{author.name}</p>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{author.bio}</p>
            </div>
            <Button variant="secondary" size="sm" className="shrink-0 sm:ms-auto">
              Follow
            </Button>
          </section>

          <section aria-labelledby="related-title" className="flex flex-col gap-6 pt-6">
            <h2 id="related-title" className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={hrefs.post}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-raised transition-shadow duration-150 outline-none hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <CoverArt seed={p.slug} className="aspect-video" />
                  <div className="flex flex-col gap-2 p-5">
                    <PostMeta date={p.date} minutes={p.readingTime} />
                    <h3 className="leading-snug font-medium text-balance">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Newsletter />
        </Container>
      </main>
      <BlogFooter />
    </div>
  )
}

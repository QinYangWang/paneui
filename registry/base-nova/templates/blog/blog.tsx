"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"

import { Avatar } from "./parts/avatar"
import { BlogFooter, BlogHeader, Container, Newsletter } from "./parts/chrome"
import { CoverArt } from "./parts/cover-art"
import { author, posts } from "./parts/data"
import { Stagger, StaggerItem } from "./parts/stagger"

export type BlogHrefs = { home: string; post: string }

/** Personal blog home: intro, featured post, post list and newsletter. */
export function BlogHome({ hrefs = { home: "/blog", post: "/blog/post" } }: { hrefs?: BlogHrefs }) {
  const [featured, ...rest] = posts
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <BlogHeader homeHref={hrefs.home} />
      <main className="flex-1">
        <Container className="flex flex-col gap-20 py-16 sm:py-24">
          <Stagger className="flex max-w-2xl flex-col items-start gap-6">
            <StaggerItem className="flex items-center gap-4">
              <Avatar name={author.name} size="lg" />
              <Badge variant="success" size="sm">
                <span aria-hidden className="size-1.5 rounded-full bg-success" />
                Open to consulting
              </Badge>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl sm:leading-none">
                Notes on interfaces that feel calm.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                I&apos;m {author.name}, a {author.role.toLowerCase()} in {author.location}. {author.bio}
              </p>
            </StaggerItem>
          </Stagger>

          <section aria-labelledby="featured-title" className="flex flex-col gap-6">
            <h2 id="featured-title" className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Latest
            </h2>
            <Link
              href={hrefs.post}
              className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-card shadow-raised transition-shadow duration-150 outline-none hover:shadow-raised-hover focus-visible:ring-2 focus-visible:ring-ring/50 md:grid-cols-2"
            >
              <CoverArt variant={featured.cover} className="aspect-video md:aspect-auto md:min-h-72" />
              <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                <div className="flex flex-col gap-3">
                  <PostMeta date={featured.date} minutes={featured.readingTime} />
                  <h3 className="text-2xl leading-tight font-semibold tracking-tight text-balance">{featured.title}</h3>
                  <p className="leading-relaxed text-pretty text-muted-foreground">{featured.excerpt}</p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Tags tags={featured.tags} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read
                    <ArrowRightIcon size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </section>

          <section aria-labelledby="all-title" className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="all-title" className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                All writing
              </h2>
              <span className="text-sm text-muted-foreground tabular-nums">{posts.length} posts</span>
            </div>
            <ul className="flex flex-col">
              {rest.map((p) => (
                <li key={p.slug} className="border-t border-border first:border-t-0">
                  <Link
                    href={hrefs.post}
                    className="group -mx-4 grid grid-cols-1 gap-2 rounded-2xl px-4 py-5 transition-colors duration-150 outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/50 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <time className="text-sm text-muted-foreground tabular-nums sm:pt-0.5">{p.date}</time>
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="text-lg leading-snug font-medium tracking-tight text-balance">{p.title}</h3>
                      <p className="text-pretty text-muted-foreground">{p.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Tags tags={p.tags} />
                        <span className="text-xs text-muted-foreground tabular-nums">{p.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="self-start">
              Browse the archive
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </section>

          <Newsletter />
        </Container>
      </main>
      <BlogFooter />
    </div>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <Badge key={t} size="sm" variant="chip">
          {t}
        </Badge>
      ))}
    </span>
  )
}

export function PostMeta({ date, minutes }: { date: string; minutes: number }) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums">
      <time>{date}</time>
      <span aria-hidden>·</span>
      <span>{minutes} min read</span>
    </p>
  )
}

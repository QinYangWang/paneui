"use client"

import * as React from "react"
import Link from "next/link"

import { CodeIcon, MailIcon } from "@paneui/ui/icons"

import { BlogTopBar, Container, TextLink } from "./parts/chrome"
import { formatPostDate, groupPostsByYear, site, socials, type Social } from "./parts/data"

export type BlogHrefs = { home: string; post: string }

const SOCIAL_ICONS = { code: CodeIcon, mail: MailIcon }

function SocialLink({ social }: { social: Social }) {
  const Icon = SOCIAL_ICONS[social.icon]
  return (
    <a
      href={social.href}
      rel="noreferrer"
      className="inline-flex items-baseline gap-1 rounded-xs text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 outline-none hover:decoration-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <Icon size={14} className="translate-y-0.5" />
      {social.label}
    </a>
  )
}

/**
 * Personal blog home: a short intro, the social row, then every post grouped by year.
 * Links in the intro are underlined; list rows stay plain until hovered.
 */
export function BlogHome({ hrefs = { home: "/blog", post: "/blog/post" } }: { hrefs?: BlogHrefs }) {
  const years = groupPostsByYear()
  return (
    <div className="bg-background">
      <Container>
        <BlogTopBar homeHref={hrefs.home} />

        <main>
          <h1 className="mb-3 text-base font-medium text-balance">{site.name}</h1>

          <div className="mb-10 flex flex-col gap-3 text-muted-foreground">
            <p className="text-pretty">I write code, and I keep a record of it.</p>
            <p className="text-pretty">Most of what lands here started as a note to myself. Some of it is still useful.</p>
            <p className="text-pretty">
              Start with <TextLink href="#">about this site</TextLink>, or browse{" "}
              <TextLink href="#projects">the projects I&apos;m working on</TextLink>. The posts below are sample content you can
              replace.
            </p>
            <p className="flex flex-wrap items-baseline gap-x-1.5">
              <span>Elsewhere,</span>
              {socials.map((social, i) => (
                <React.Fragment key={social.label}>
                  {i > 0 && <span aria-hidden>{i === socials.length - 1 ? "and" : ","}</span>}
                  <SocialLink social={social} />
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {years.map((group) => (
              <section key={group.year} aria-labelledby={`year-${group.year}`} className="flex flex-col gap-3">
                <h2 id={`year-${group.year}`} className="font-mono text-base font-normal text-balance text-muted-foreground">
                  {group.year}
                </h2>
                <ul className="flex flex-col">
                  {group.posts.map((post) => (
                    <li key={post.slug} className="flex items-baseline gap-4 leading-6">
                      <Link
                        href={hrefs.post}
                        className="min-w-0 wrap-anywhere rounded-xs transition-colors duration-150 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {post.title}
                      </Link>
                      <time dateTime={post.date} className="ms-auto shrink-0 font-mono text-muted-foreground tabular-nums">
                        {formatPostDate(post.date)}
                      </time>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </main>
      </Container>
    </div>
  )
}

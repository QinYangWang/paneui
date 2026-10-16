"use client"

import * as React from "react"
import Link from "next/link"
import { siGithub } from "simple-icons"

import { MailIcon } from "@/components/icons"
import { BrandIcon } from "@/registry/base-nova/ui/brand-icon"
import { Button } from "@/registry/base-nova/ui/button"
import { Input } from "@/registry/base-nova/ui/input"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"
import { useToast } from "@/registry/base-nova/ui/toast"

import { Avatar } from "./author-avatar"
import { author } from "./data"

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function BlogHeader({ homeHref }: { homeHref: string }) {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-full items-center gap-4">
        <Link href={homeHref} className="flex items-center gap-2.5 rounded-full font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          <Avatar name={author.name} size="sm" />
          {author.name}
        </Link>
        <nav aria-label="Main" className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={homeHref} />} className="max-sm:hidden">
            Writing
          </Button>
          <Button variant="ghost" size="sm" className="max-sm:hidden">
            Projects
          </Button>
          <Button variant="ghost" size="sm" className="max-sm:hidden">
            About
          </Button>
          <Button variant="ghost" size="icon-sm" nativeButton={false} render={<a href="#" />} aria-label="GitHub">
            <BrandIcon icon={siGithub} />
          </Button>
          <ThemeToggle variant="ghost" modes="tri" />
        </nav>
      </Container>
    </header>
  )
}

/** Newsletter signup. The single filled action on whichever page it sits. */
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const toast = useToast()
  const [email, setEmail] = React.useState("")
  return (
    <section
      aria-labelledby="newsletter-title"
      className={
        compact
          ? "flex flex-col gap-4 rounded-2xl bg-card p-6 shadow-raised sm:p-8"
          : "flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-raised sm:flex-row sm:items-end sm:justify-between sm:p-8"
      }
    >
      <div className="flex max-w-md flex-col gap-2">
        <h2 id="newsletter-title" className="text-lg font-semibold text-balance">
          A short letter, once a month
        </h2>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          New essays and the odd experiment, straight to your inbox. 3,100 readers, no tracking pixels.
        </p>
      </div>
      <form
        className="flex w-full flex-col gap-2 sm:max-w-sm sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          if (!email.trim()) return
          toast.add({ title: "You're subscribed", description: `The next letter goes to ${email}.`, type: "success" })
          setEmail("")
        }}
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <MailIcon data-icon="inline-start" />
          Subscribe
        </Button>
      </form>
    </section>
  )
}

export function BlogFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 {author.name} · Written in {author.location}</p>
        <nav aria-label="Elsewhere" className="flex gap-5">
          <a href="#" className="transition-colors hover:text-foreground">
            RSS
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Bluesky
          </a>
        </nav>
      </Container>
    </footer>
  )
}

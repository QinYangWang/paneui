"use client"

import * as React from "react"

import { BotIcon, MenuIcon } from "@/components/icons"
import { Button } from "@/registry/base-nova/ui/button"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle } from "@/registry/base-nova/ui/drawer"
import { IconChip } from "@/registry/base-nova/ui/icon-chip"
import { ThemeToggle } from "@/registry/base-nova/ui/theme-toggle"

import { Container, Cta, Demo, Faq, Features, Footer, Hero, LogoStrip, Pricing, Testimonials } from "./parts/sections"

const links = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

/** Product landing page: nav, hero, logos, features, demo, pricing, testimonials, FAQ, CTA and footer. */
export function Landing() {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur">
        <Container className="flex h-full items-center gap-6">
          <a href="#" className="flex items-center gap-2.5 rounded-full font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
            <IconChip size="sm" tone="solid">
              <BotIcon />
            </IconChip>
            Tessel
          </a>
          <nav aria-label="Main" className="flex items-center gap-1 max-md:hidden">
            {links.map((l) => (
              <Button key={l.href} variant="ghost" size="sm" nativeButton={false} render={<a href={l.href} />} className="text-muted-foreground">
                {l.label}
              </Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="max-sm:hidden">
              Sign in
            </Button>
            <Button variant="secondary" size="sm">
              Start free
            </Button>
            <ThemeToggle className="size-8" />
            <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </Button>
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <Hero />
        <LogoStrip />
        <Demo />
        <Features />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />

      <Drawer side="right" open={open} onOpenChange={setOpen}>
        <DrawerContent className="w-72">
          <DrawerHeader>
            <DrawerTitle>Tessel</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-1">
            {links.map((l) => (
              <Button key={l.href} variant="ghost" className="justify-start" nativeButton={false} render={<a href={l.href} onClick={() => setOpen(false)} />}>
                {l.label}
              </Button>
            ))}
            <Button variant="ghost" className="justify-start">
              Sign in
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

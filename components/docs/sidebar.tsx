"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function Sidebar({
  groups,
}: {
  groups: { category: string; items: { name: string; title: string }[] }[]
}) {
  const pathname = usePathname()
  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className={cn(
        "block rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
        pathname === href && "bg-secondary text-foreground shadow-raised"
      )}
    >
      {label}
    </Link>
  )
  return (
    <nav className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <div className="px-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">Getting started</div>
        {link("/", "Gallery")}
        {link("/docs", "Installation")}
      </div>
      {groups.map((g) => (
        <div key={g.category} className="flex flex-col gap-0.5">
          <div className="px-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground/70 uppercase">{g.category}</div>
          {g.items.map((i) => link(`/docs/${i.name}`, i.title))}
        </div>
      ))}
    </nav>
  )
}

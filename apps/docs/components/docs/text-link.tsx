import Link from "next/link"

/** Underlined text link for reading copy (internal hrefs use next/link). */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

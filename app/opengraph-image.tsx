import { ImageResponse } from "next/og"

import { OgImage, ogImageContentType, ogImageSize } from "@/registry/base-nova/ui/og-image"

// The docs site's own share image, built from the og-image route template.
export const alt = "qinyang/ui: desktop-density React components"
export const size = ogImageSize
export const contentType = ogImageContentType
export const dynamic = "force-static"

const TITLE = "Desktop-density React components"
const DESCRIPTION = "Quiet, precise components, distributed as a shadcn registry."

async function loadFont(weight: number, text: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`)).text()
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error("font")
  return (await fetch(src)).arrayBuffer()
}

export default async function Image() {
  const text = `qinyang/ui qinyangwang.github.io/ui ${TITLE} ${DESCRIPTION}·…`
  const fonts = await Promise.all([
    loadFont(400, text).then((data) => ({ name: "Inter", data, weight: 400 as const, style: "normal" as const })),
    loadFont(700, text).then((data) => ({ name: "Inter", data, weight: 700 as const, style: "normal" as const })),
  ]).catch(() => undefined)
  return new ImageResponse(
    <OgImage title={TITLE} description={DESCRIPTION} siteName="qinyang/ui" url="qinyangwang.github.io/ui" fontFamily={fonts ? "Inter" : undefined} />,
    { ...size, fonts }
  )
}

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OgImage } from "@paneui/ui/components/og-image"

export default function OgImageCjk() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl shadow-raised">
      <svg viewBox={`0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}`} role="img" aria-label="中文分享卡片预览" className="block h-auto w-full">
        <foreignObject width={OG_IMAGE_WIDTH} height={OG_IMAGE_HEIGHT}>
          <OgImage
            title="构建时生成分享卡片：中文标题按字符换行，最多三行"
            description="字体子集、颜色映射与深色模式。"
            siteName="田野笔记"
            author="陈米拉"
            date="2026年10月17日"
            tags={["前端", "工具"]}
            accent="violet"
            mode="dark"
          />
        </foreignObject>
      </svg>
    </div>
  )
}

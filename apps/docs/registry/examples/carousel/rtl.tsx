import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@paneui/ui/components/carousel"

const slides = [
  { title: "خطّط", tone: "bg-chart-1/20" },
  { title: "ابنِ", tone: "bg-chart-4/20" },
  { title: "أطلق", tone: "bg-chart-5/20" },
  { title: "قِس", tone: "bg-chart-3/20" },
]

export default function CarouselRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-xs">
        <Carousel aria-label="مراحل الإصدار">
          <div className="flex flex-col gap-3">
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={s.title} aria-label={`${i + 1} من ${slides.length}`}>
                  <div className={`flex aspect-video items-center justify-center rounded-xl text-xl font-semibold ${s.tone}`}>{s.title}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between">
              <CarouselPrevious aria-label="الشريحة السابقة" />
              <CarouselDots />
              <CarouselNext aria-label="الشريحة التالية" />
            </div>
          </div>
        </Carousel>
      </div>
    </DirectionProvider>
  )
}

import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/base-nova/ui/carousel"

const slides = [
  { title: "Plan", tone: "bg-chart-1/20" },
  { title: "Build", tone: "bg-chart-4/20" },
  { title: "Ship", tone: "bg-chart-5/20" },
  { title: "Measure", tone: "bg-chart-3/20" },
]

export default function CarouselDemo() {
  return (
    <Carousel aria-label="Release stages" className="w-full max-w-xs">
      <div className="flex flex-col gap-3">
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={s.title} aria-label={`${i + 1} of ${slides.length}`}>
            <div className={`flex aspect-video items-center justify-center rounded-xl text-xl font-semibold ${s.tone}`}>{s.title}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </div>
      </div>
    </Carousel>
  )
}

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/base-nova/ui/carousel"

export default function CarouselSeveralPerView() {
  return (
    <Carousel aria-label="Templates" className="w-full max-w-md">
      <div className="flex items-center gap-2">
      <CarouselPrevious />
      <CarouselContent>
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} aria-label={`${i + 1} of 8`} className="basis-1/3">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-card text-lg font-semibold tabular-nums shadow-raised">{i + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      </div>
    </Carousel>
  )
}

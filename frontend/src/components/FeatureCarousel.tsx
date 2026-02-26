import { useCarousel } from '../hooks/useCarousel';
import { ChevronLeft, ChevronRight, Zap, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: '/assets/generated/carousel-slide-1.dim_800x400.png',
    title: 'Viral Hook Generator',
    description:
      'Stop the scroll instantly. Our AI crafts attention-grabbing hooks tailored to your niche, platform, and audience — so your content gets seen.',
    icon: <Zap className="w-6 h-6" />,
    accent: 'from-electric-orange to-hot-pink',
    iconBg: 'bg-primary/20 text-primary',
  },
  {
    image: '/assets/generated/carousel-slide-2.dim_800x400.png',
    title: 'Platform-Optimized Scripts',
    description:
      'Every platform has its own rhythm. Get full video scripts optimized for TikTok, YouTube, Instagram Reels, and more — ready to record.',
    icon: <TrendingUp className="w-6 h-6" />,
    accent: 'from-hot-pink to-bright-cyan',
    iconBg: 'bg-[oklch(0.58_0.28_340/0.2)] text-[oklch(0.58_0.28_340)]',
  },
  {
    image: '/assets/generated/carousel-slide-3.dim_800x400.png',
    title: 'Monetization Intelligence',
    description:
      'Discover hidden revenue streams in your content. From affiliate angles to brand deal positioning — turn your audience into income.',
    icon: <Target className="w-6 h-6" />,
    accent: 'from-bright-cyan to-lime-green',
    iconBg: 'bg-[oklch(0.55_0.22_250/0.2)] text-[oklch(0.55_0.22_250)]',
  },
];

export default function FeatureCarousel() {
  const { current, next, prev, goTo, pause, resume } = useCarousel({
    total: slides.length,
    autoAdvanceMs: 4500,
  });

  return (
    <section id="carousel" className="py-16 overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            See It in{' '}
            <span className="gradient-text-cyan">Action</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features that turn ideas into viral content.
          </p>
        </div>

        <div
          className="relative rounded-3xl overflow-hidden shadow-vibrant border border-border/50"
          onMouseEnter={pause}
          onMouseLeave={resume}
          role="region"
          aria-label="Feature carousel"
        >
          {/* Slides */}
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
            aria-live="polite"
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="min-w-full relative"
                aria-hidden={i !== current}
              >
                {/* Image */}
                <div className="relative h-56 md:h-72 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} opacity-60`} />
                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg">
                      {slide.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-card p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${slide.iconBg} flex items-center justify-center shrink-0`}>
                      {slide.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold mb-2">{slide.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 top-[calc(50%-2rem)] -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-110"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-[calc(50%-2rem)] -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-110"
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5" role="tablist" aria-label="Carousel slides">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2.5 bg-primary shadow-glow'
                  : 'w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

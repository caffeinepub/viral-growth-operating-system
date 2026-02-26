import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    quote:
      "ViralGrowth OS completely transformed my content strategy. I went from 5K to 80K followers in just 45 days using the viral hook generator and content calendar. The AI knows exactly what my audience wants.",
    name: 'Mia Chen',
    role: 'Fitness Creator',
    platform: 'TikTok · 80K followers',
    avatar: 'MC',
    accentColor: 'bg-primary/15 text-primary',
    borderColor: 'hover:border-primary/40',
    starColor: 'text-[oklch(0.80_0.22_90)] fill-[oklch(0.80_0.22_90)]',
  },
  {
    quote:
      "The monetization angles feature alone paid for my Elite subscription 10x over. I discovered three affiliate opportunities I never would have found on my own. This tool is a game-changer for finance creators.",
    name: 'Jordan Rivera',
    role: 'Finance & Investing Creator',
    platform: 'YouTube · 220K subscribers',
    avatar: 'JR',
    accentColor: 'bg-[oklch(0.58_0.28_340/0.15)] text-[oklch(0.58_0.28_340)]',
    borderColor: 'hover:border-[oklch(0.58_0.28_340/0.5)]',
    starColor: 'text-[oklch(0.80_0.22_90)] fill-[oklch(0.80_0.22_90)]',
  },
  {
    quote:
      "I was skeptical at first, but the platform-optimized scripts are genuinely impressive. My Instagram Reels engagement doubled in the first week. The content score analysis helps me understand exactly what's working.",
    name: 'Priya Sharma',
    role: 'Travel & Lifestyle Creator',
    platform: 'Instagram · 150K followers',
    avatar: 'PS',
    accentColor: 'bg-[oklch(0.72_0.22_140/0.15)] text-[oklch(0.72_0.22_140)]',
    borderColor: 'hover:border-[oklch(0.72_0.22_140/0.5)]',
    starColor: 'text-[oklch(0.80_0.22_90)] fill-[oklch(0.80_0.22_90)]',
  },
];

export default function TestimonialsSection() {
  const containerRef = useScrollAnimationGroup<HTMLDivElement>();

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 scroll-animate" ref={useScrollAnimationGroup<HTMLDivElement>().current as any}>
          <Badge variant="outline" className="mb-4 text-[oklch(0.58_0.28_340)] border-[oklch(0.58_0.28_340/0.3)] bg-[oklch(0.58_0.28_340/0.05)]">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            Creator Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Loved by{' '}
            <span className="gradient-text-orange">500K+ Creators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real results from real creators who use ViralGrowth OS every day.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className={`scroll-animate stagger-${i + 1} border-border ${t.borderColor} transition-all duration-300 hover:shadow-vibrant hover:-translate-y-1 group`}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className={`w-4 h-4 ${t.starColor}`} />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="w-8 h-8 text-muted-foreground/20 mb-3 group-hover:text-muted-foreground/40 transition-colors" />

                {/* Quote text */}
                <blockquote className="text-sm leading-relaxed text-foreground/80 flex-1 mb-6 italic">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className={`w-10 h-10 rounded-full ${t.accentColor} flex items-center justify-center font-bold text-sm shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{t.platform}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

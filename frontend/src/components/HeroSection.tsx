import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Sparkles, Zap } from 'lucide-react';

interface HeroSectionProps {
  onScrollToSection?: (id: string) => void;
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { ref: ctaRef, createRipple } = useRippleEffect<HTMLButtonElement>();

  const handleScrollToFeatures = () => {
    if (onScrollToSection) {
      onScrollToSection('features');
    } else {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[oklch(0.80_0.22_90/0.25)] blur-3xl animate-float" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[oklch(0.55_0.22_250/0.25)] blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Hero banner image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src="/assets/generated/hero-banner.dim_1200x480.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Badge className="mb-6 text-sm px-4 py-1.5 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 cursor-default">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            AI-Powered Content Creation
          </Badge>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
            Viral Growth OS
            <span className="block text-[oklch(0.95_0.15_90)] drop-shadow-md mt-2">
              Content That Converts
            </span>
          </h1>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate viral hooks, scripts, captions, and monetization strategies for any platform.
            Built for creators who want to grow fast and earn more.
          </p>
        </div>

        <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
          {isAuthenticated ? (
            <Link to="/generate">
              <Button
                ref={ctaRef}
                onMouseDown={createRipple}
                size="lg"
                className="text-base px-8 py-6 gap-2 bg-white text-primary hover:bg-white/90 font-bold shadow-vibrant hover:shadow-glow-lg transition-all btn-ripple animate-pulse-ring"
              >
                <Zap className="w-5 h-5" />
                Create Content Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/pricing">
              <Button
                ref={ctaRef}
                onMouseDown={createRipple}
                size="lg"
                className="text-base px-8 py-6 gap-2 bg-white text-primary hover:bg-white/90 font-bold shadow-vibrant hover:shadow-glow-lg transition-all btn-ripple"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            size="lg"
            className="text-base px-8 py-6 border-white/50 text-white hover:bg-white/15 hover:border-white backdrop-blur-sm transition-all"
            onClick={handleScrollToFeatures}
          >
            Explore Features
          </Button>
        </div>

        <div className="animate-slide-up mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/80" style={{ animationDelay: '0.5s' }}>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[oklch(0.95_0.15_90)]" /> Free tier available</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[oklch(0.95_0.15_90)]" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[oklch(0.95_0.15_90)]" /> Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}

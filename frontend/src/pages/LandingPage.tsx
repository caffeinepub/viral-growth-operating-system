import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useScrollAnimationGroup } from '../hooks/useScrollAnimation';
import { useRippleEffect } from '../hooks/useRippleEffect';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  TrendingUp,
  Target,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Star,
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import FeatureCarousel from '../components/FeatureCarousel';
import TestimonialsSection from '../components/TestimonialsSection';

export default function LandingPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  // Ripple effects for CTA buttons
  const { ref: ctaRef, createRipple } = useRippleEffect<HTMLButtonElement>();

  // Scroll animation groups
  const statsRef = useScrollAnimationGroup<HTMLDivElement>();
  const featuresRef = useScrollAnimationGroup<HTMLDivElement>();
  const stepsRef = useScrollAnimationGroup<HTMLDivElement>();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Viral Hook Generator',
      description: 'Create attention-grabbing hooks that stop the scroll and drive engagement.',
      iconBg: 'bg-primary/15 text-primary',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Content Score Analysis',
      description: 'Get AI-powered scores for hook strength, retention, and monetization potential.',
      iconBg: 'bg-[oklch(0.58_0.28_340/0.15)] text-[oklch(0.58_0.28_340)]',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Platform-Optimized Scripts',
      description: 'Generate scripts tailored for TikTok, YouTube, Instagram, and more.',
      iconBg: 'bg-[oklch(0.55_0.22_250/0.15)] text-[oklch(0.55_0.22_250)]',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Content Calendar',
      description: 'Plan your content strategy with an AI-generated posting schedule.',
      iconBg: 'bg-[oklch(0.72_0.22_140/0.15)] text-[oklch(0.72_0.22_140)]',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Monetization Angles',
      description: 'Discover revenue opportunities hidden in your content niche.',
      iconBg: 'bg-[oklch(0.80_0.22_90/0.15)] text-[oklch(0.65_0.18_70)]',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Audience Targeting',
      description: 'Craft content that resonates deeply with your specific audience.',
      iconBg: 'bg-primary/15 text-primary',
    },
  ];

  const steps = [
    { step: '01', title: 'Define Your Niche', desc: 'Tell us your content niche, platform, and target audience.', color: 'bg-primary' },
    { step: '02', title: 'Set Your Goal', desc: 'Choose what you want to achieve — growth, sales, or engagement.', color: 'bg-[oklch(0.58_0.28_340)]' },
    { step: '03', title: 'Generate Content', desc: 'Get hooks, scripts, captions, hashtags, and more in seconds.', color: 'bg-[oklch(0.55_0.22_250)]' },
    { step: '04', title: 'Publish & Grow', desc: 'Use your optimized content to grow your audience and revenue.', color: 'bg-[oklch(0.72_0.22_140)]' },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Stats bar */}
      <section className="py-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10x', label: 'Content Output' },
              { value: '2x', label: 'Engagement Rate' },
              { value: '500K+', label: 'Creators Served' },
              { value: '30 days', label: 'Avg. Growth Time' },
            ].map((stat, i) => (
              <div key={i} className={`scroll-animate stagger-${i + 1}`}>
                <p className="text-2xl md:text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-background/70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Countdown Timer — prominent placement near hero */}
      <CountdownTimer />

      {/* 4. Feature Carousel */}
      <FeatureCarousel />

      {/* 5. Features Grid */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate" ref={useRef<HTMLDivElement>(null)}>
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text-orange">Go Viral</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete toolkit for content creators at every stage of growth.
            </p>
          </div>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card
                key={i}
                className={`scroll-animate stagger-${i + 1} border-border hover:border-primary/40 transition-all hover:shadow-vibrant hover:-translate-y-1 group overflow-hidden`}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-[oklch(0.55_0.22_250)] border-[oklch(0.55_0.22_250/0.3)] bg-[oklch(0.55_0.22_250/0.05)]">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              From Idea to{' '}
              <span className="gradient-text-cyan">Viral Content</span>{' '}
              in Minutes
            </h2>
            <p className="text-muted-foreground text-lg">Four simple steps to explosive growth.</p>
          </div>
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className={`scroll-animate stagger-${i + 1} text-center group`}>
                <div className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <TestimonialsSection />

      {/* 8. Social Proof quote */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[oklch(0.80_0.22_90)] text-[oklch(0.80_0.22_90)]" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-semibold max-w-2xl mx-auto mb-6 leading-relaxed">
            "ViralGrowth OS helped me 10x my content output and double my engagement rate in just 30 days."
          </blockquote>
          <p className="text-muted-foreground font-medium">— Content Creator, 500K+ followers</p>
        </div>
      </section>

      {/* 9. CTA Section */}
      <section id="cta" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-cta" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[oklch(0.80_0.22_90/0.2)] blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[oklch(0.55_0.22_250/0.2)] blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-md">
            Ready to Go Viral? 🚀
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of creators using AI to grow their audience and monetize their content.
          </p>
          <Link to="/pricing">
            <Button
              ref={ctaRef}
              onMouseDown={createRipple}
              size="lg"
              className="text-base px-10 py-6 gap-2 bg-white text-primary hover:bg-white/90 font-bold shadow-vibrant hover:shadow-glow-lg transition-all btn-ripple"
            >
              Start for Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

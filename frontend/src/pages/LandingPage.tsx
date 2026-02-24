import { Link } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
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
  CheckCircle,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Viral Hook Generator',
      description: 'Create attention-grabbing hooks that stop the scroll and drive engagement.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Content Score Analysis',
      description: 'Get AI-powered scores for hook strength, retention, and monetization potential.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Platform-Optimized Scripts',
      description: 'Generate scripts tailored for TikTok, YouTube, Instagram, and more.',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Content Calendar',
      description: 'Plan your content strategy with an AI-generated posting schedule.',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Monetization Angles',
      description: 'Discover revenue opportunities hidden in your content niche.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Audience Targeting',
      description: 'Craft content that resonates deeply with your specific audience.',
    },
  ];

  const steps = [
    { step: '01', title: 'Define Your Niche', desc: 'Tell us your content niche, platform, and target audience.' },
    { step: '02', title: 'Set Your Goal', desc: 'Choose what you want to achieve — growth, sales, or engagement.' },
    { step: '03', title: 'Generate Content', desc: 'Get hooks, scripts, captions, hashtags, and more in seconds.' },
    { step: '04', title: 'Publish & Grow', desc: 'Use your optimized content to grow your audience and revenue.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
            🚀 AI-Powered Content Creation
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Your Viral Growth
            <span className="text-primary block">Operating System</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate viral hooks, scripts, captions, and monetization strategies for any platform.
            Built for creators who want to grow fast and earn more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/generate">
                <Button size="lg" className="text-base px-8 py-6 gap-2">
                  Create Content Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/pricing">
                <Button size="lg" className="text-base px-8 py-6 gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-base px-8 py-6">
                View Pricing
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Free tier available</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Go Viral</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete toolkit for content creators at every stage of growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border-border hover:border-primary/40 transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">From idea to viral content in minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-6">
            "ViralGrowth OS helped me 10x my content output and double my engagement rate in just 30 days."
          </blockquote>
          <p className="text-muted-foreground">— Content Creator, 500K+ followers</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Go Viral?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of creators using AI to grow their audience and monetize their content.
          </p>
          <Link to="/pricing">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 py-6 gap-2"
            >
              Start for Free <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

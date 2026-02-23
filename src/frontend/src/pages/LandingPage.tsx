import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Shield, Zap, Target, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    } else {
      navigate({ to: '/pricing' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="px-4 py-1.5 text-sm">
            <Sparkles className="w-3 h-3 mr-1.5" />
            AI-Powered Content Strategy
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your AI Viral Growth
            <span className="block bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate 100% original, monetization-ready, algorithm-optimized content strategies 
            for short-form platforms. Built with strict copyright compliance and platform safety.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-chart-1 to-chart-2 text-lg px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/pricing' })}
              className="text-lg px-8"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Go Viral
            </h2>
            <p className="text-lg text-muted-foreground">
              Intelligent modules designed for content creators who want results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-chart-1 mb-2" />
                <CardTitle>Trend Analyzer</CardTitle>
                <CardDescription>
                  Analyze current short-form trend patterns and adapt them to your niche
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-chart-2 mb-2" />
                <CardTitle>Brand Voice Memory</CardTitle>
                <CardDescription>
                  Maintain consistent personality across all your content outputs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-chart-4 mb-2" />
                <CardTitle>Performance Scoring</CardTitle>
                <CardDescription>
                  Get hook strength, retention, and monetization scores for every piece
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-chart-5 mb-2" />
                <CardTitle>Revenue Engine</CardTitle>
                <CardDescription>
                  Discover affiliate angles, product ideas, and monetization strategies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-chart-3 mb-2" />
                <CardTitle>Copyright Safe</CardTitle>
                <CardDescription>
                  100% original content that never copies creators or trademarked phrases
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="w-10 h-10 text-chart-1 mb-2" />
                <CardTitle>Full Content Suite</CardTitle>
                <CardDescription>
                  Hooks, scripts, captions, hashtags, and calendars all in one place
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Powerful Workflow
            </h2>
            <p className="text-lg text-muted-foreground">
              From idea to viral content in minutes
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Define Your Strategy</h3>
                <p className="text-muted-foreground">
                  Tell us your tone, audience, platform, niche, and goal. Our AI adapts to your unique voice.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-chart-2 to-chart-4 flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Generate Original Content</h3>
                <p className="text-muted-foreground">
                  Get scroll-stopping hooks, engaging scripts, captions, and hashtags—all 100% original and copyright-safe.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-chart-4 to-chart-5 flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Optimize & Monetize</h3>
                <p className="text-muted-foreground">
                  Review performance scores, get monetization angles, and follow your personalized content calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 bg-gradient-to-br from-chart-1/10 to-chart-2/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Create Viral Content?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join content creators who are scaling their reach with AI-powered strategies
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-chart-1 to-chart-2 text-lg px-8"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Creating Now
          </Button>
        </div>
      </section>
    </div>
  );
}

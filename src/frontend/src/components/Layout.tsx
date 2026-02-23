import { Outlet, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ProfileSetupModal from './ProfileSetupModal';
import { useQueryClient } from '@tanstack/react-query';

export default function Layout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!identity;

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'viral-growth-os');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProfileSetupModal />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate({ to: '/' })}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-chart-1 to-chart-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
              ViralOS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate({ to: '/generate' })}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Generate
                </button>
                <button
                  onClick={() => navigate({ to: '/subscription' })}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Subscription
                </button>
                {isAdmin && (
                  <button
                    onClick={() => navigate({ to: '/stripe-setup' })}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Stripe Setup
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => navigate({ to: '/pricing' })}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LoginButton />
            </div>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container py-4 flex flex-col gap-3">
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      navigate({ to: '/dashboard' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate({ to: '/generate' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Generate
                  </button>
                  <button
                    onClick={() => {
                      navigate({ to: '/subscription' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Subscription
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate({ to: '/stripe-setup' });
                        setMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      Stripe Setup
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  navigate({ to: '/pricing' });
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                Pricing
              </button>
              <div className="pt-2">
                <LoginButton />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} ViralOS. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-chart-1">♥</span>
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-chart-1 transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      variant={isAuthenticated ? 'outline' : 'default'}
      className={isAuthenticated ? '' : 'bg-gradient-to-r from-chart-1 to-chart-2 hover:opacity-90'}
    >
      {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    ...(isAuthenticated
      ? [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/generate', label: 'Create Content' },
          { to: '/subscription', label: 'Subscription' },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Zap className="w-6 h-6 fill-primary" />
              <span>ViralGrowth OS</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: 'text-foreground font-semibold' }}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/stripe-setup"
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: 'text-foreground font-semibold' }}
                >
                  <Settings className="w-3.5 h-3.5" />
                  Stripe Setup
                </Link>
              )}
            </nav>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/stripe-setup"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-3.5 h-3.5" />
                Stripe Setup
              </Link>
            )}
            <div className="pt-2">
              <Button
                onClick={() => {
                  handleAuth();
                  setMobileMenuOpen(false);
                }}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
                className="w-full"
              >
                {isLoggingIn ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Zap className="w-4 h-4 fill-primary text-primary" />
              <span>ViralGrowth OS</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Built with{' '}
              <span className="text-primary">♥</span>{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'viralgrowth-os'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
              {' '}© {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

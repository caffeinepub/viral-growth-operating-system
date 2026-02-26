import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'carousel', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'cta', label: 'Get Started' },
];

export default function LandingPageNav() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Page sections">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={`landing-nav-link px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
            activeId === section.id
              ? 'active text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

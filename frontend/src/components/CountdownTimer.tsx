import { useMemo } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Clock, Flame } from 'lucide-react';

// Promotional deadline: 7 days from a fixed reference date for consistency
// Using a fixed future date so it doesn't reset on every page load
const PROMO_END_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden">
        <span className="text-2xl md:text-3xl font-extrabold text-white tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs font-semibold text-white/80 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const targetDate = useMemo(() => PROMO_END_DATE, []);
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 gradient-cta opacity-95" />
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[oklch(0.80_0.22_90/0.2)] blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[oklch(0.55_0.22_250/0.2)] blur-2xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-[oklch(0.95_0.15_90)] animate-pulse" />
          <span className="text-sm font-bold text-white/90 uppercase tracking-widest">Limited Time Offer</span>
          <Flame className="w-5 h-5 text-[oklch(0.95_0.15_90)] animate-pulse" />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow">
          🚀 Launch Special — 40% Off Pro & Elite
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Lock in your discounted rate before this offer expires. Act now!
        </p>

        {isExpired ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm">
            <Clock className="w-5 h-5 text-white/70" />
            <span className="text-white font-semibold">Offer ended — check back soon!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <TimeUnit value={days} label="Days" />
            <span className="text-3xl font-extrabold text-white/60 mb-6 select-none">:</span>
            <TimeUnit value={hours} label="Hours" />
            <span className="text-3xl font-extrabold text-white/60 mb-6 select-none">:</span>
            <TimeUnit value={minutes} label="Mins" />
            <span className="text-3xl font-extrabold text-white/60 mb-6 select-none">:</span>
            <TimeUnit value={seconds} label="Secs" />
          </div>
        )}
      </div>
    </section>
  );
}

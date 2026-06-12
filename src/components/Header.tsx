import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useClock } from '@/hooks/useClock';
import { navigation, profile } from '@/data/content';

export function Header() {
  const time = useClock();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'border-b border-ink-700 bg-ink-900/85 backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center border border-ink-400 bg-ink-800 mono text-xs font-bold tracking-wider text-ink-50 group-hover:border-ink-100">
            m5
          </span>
          <span className="mono text-sm">
            <span className="text-ink-200">~/</span>
            <span className="text-ink-50">{profile.handle}</span>
          </span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`mono inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
                    active === item.id ? 'text-ink-50' : 'text-ink-100 hover:text-ink-50'
                  }`}
                >
                  <span className={active === item.id ? 'text-ink-50' : 'text-ink-300'}>
                    {active === item.id ? '▸' : ' '}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="mono inline-flex items-center gap-1.5 text-2xs text-ink-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            online
          </span>
          <span className="mono text-2xs tabular-nums text-ink-200" aria-label="Local time">
            {time}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-ink-600 text-ink-50"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-ink-700 bg-ink-900 md:hidden">
          <ul className="mx-auto flex max-w-page flex-col px-5 py-2 sm:px-8">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="mono block py-2 text-sm text-ink-50 hover:text-white"
                >
                  <span className="text-ink-300">▸ </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-1 flex items-center justify-between border-t border-ink-700 py-2">
              <span className="mono inline-flex items-center gap-1.5 text-2xs text-ink-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                online
              </span>
              <span className="mono text-2xs tabular-nums text-ink-200">{time}</span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

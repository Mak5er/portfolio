import { ArrowUp } from 'lucide-react';
import { contact, profile } from '@/data/content';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-600 bg-ink-950">
      <div className="mx-auto flex max-w-page flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="mono text-2xs text-ink-100">
          <span className="text-ink-300">©</span> {year} {profile.handle}
        </div>
        <div className="flex items-center gap-4 mono text-2xs">
          <a className="link-mono" href={contact.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a className="link-mono" href={contact.telegram} target="_blank" rel="noreferrer">
            telegram
          </a>
          <a className="link-mono" href={`mailto:${contact.email}`}>
            email
          </a>
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1 border border-ink-500 px-2 py-1 text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
            aria-label="Back to top"
          >
            <ArrowUp size={11} />
            top
          </a>
        </div>
      </div>
    </footer>
  );
}

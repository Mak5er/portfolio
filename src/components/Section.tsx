import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type SectionProps = {
  id: string;
  number: string;
  title: string;
  command?: string;
  children: ReactNode;
};

export function Section({ id, number, title, command, children }: SectionProps) {
  const { ref, visible } = useReveal<HTMLElement>(0.08);
  const headingId = `${id}-heading`;

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={`relative scroll-mt-24 py-20 sm:py-28 reveal ${visible ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-2 sm:mb-14">
          <div className="flex items-baseline gap-3">
            <span aria-hidden className="mono text-2xs text-ink-200">// {number}</span>
            <span aria-hidden className="h-px flex-1 bg-ink-500/70" />
            {command && (
              <span aria-hidden className="mono text-2xs text-ink-100">
                <span className="text-ink-300">$</span> {command}
              </span>
            )}
          </div>
          <h2 id={headingId} className="mono text-2xl font-semibold tracking-tight text-ink-50 sm:text-3xl">
            <span aria-hidden className="text-ink-300">#</span> {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

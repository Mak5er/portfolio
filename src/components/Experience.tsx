import { Section } from './Section';
import { experience } from '@/data/content';

export function Experience() {
  return (
    <Section id="experience" number="04" title="experience" command="git log --reverse --since=2023">
      <ol className="relative space-y-6 border-l border-dashed border-ink-500 pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden
              className="absolute -left-[27px] top-1 grid h-3.5 w-3.5 place-items-center border border-ink-200 bg-ink-900 sm:-left-[35px]"
            >
              <span className="h-1.5 w-1.5 bg-ink-50" />
            </span>
            <div className="frame px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="mono text-2xs uppercase tracking-wider text-ink-100">
                  {item.year}
                </span>
                <span className="mono text-2xs text-ink-300">commit::{i + 1}</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold text-ink-50">{item.title}</h3>
              <p className="mono text-2xs uppercase tracking-wider text-ink-200">
                @ {item.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-100">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

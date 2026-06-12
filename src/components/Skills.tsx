import { useState } from 'react';
import { Section } from './Section';
import { skills, type Skill } from '@/data/content';

const CATEGORIES: { key: Skill['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'language', label: 'languages' },
  { key: 'frontend', label: 'frontend' },
  { key: 'backend', label: 'backend' },
  { key: 'database', label: 'databases' },
  { key: 'tools', label: 'tools' },
];

export function Skills() {
  const [filter, setFilter] = useState<Skill['category'] | 'all'>('all');
  const visible = filter === 'all' ? skills : skills.filter((s) => s.category === filter);

  return (
    <Section id="skills" number="02" title="skills" command="ls -la ~/stack">
      <div className="mb-8 flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => {
          const active = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              className={`mono inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-2xs transition-colors ${
                active
                  ? 'border-ink-50 bg-ink-50 text-ink-900'
                  : 'border-ink-500 text-ink-100 hover:border-ink-100 hover:text-ink-50'
              }`}
            >
              <span className={active ? 'text-ink-900/60' : 'text-ink-300'}>
                {active ? '▣' : '▢'}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      <ul className="flex flex-wrap gap-3">
        {visible.map((skill, i) => (
          <li
            key={skill.name}
            className="flex animate-fade-in items-center gap-2.5 border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-ink-50 transition-all hover:-translate-y-0.5 hover:border-ink-200 hover:bg-ink-800"
            style={{ animationFillMode: 'both', animationDelay: `${i * 50}ms` }}
          >
            <span className="font-semibold tracking-wide">{skill.name}</span>
            <span className="h-1 w-1 rounded-full bg-ink-500" />
            <span className="mono text-2xs uppercase tracking-wider text-ink-300">
              {skill.category}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

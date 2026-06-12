import { Section } from './Section';
import { profile } from '@/data/content';

const FACTS: { key: string; value: string }[] = [
  { key: 'role', value: 'full-stack developer' },
  { key: 'focus', value: 'web · automation · bots' },
  { key: 'editor', value: 'vscode + vim bindings' },
  { key: 'os', value: 'windows + wsl · linux' },
  { key: 'shell', value: 'bash · powershell' },
  { key: 'currently', value: 'shipping side-projects' },
];

export function About() {
  return (
    <Section id="about" number="01" title="about" command="cat about.md">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <article className="space-y-5 text-base leading-relaxed text-ink-50">
          <p className="text-pretty">
            Hey, I&apos;m <span className="text-ink-50 font-medium">{profile.name}</span> — known
            online as <span className="mono text-ink-50">{profile.handle}</span> /{' '}
            <span className="mono text-ink-50">{profile.altHandle}</span>. Into computers and
            technology since childhood. Passionate about programming, hardware, and exploring how
            things work under the hood.
          </p>
          <p className="text-pretty text-ink-100">
            I build things end-to-end: from Python backends and Telegram bots to React frontends
            and small dev tools. I care about clean architecture, fast iteration, and shipping
            things people actually use.
          </p>
          <p className="text-pretty text-ink-100">
            When I&apos;m not coding I&apos;m usually messing with my homelab, fixing old iPhones,
            or breaking something just to learn how it works.
          </p>

          <div className="pt-3 mono text-sm text-ink-100">
            <span className="text-ink-300">$</span> echo &quot;always learning, always
            shipping&quot;<span className="caret" />
          </div>
        </article>

        <aside className="frame p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="label">~/profile.cfg</span>
            <span className="mono text-2xs text-ink-300">{FACTS.length} entries</span>
          </div>
          <dl className="mono divide-y divide-ink-600/70 text-sm">
            {FACTS.map((f) => (
              <div key={f.key} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                <dt className="text-ink-200">{f.key}</dt>
                <dd className="text-ink-50">
                  <span className="text-ink-300">=&gt; </span>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}

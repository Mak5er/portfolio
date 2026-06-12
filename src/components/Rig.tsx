import { Section } from './Section';
import { rig } from '@/data/content';

export function Rig() {
  return (
    <Section id="rig" number="06" title="rig" command="cat ~/setup.txt">
      <p className="mb-8 max-w-2xl text-sm text-ink-100 leading-relaxed">
        The hardware I run, host on, and tinker with. A bit of overkill for a coding setup — but
        also a homelab and a small museum of iPhones.
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        {rig.map((group) => (
          <div key={group.title} className="frame frame-hover overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink-600 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="mono text-2xs text-ink-300">~/</span>
                <h3 className="mono text-sm font-semibold text-ink-50">{group.title}</h3>
              </div>
              <span className="mono text-2xs text-ink-200">
                {group.items.length} {group.items.length === 1 ? 'unit' : 'units'}
              </span>
            </div>

            <dl className="divide-y divide-ink-600/70">
              {group.items.map((item) => (
                <div key={`${group.title}-${item.label}-${item.value}`} className="px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="mono text-2xs uppercase tracking-wider text-ink-200 shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-right text-sm text-ink-50">{item.value}</dd>
                  </div>
                  {item.note && (
                    <p className="mt-0.5 mono text-2xs text-ink-300 text-right">
                      <span className="text-ink-400">// </span>
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}

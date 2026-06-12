import { useState } from 'react';
import { Check, Copy, Github, Instagram, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import { Section } from './Section';
import { contact } from '@/data/content';

const SOCIAL = [
  { key: 'github', label: 'github', value: 'mak5er', href: contact.github, Icon: Github },
  { key: 'telegram', label: 'telegram', value: '@mak5er', href: contact.telegram, Icon: Send },
  { key: 'twitter', label: 'twitter', value: '@mak5er', href: contact.twitter, Icon: Twitter },
  { key: 'instagram', label: 'instagram', value: '@mak5er', href: contact.instagram, Icon: Instagram },
  { key: 'linkedin', label: 'linkedin', value: 'mak5er', href: contact.linkedin, Icon: Linkedin },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <Section id="contact" number="07" title="contact" command="ssh mak5er@hello">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="frame flex h-full flex-col justify-center p-6 sm:p-8">
          <div>
            <span className="label">// open a line</span>
            <h3 className="mt-2 text-2xl font-semibold text-ink-50 sm:text-3xl text-balance">
              Have a project, an idea, or just want to talk shop? My inbox is open.
            </h3>
            <p className="mt-3 text-sm text-ink-100 leading-relaxed">
              Best reached over Telegram or email. I usually reply within a day. Spam goes
              straight to <span className="mono text-ink-50">/dev/null</span>.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="mono inline-flex items-center gap-2 border border-ink-50 bg-ink-50 px-4 py-2.5 text-xs font-semibold tracking-wider text-ink-900 transition-colors hover:bg-white"
              >
                <Mail size={14} />
                say hello
              </a>
              <button
                type="button"
                onClick={onCopy}
                className="mono inline-flex items-center gap-2 border border-ink-400 px-4 py-2.5 text-xs font-semibold tracking-wider text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
                aria-live="polite"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'copied' : 'copy email'}
              </button>
            </div>
          </div>
        </div>

        <ul className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2">
          <li className="sm:col-span-2">
            <a
              href={`mailto:${contact.email}`}
              className="group flex h-full items-center justify-between gap-3 border border-ink-600 bg-ink-850 px-4 py-3 transition-colors hover:border-ink-200 hover:bg-ink-800"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink-500 text-ink-100 group-hover:border-ink-200 group-hover:text-ink-50">
                  <Mail size={14} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="mono text-2xs uppercase tracking-wider text-ink-200 block">
                    email
                  </span>
                  <span className="mono block truncate text-sm text-ink-50">
                    {contact.email}
                  </span>
                </span>
              </span>
              <span className="mono shrink-0 text-ink-300 group-hover:text-ink-100">↗</span>
            </a>
          </li>

          {SOCIAL.map(({ key, label, value, href, Icon }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-center justify-between gap-3 border border-ink-600 bg-ink-850 px-4 py-3 transition-colors hover:border-ink-200 hover:bg-ink-800"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-ink-500 text-ink-100 group-hover:border-ink-200 group-hover:text-ink-50">
                    <Icon size={13} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="mono text-2xs uppercase tracking-wider text-ink-200 block">
                      {label}
                    </span>
                    <span className="mono block truncate text-sm text-ink-50">{value}</span>
                  </span>
                </span>
                <span className="mono shrink-0 text-ink-300 group-hover:text-ink-100">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

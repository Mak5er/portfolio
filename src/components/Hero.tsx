import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, Github, Mail, Send } from 'lucide-react';
import { contact, profile } from '@/data/content';

const TYPE_LINES = [
  { prompt: 'whoami', output: `${profile.handle} — ${profile.title.toLowerCase()}` },
  { prompt: 'cat ~/about.txt', output: `${profile.bio}` },
  { prompt: 'ls ~/stack', output: 'react · typescript · python · docker · postgres' },
];

export function Hero() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'prompt' | 'output' | 'pause'>('prompt');

  const target = useMemo(() => {
    const line = TYPE_LINES[step];
    return phase === 'prompt' ? line.prompt : line.output;
  }, [step, phase]);

  useEffect(() => {
    if (phase === 'pause') {
      const t = window.setTimeout(() => {
        setStep((s) => (s + 1) % TYPE_LINES.length);
        setTyped('');
        setPhase('prompt');
      }, 1800);
      return () => window.clearTimeout(t);
    }
    if (typed.length < target.length) {
      const speed = phase === 'prompt' ? 55 : 18;
      const t = window.setTimeout(() => setTyped(target.slice(0, typed.length + 1)), speed);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      if (phase === 'prompt') {
        setTyped('');
        setPhase('output');
      } else {
        setPhase('pause');
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [typed, target, phase]);

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanlines" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-400/40 to-transparent"
      />

      <div className="relative mx-auto max-w-page px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="mono inline-flex items-center gap-2 border border-ink-500 bg-ink-800/60 px-2.5 py-1 text-2xs text-ink-50">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            {profile.status}
          </span>
          <span className="mono text-2xs text-ink-100">
            <span aria-hidden className="text-ink-300">@</span>
            {profile.location.toLowerCase()}
          </span>
          <span aria-hidden className="mono text-2xs text-ink-300">/</span>
          <span className="mono text-2xs text-ink-100">age::{profile.age}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="mono mb-5 text-sm text-ink-100">
              <span aria-hidden className="text-ink-300">$</span> hello, world — i&apos;m
            </p>
            <h1
              id="hero-heading"
              className="mono text-5xl font-bold leading-[1.05] tracking-tight text-ink-50 sm:text-6xl md:text-7xl"
            >
              {profile.handle}
              <span aria-hidden className="text-ink-300">.</span>
            </h1>
            <p className="mt-3 mono text-sm text-ink-100">
              <span aria-hidden className="text-ink-300">aka</span>{' '}
              <span className="sr-only">also known as </span>
              {profile.altHandle}{' '}
              <span aria-hidden className="text-ink-300">·</span>{' '}
              <span className="sr-only">real name </span>
              {profile.name}
            </p>

            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-ink-50 sm:text-lg">
              {profile.tagline}{' '}
              <span className="text-ink-100">
                Hardware nerd, terminal lover, ship-it kind of person.
              </span>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group mono inline-flex h-10 items-center justify-center gap-2 border border-ink-50 bg-ink-50 px-4 text-xs font-semibold tracking-wider text-ink-900 transition-colors hover:bg-white"
              >
                view projects
                <ArrowDownRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Hire me / Email me"
                className="mono inline-flex h-10 w-10 sm:w-auto items-center justify-center gap-2 border border-ink-400 sm:px-4 text-xs font-semibold tracking-wider text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
              >
                <Mail size={14} aria-hidden />
                <span className="hidden sm:inline">hire me</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer me"
                aria-label="GitHub profile of mak5er"
                className="grid h-10 w-10 place-items-center border border-ink-500 text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
              >
                <Github size={15} aria-hidden />
              </a>
              <a
                href={contact.telegram}
                target="_blank"
                rel="noreferrer me"
                aria-label="Telegram contact for mak5er"
                className="grid h-10 w-10 place-items-center border border-ink-500 text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
              >
                <Send size={14} aria-hidden />
              </a>
            </div>
          </div>

          <div aria-hidden>
            <TerminalCard
              line={TYPE_LINES[step]}
              typed={typed}
              phase={phase}
            />
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-900" />
    </section>
  );
}

function TerminalCard({
  line,
  typed,
  phase,
}: {
  line: (typeof TYPE_LINES)[number];
  typed: string;
  phase: 'prompt' | 'output' | 'pause';
}) {
  return (
    <div className="relative">
      <div className="frame frame-hover w-full max-w-xl">
        <div className="flex items-center justify-between border-b border-ink-600 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-ink-400" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-400" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink-400" />
          </div>
          <span className="mono text-2xs text-ink-100">
            mak5er@portfolio: <span className="text-ink-300">~</span>
          </span>
          <span className="mono text-2xs text-ink-300">v1.0</span>
        </div>
        <div className="px-4 py-5 mono text-sm leading-7 min-h-[180px] sm:min-h-[150px]">
          <div>
            <div className="text-ink-100">
              <span className="text-emerald-400">➜</span> <span className="text-ink-200">~</span>{' '}
              <span className="text-ink-50">
                {phase === 'prompt' ? typed : line.prompt}
                {phase === 'prompt' && <Caret />}
              </span>
            </div>
            {phase !== 'prompt' && (
              <div className="text-ink-100">
                {typed}
                {phase === 'output' && <Caret />}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-ink-600 px-3 py-1.5 mono text-2xs text-ink-200">
          <span className="text-ink-300">{'//'}</span> exit code 0 · ttys000 · zsh
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 border border-ink-600"
        style={{ transform: 'translate(8px, 8px)' }}
      />
    </div>
  );
}

function Caret() {
  return <span className="ml-0.5 inline-block h-[1em] w-[0.55em] -mb-0.5 align-baseline bg-ink-50 animate-cursor-blink" />;
}

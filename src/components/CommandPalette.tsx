import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { navigation, contact } from '@/data/content';

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm sm:p-6 animate-fade-in"
    >
      <div className="w-full max-w-lg overflow-hidden border border-ink-600 bg-ink-900 shadow-2xl animate-fade-up">
        <Command.Input
          autoFocus
          placeholder="Type a command or search..."
          className="w-full border-b border-ink-700 bg-transparent px-4 py-3 mono text-sm text-ink-50 placeholder:text-ink-500 focus:outline-none"
        />
        <Command.List className="max-h-[300px] overflow-y-auto p-2 mono text-sm">
          <Command.Empty className="p-4 text-center text-ink-400">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:text-ink-500 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
            {navigation.map((item) => (
              <Command.Item
                key={item.id}
                onSelect={() => runCommand(() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                })}
                className="flex cursor-pointer items-center gap-2 px-2 py-2 text-ink-100 aria-selected:bg-ink-800 aria-selected:text-ink-50"
              >
                <span>Go to {item.label}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Socials" className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:text-ink-500 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
            <Command.Item
              onSelect={() => runCommand(() => window.open(contact.github, '_blank'))}
              className="flex cursor-pointer items-center gap-2 px-2 py-2 text-ink-100 aria-selected:bg-ink-800 aria-selected:text-ink-50"
            >
              <span>GitHub</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => window.open(contact.telegram, '_blank'))}
              className="flex cursor-pointer items-center gap-2 px-2 py-2 text-ink-100 aria-selected:bg-ink-800 aria-selected:text-ink-50"
            >
              <span>Telegram</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => window.open(`mailto:${contact.email}`, '_blank'))}
              className="flex cursor-pointer items-center gap-2 px-2 py-2 text-ink-100 aria-selected:bg-ink-800 aria-selected:text-ink-50"
            >
              <span>Email me</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:text-ink-500 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
             <Command.Item
              onSelect={() => runCommand(() => {
                navigator.clipboard.writeText(window.location.href);
              })}
              className="flex cursor-pointer items-center gap-2 px-2 py-2 text-ink-100 aria-selected:bg-ink-800 aria-selected:text-ink-50"
            >
              <span>Copy Link</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

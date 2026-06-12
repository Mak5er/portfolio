import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Contributions } from '@/components/Contributions';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Rig } from '@/components/Rig';
import { Skills } from '@/components/Skills';
import { CommandPalette } from '@/components/CommandPalette';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900 text-ink-50">
      <CommandPalette />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contributions />
        <Rig />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

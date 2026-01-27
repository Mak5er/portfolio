import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useViewport } from './hooks/useViewport';

function App() {
  const { width, height, isMobile, isTablet } = useViewport();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const nextVh = height ? `${height * 0.01}px` : '1vh';
    document.documentElement.style.setProperty('--vh', nextVh);
  }, [height]);

  const viewport =
    isMobile ? 'mobile' : isTablet ? 'tablet' : width ? 'desktop' : 'unknown';

  return (
    <div
      className="min-h-screen bg-background text-text-primary"
      data-viewport={viewport}
    >
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

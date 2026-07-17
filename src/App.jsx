import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Hero from './sections/Hero';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative text-off-white selection:bg-card-navy selection:text-white">
        {/* Main Content */}
        <main className="relative z-0">
          <Hero />
          <Experience />
          <Education />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-cool-gray text-sm">
              © 2026 Soham Deshmukh — Philadelphia, PA
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

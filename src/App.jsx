import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useScrollSpy } from './hooks/useScrollSpy';
import AnimatedBackground from './components/AnimatedBackground';
import GradientBlob from './components/GradientBlob';
import ThemeToggle from './components/ThemeToggle';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';


function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['about', 'education', 'experience', 'projects', 'skills', 'contact'];
  const activeSection = useScrollSpy(navItems, 100);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>

      <div className="min-h-screen relative dark:text-off-white text-gray-900 selection:bg-electric-blue selection:text-white transition-colors duration-300">
        {/* Enhanced Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-electric-blue via-violet to-magenta z-[60] origin-left"
          style={{
            scaleX,
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)'
          }}
        />
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1px] dark:bg-white/10 bg-gray-300 z-[59]"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* 3D Animated Background */}
        <AnimatedBackground />

        {/* Additional Ambient Gradients */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <GradientBlob color="blue" size={800} top="-10%" left="-10%" delay={0} />
          <GradientBlob color="violet" size={600} top="40%" left="80%" delay={2} />
          <GradientBlob color="teal" size={700} top="80%" left="10%" delay={4} />
        </div>

        {/* Navigation */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-effect-strong shadow-lg py-4' : 'bg-transparent py-6'
            }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <motion.a
                href="#home"
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <img src="/sd-logo.png" alt="SD Logo" className="h-10 w-10" />
              </motion.a>

              <div className="hidden md:flex gap-8 items-center">
                {['About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, index) => {
                  const isActive = activeSection === item.toLowerCase();
                  return (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`text-sm font-medium transition-colors duration-200 relative group ${isActive
                        ? 'text-electric-blue'
                        : 'dark:text-off-white/80 text-gray-700 hover:text-electric-blue'
                        }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      {item}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-electric-blue transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </motion.a>
                  );
                })}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg glass-effect-strong"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-6 h-6 dark:text-off-white text-gray-900"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden mt-4 pb-4 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => {
                  const isActive = activeSection === item.toLowerCase();
                  return (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`block px-4 py-3 rounded-lg transition-colors ${isActive
                        ? 'bg-electric-blue/10 text-electric-blue border border-electric-blue/30'
                        : 'dark:text-off-white/80 text-gray-700 hover:bg-electric-blue/5'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  );
                })}\n                <div className="pt-2 flex justify-center">
                  <ThemeToggle />
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="relative z-0">
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 border-t dark:border-white/5 border-gray-200 relative dark:bg-black/20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="dark:text-cool-gray text-gray-600 text-sm">
              © 2026 Soham Deshmukh. Built with React + Vite + Tailwind CSS + Framer Motion + Three.js.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

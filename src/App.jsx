import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import GradientBlob from './components/GradientBlob';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative text-off-white selection:bg-electric-blue selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-violet to-magenta z-[60] origin-left"
        style={{ scaleX }}
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
              className="text-2xl font-bold font-mono tracking-tighter"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-electric-blue">&lt;</span>
              SD
              <span className="text-electric-blue">/&gt;</span>
            </motion.a>

            <div className="hidden md:flex gap-8">
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-off-white/80 hover:text-electric-blue transition-colors duration-200 relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-0">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 relative bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-cool-gray text-sm">
            © 2026 Soham Deshmukh. Built with React + Vite + Tailwind CSS + Framer Motion + Three.js.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

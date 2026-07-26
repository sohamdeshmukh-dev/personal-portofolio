import React from 'react';
import { motion } from 'framer-motion';
import BrandIcon from '../components/BrandIcon';

const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sohamsdeshmukh/' },
    { label: 'GitHub', href: 'https://github.com/sohamdeshmukh-dev' },
    { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/soham_deshmukh_1' },
];

const Hero = () => {
    return (
        <section id="home" className="relative flex items-center px-6 md:px-[8vw] pt-32 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="flex flex-col items-center text-center">
                    <motion.h1
                        className="font-display font-bold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-off-white mb-8"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                    >
                        <span className="hero-name-typewriter">Soham Deshmukh</span>
                    </motion.h1>

                    <motion.p
                        className="font-display font-semibold text-[13px] tracking-[.18em] text-electric-blue mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        SOFTWARE ENGINEERING INTERN — PHILADELPHIA, PA
                    </motion.p>

                    <motion.p
                        className="font-display font-semibold text-[13px] tracking-[.18em] text-electric-blue mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        SAP | CS @ Drexel
                    </motion.p>

                    {/* CTA + Social Links */}
                    <motion.div
                        className="flex flex-wrap gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    >
                        <motion.a
                            href="#contact"
                            className="font-display font-semibold text-sm tracking-[.05em] px-7 py-4 bg-card-navy text-white rounded-full shadow-lg shadow-card-navy/30"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(31, 74, 134, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            GET IN TOUCH →
                        </motion.a>

                        <div className="flex gap-3 items-center">
                            {socialLinks.map(({ label, href }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-white/10 dark:border dark:border-white/15 shadow-md hover:shadow-lg transition-shadow duration-200"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`Visit ${label} profile`}
                                >
                                    <BrandIcon name={label} className="w-7 h-7" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

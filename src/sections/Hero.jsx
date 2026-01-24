import React from 'react';
import { motion } from 'framer-motion';
import GradientBlob from '../components/GradientBlob';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
            {/* Animated Gradient Blobs */}
            <GradientBlob color="blue" size={500} top="-10%" left="10%" delay={0} />
            <GradientBlob color="violet" size={400} top="20%" left="70%" delay={1} />
            <GradientBlob color="teal" size={450} top="60%" left="5%" delay={2} />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4 px-4 py-1.5 rounded-full border border-electric-blue/30 bg-electric-blue/10 backdrop-blur-sm"
                >
                    <span className="text-electric-blue text-sm font-mono tracking-wider">Available for Opportunities</span>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <span className="text-gradient hover:opacity-90 transition-opacity">Soham Deshmukh</span>
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl dark:text-cool-gray text-gray-600 mb-8 font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    Computer Science Student @ Drexel University
                </motion.p>

                <motion.p
                    className="text-lg md:text-xl dark:text-off-white/80 text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                    Building scalable software solutions and exploring the intersection of AI and quantitative development.
                    <br className="hidden md:block" />
                    Incoming <span className="dark:text-white text-gray-900 font-semibold">SAP STAR Program Intern</span> • Former <span className="dark:text-white text-gray-900 font-semibold">Lockheed Martin Intern</span>
                </motion.p>

                <motion.div
                    className="flex flex-wrap gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                >
                    <motion.a
                        href="#contact"
                        className="px-8 py-4 bg-gradient-to-r from-electric-blue to-violet text-white font-semibold rounded-lg shadow-lg shadow-electric-blue/30 hover:shadow-electric-blue/50 transition-shadow duration-300"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.a>

                    {/* GitHub Icon with official branding */}
                    <motion.a
                        href="https://github.com/sohamdeshmukh-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-4 glass-effect-strong rounded-lg border dark:border-white/10 border-gray-300 flex items-center gap-3 hover:border-gray-900 dark:hover:border-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Visit GitHub Profile"
                    >
                        <svg className="w-6 h-6 dark:fill-white fill-gray-900 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="font-semibold dark:text-off-white text-gray-900">GitHub</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </motion.a>

                    {/* LinkedIn Icon with official branding */}
                    <motion.a
                        href="https://www.linkedin.com/in/sohamsdeshmukh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-4 glass-effect-strong rounded-lg border border-[#0A66C2]/30 flex items-center gap-3 hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Visit LinkedIn Profile"
                    >
                        <svg className="w-6 h-6 fill-[#0A66C2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="font-semibold dark:text-off-white text-gray-900">LinkedIn</span>
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0A66C2] to-[#0077B5] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

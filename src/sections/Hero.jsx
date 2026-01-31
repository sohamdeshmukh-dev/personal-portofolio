import React from 'react';
import { motion } from 'framer-motion';
import GradientBlob from '../components/GradientBlob';
import MapLocationCard from '../components/MapLocationCard';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
            {/* Animated Gradient Blobs */}
            <GradientBlob color="blue" size={500} top="-10%" left="10%" delay={0} />
            <GradientBlob color="violet" size={400} top="20%" left="70%" delay={1} />
            <GradientBlob color="teal" size={450} top="60%" left="5%" delay={2} />

            {/* Two-column layout: Text left, Map right */}
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Hero Content */}
                    <div className="text-center lg:text-left">
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <span className="text-gradient cursor-pointer hover:brightness-150 transition-all duration-300 inline-block hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(0,212,255,0.8)]">Soham Deshmukh</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl dark:text-cool-gray text-gray-600 mb-2 font-light"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                            SAP | Computer Science Student @ Drexel University
                        </motion.p>

                        <motion.p
                            className="text-xl md:text-2xl dark:text-cool-gray/80 text-gray-500 mb-8 font-light"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        >
                            Software Developer | Interested in AI/ML
                        </motion.p>

                        {/* Get In Touch Button */}
                        <motion.div
                            className="flex justify-center lg:justify-start mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                        >
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 bg-gradient-to-r from-electric-blue to-violet text-white font-semibold rounded-lg shadow-lg shadow-electric-blue/30 hover:shadow-electric-blue/50 transition-shadow duration-300"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                            </motion.a>
                        </motion.div>

                        {/* Social Links - LinkedIn, GitHub, HackerRank */}
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center lg:justify-start items-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        >
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

                            {/* HackerRank Icon with official branding */}
                            <motion.a
                                href="https://www.hackerrank.com/profile/soham_deshmukh_1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-6 py-4 glass-effect-strong rounded-lg border border-[#00EA64]/30 flex items-center gap-3 hover:border-[#00EA64] hover:bg-[#00EA64]/10 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Visit HackerRank Profile"
                            >
                                <svg className="w-6 h-6 fill-[#00EA64]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.908h.701c.141 0 .254-.115.254-.258 0-.094-.049-.176-.123-.221L9.223 4.92c-.049-.063-.141-.109-.226-.109-.084 0-.16.045-.207.107L7.11 6.43c-.072.045-.12.126-.12.218 0 .143.113.258.255.258h.704l.008 10.035c0 .145.111.258.254.258h1.492c.142 0 .259-.115.259-.256v-4.004h4.073v4.152h-.699c-.143 0-.256.115-.256.258 0 .092.048.174.119.219l1.579 1.51c.044.061.141.109.225.109.085 0 .159-.045.208-.109l1.679-1.51c.072-.045.12-.127.12-.219 0-.143-.115-.258-.255-.258h-.704l-.007-10.034c0-.145-.114-.26-.255-.26h-1.494v.002z" />
                                </svg>
                                <span className="font-semibold dark:text-off-white text-gray-900">HackerRank</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00EA64] to-[#00B84D] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Right Column: Map Location Card */}
                    <motion.div
                        className="hidden lg:block h-[500px]"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                    >
                        <MapLocationCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

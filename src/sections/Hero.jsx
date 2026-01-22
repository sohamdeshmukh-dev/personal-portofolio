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
                    <span className="text-off-white">Hi, I'm </span>
                    <span className="text-gradient hover:opacity-90 transition-opacity">Soham Deshmukh</span>
                </motion.h1>

                <motion.p
                    className="text-2xl md:text-3xl text-cool-gray mb-8 font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    Computer Science Student @ Drexel University
                </motion.p>

                <motion.p
                    className="text-lg md:text-xl text-off-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                    Building scalable software solutions and exploring the intersection of AI and quantitative development.
                    <br className="hidden md:block" />
                    Incoming <span className="text-white font-semibold">SAP STAR Program Intern</span> • Former <span className="text-white font-semibold">Lockheed Martin Intern</span>
                </motion.p>

                <motion.div
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                >
                    <motion.a
                        href="#contact"
                        className="px-8 py-4 bg-gradient-to-r from-electric-blue to-violet text-white font-semibold rounded-lg shadow-lg shadow-electric-blue/20"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.a>
                    <motion.a
                        href="https://github.com/ssd333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 glass-effect-strong text-off-white font-semibold rounded-lg border border-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View GitHub
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/soham-deshmukh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 glass-effect-strong text-off-white font-semibold rounded-lg border border-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        LinkedIn
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity }}
            >
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2">
                    <motion.div
                        className="w-1.5 h-1.5 bg-electric-blue rounded-full"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

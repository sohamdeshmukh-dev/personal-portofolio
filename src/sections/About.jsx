import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
    const { ref, isInView } = useScrollAnimation();

    return (
        <section id="about" className="py-20 px-6 relative">
            {/* Animated Divider */}
            <motion.div
                className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-electric-blue to-transparent"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            />

            <div ref={ref} className="max-w-4xl mx-auto">
                <SectionHeader title="About Me" />

                <motion.div
                    className="glass-effect-strong rounded-lg p-8 space-y-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.p
                        className="text-off-white text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        I'm a Computer Science student at <span className="text-electric-blue font-semibold">Drexel University's Pennoni Honors College</span>,
                        pursuing a Bachelor of Science degree (Expected Graduation: 2028).
                    </motion.p>

                    <motion.p
                        className="text-off-white text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        My technical expertise spans <span className="text-violet font-semibold">full-stack development</span>,
                        <span className="text-violet font-semibold"> AI/ML systems</span>, and
                        <span className="text-violet font-semibold"> quantitative analytics</span>. I've built production-grade applications
                        at companies like SAP and Lockheed Martin, delivering measurable impact through clean, scalable code.
                    </motion.p>

                    <motion.p
                        className="text-off-white text-lg leading-relaxed"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        I'm passionate about leveraging technology to solve complex problems—whether that's building real-time trading platforms,
                        developing enterprise software, or creating AI-powered applications. Currently exploring opportunities in
                        <span className="text-electric-blue font-semibold"> software engineering</span>,
                        <span className="text-electric-blue font-semibold"> machine learning</span>, and
                        <span className="text-electric-blue font-semibold"> quantitative development</span>.
                    </motion.p>

                    <motion.p
                        className="text-cool-gray text-base mt-6"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <span className="font-semibold text-off-white">Extracurriculars:</span> CS Theory Reading Group,
                        The Drexel Society of Artificial Intelligence, Business Analytics Club
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;

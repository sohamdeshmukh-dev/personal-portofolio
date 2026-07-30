import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GitHubActivity from '../components/GitHubActivity';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Certifications = () => {
    const { ref, isInView } = useScrollAnimation();

    const certifications = [
        { name: 'Generative AI Developer', issuer: 'SAP' },
        { name: 'AWS Certified Machine Learning', issuer: 'SkillSoft' },
        { name: 'Git & GitHub: Introduction', issuer: 'SkillSoft' },
        { name: 'OpenAI API', issuer: 'SkillSoft' },
        { name: 'R Programming', issuer: 'SkillSoft' },
        { name: 'SQL Essential Training', issuer: 'LinkedIn Learning' },
        { name: 'Top Skills for Quantitative Analysts', issuer: 'LinkedIn Learning' },
        { name: 'Generative AI Fundamentals', issuer: 'Databricks' }
    ];

    return (
        <section id="skills" className="relative pt-12 pb-20 px-6 overflow-visible">
            <div ref={ref} className="relative w-full mx-auto overflow-visible">
                {/* Section Header - Block Level Container */}
                <div className="relative mb-8 max-w-7xl mx-auto">
                    <SectionHeader
                        title="Certifcations"
                    />
                </div>

                {/* Certifications Container */}
                <div className="relative mb-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="glass-effect-strong rounded-lg p-5 flex flex-col justify-between min-h-[80px] hover:bg-electric-blue/5 hover:border-electric-blue/20 transition-all duration-300"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="dark:text-off-white text-gray-900 font-semibold text-base leading-snug mb-2">
                                    {cert.name}
                                </p>
                                <p className="dark:text-cool-gray text-gray-600 text-sm leading-relaxed">
                                    {cert.issuer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* GitHub Activity Container */}
                <div className="relative max-w-7xl mx-auto">
                    <GitHubActivity />
                </div>
            </div>
        </section>
    );
};

export default Certifications;

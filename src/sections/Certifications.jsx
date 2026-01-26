import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GitHubActivity from '../components/GitHubActivity';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SkillBadge = ({ skill, delay = 0 }) => {
    return (
        <motion.span
            className="px-4 py-2 dark:bg-white/5 bg-gray-200 border dark:border-white/10 border-gray-300 rounded-lg dark:text-off-white text-gray-900 text-sm font-medium hover:bg-electric-blue/10 hover:border-electric-blue/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay, duration: 0.3 }}
            viewport={{ once: true }}
        >
            {skill}
        </motion.span>
    );
};

const Certifications = () => {
    const { ref, isInView } = useScrollAnimation();

    const certifications = [
        { name: 'AWS Certified Machine Learning', issuer: 'SkillSoft' },
        { name: 'Git & GitHub: Introduction', issuer: 'LinkedIn Learning' },
        { name: 'OpenAI API', issuer: 'LinkedIn Learning' },
        { name: 'R Programming', issuer: 'LinkedIn Learning' },
        { name: 'SQL Essential Training', issuer: 'LinkedIn Learning' },
        { name: 'Top Skills for Quantitative Analysts', issuer: 'LinkedIn Learning' },
        { name: 'Generative AI Fundamentals', issuer: 'Databricks' }
    ];

    const skillCategories = {
        'Languages': ['Python', 'Java', 'C', 'Racket', 'SQL', 'R', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Bash', 'Swift', 'Dart', 'VBA'],
        'Frameworks & Tools': ['Git', 'React', 'Unity', 'Flutter', 'Drupal', 'WordPress', 'Jira', 'SAP BTP', 'Google Gemini', 'PostgreSQL', 'LaTeX', 'Docker', 'AWS'],
        'AI & Data Analytics': ['Generative AI', 'Quantitative Analytics', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV2', 'YOLO', 'TensorFlow', 'PyTorch', 'Matplotlib', '2D→3D Modeling', 'AR Development'],
        'Other Technical Skills': ['Agile Development', 'API Integration', 'Data Visualization', 'UI/UX Design', 'Version Control', 'Cloud Deployment']
    };

    return (
        <section id="skills" className="relative pt-20 pb-32 px-6 bg-white/[0.01]">
            <div ref={ref} className="relative max-w-6xl mx-auto">
                {/* Section Header - Block Level Container */}
                <div className="relative mb-8">
                    <SectionHeader
                        title="Certifications & Skills"
                        subtitle="Continuous learning and technical expertise"
                    />
                </div>

                {/* Certifications Container */}
                <div className="relative mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold dark:text-off-white text-gray-900 mb-8">
                        Certifications
                    </h3>
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

                {/* Skills Container */}
                <div className="relative mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold dark:text-off-white text-gray-900 mb-8">
                        Technical Skills
                    </h3>
                    <div className="space-y-10">
                        {Object.entries(skillCategories).map(([category, skills], catIndex) => (
                            <div key={catIndex} className="space-y-4">
                                <h4 className="text-lg md:text-xl font-semibold text-violet mb-5">
                                    {category}
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, skillIndex) => (
                                        <SkillBadge
                                            key={skillIndex}
                                            skill={skill}
                                            delay={isInView ? skillIndex * 0.05 : 0}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Activity Container */}
                <div className="relative">
                    <GitHubActivity />
                </div>
            </div>
        </section>
    );
};

export default Certifications;

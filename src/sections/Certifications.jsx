import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import GitHubActivity from '../components/GitHubActivity';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SkillBadge = ({ skill, delay = 0 }) => {
    return (
        <motion.span
            className="px-4 py-2 dark:bg-white/5 bg-gray-200 border dark:border-white/10 border-gray-300 rounded-lg dark:text-off-white text-gray-900 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderColor: 'rgba(0, 212, 255, 0.3)'
            }}
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
        <section id="certifications" className="py-20 px-6 bg-white/[0.01] relative">
            <div ref={ref} className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Certifications & Skills"
                    subtitle="Continuous learning and technical expertise"
                />

                {/* Certifications */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold dark:text-off-white text-gray-900 mb-6">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="glass-effect-strong rounded-lg p-4"
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderColor: 'rgba(0, 212, 255, 0.2)'
                                }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <p className="dark:text-off-white text-gray-900 font-semibold">{cert.name}</p>
                                <p className="dark:text-cool-gray text-gray-600 text-sm">{cert.issuer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div>
                    <h3 className="text-2xl font-bold dark:text-off-white text-gray-900 mb-6">Technical Skills</h3>
                    {Object.entries(skillCategories).map(([category, skills], catIndex) => (
                        <div key={catIndex} className="mb-8">
                            <h4 className="text-lg font-semibold text-violet mb-4">{category}</h4>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, skillIndex) => (
                                    <SkillBadge key={skillIndex} skill={skill} delay={isInView ? skillIndex * 0.05 : 0} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* GitHub Activity */}
                <GitHubActivity />
            </div>
        </section>
    );
};

export default Certifications;

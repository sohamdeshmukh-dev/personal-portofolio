import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SectionHeader from '../components/SectionHeader';
import drexelLogo from '../assets/drexel-logo.png';
import drexelLogoDark from '../assets/drexel-logo-dark.png';

const Education = () => {
    const { isDark } = useTheme();

    const education = {
        school: 'Drexel University',
        honors: 'Pennoni Honors College',
        degree: 'Bachelor of Science in Computer Science',
        graduation: '2028',
        location: 'Philadelphia, PA',
        logo: drexelLogo,
        logoDark: drexelLogoDark,
        concentrations: 'Algorithms and Theory & Artificial Intelligence',
        minor: 'Econometrics and Data Analytics',
        coursework: [
            'Data Structures & Algorithms',
            'Systems Programming',
            'Software Engineering',
            'Advanced Programming Tools & Techniques',
            'Linear Algebra',
            'Calculus I–IV',
            'Probability & Statistics',
            'Discrete Mathematics',
            'Cryptography'
        ]
    };

    const currentLogo = (isDark && education.logoDark) ? education.logoDark : education.logo;

    return (
        <section id="education" className="py-12 px-6 relative">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    title="Education"
                />

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
                        {/* Logo Container */}
                        <motion.div
                            className="glass-effect rounded-lg p-8 h-64 flex items-center justify-center"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)'
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.img
                                src={currentLogo}
                                alt={`${education.school} logo`}
                                className="max-h-full max-w-full object-contain transition-all duration-300"
                                style={{ maxHeight: '140px', maxWidth: '100%' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </motion.div>

                        {/* Education Details */}
                        <div className="space-y-6">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-3xl md:text-4xl font-display font-bold dark:text-off-white text-gray-900 mb-2">
                                    {education.school}
                                </h3>
                                <p className="text-xl text-violet font-semibold mb-1">
                                    {education.honors}
                                </p>
                                <p className="text-lg dark:text-cool-gray text-gray-600 mb-2">
                                    {education.degree}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm dark:text-off-white/80 text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <span className="text-electric-blue">📅</span>
                                        {education.graduation}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="text-electric-blue">📍</span>
                                        {education.location}
                                    </span>
                                </div>
                                <p className="text-sm dark:text-off-white/80 text-gray-700">
                                    <span className="font-semibold">Concentrations:</span> {education.concentrations}
                                </p>
                                <p className="text-sm dark:text-off-white/80 text-gray-700">
                                    <span className="font-semibold">Minor:</span> {education.minor}
                                </p>
                            </motion.div>

                            {/* Coursework */}
                            <motion.div
                                className="glass-effect-strong rounded-lg p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-lg font-display font-semibold dark:text-off-white text-gray-900 mb-4">
                                    Relevant Coursework
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {education.coursework.map((course, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>{course}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Honors & Awards and Extracurriculars - Side by Side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Honors & Awards */}
                                <motion.div
                                    className="glass-effect-strong rounded-lg p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.25 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-lg font-display font-semibold dark:text-off-white text-gray-900 mb-4">
                                        Honors & Awards
                                    </h4>
                                    <div className="space-y-2">
                                        <motion.div
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>A.J. Drexel Scholarship</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>Dean's List</span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Extracurriculars */}
                                <motion.div
                                    className="glass-effect-strong rounded-lg p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.28 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-lg font-display font-semibold dark:text-off-white text-gray-900 mb-4">
                                        Extracurriculars
                                    </h4>
                                    <div className="space-y-2">
                                        <motion.div
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>CS Theory Reading Group</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>The Drexel Society of Artificial Intelligence</span>
                                        </motion.div>
                                        <motion.div
                                            className="flex items-start text-sm dark:text-off-white/90 text-gray-800"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                            <span>Business Analytics Club</span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;

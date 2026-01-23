import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import Card3D from '../components/Card3D';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProjectCard = ({ title, date, description, achievements, techStack, githubUrl, demoUrl, delay = 0 }) => {
    return (
        <Card3D className="glass-effect-strong rounded-lg p-6 h-full flex flex-col" glowColor="blue">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold dark:text-off-white text-gray-900">{title}</h3>
                <span className="dark:text-cool-gray text-gray-600 text-sm whitespace-nowrap ml-4">{date}</span>
            </div>

            <p className="dark:text-cool-gray text-gray-700 mb-4">{description}</p>

            <ul className="space-y-2 mb-4 flex-1">
                {achievements.map((achievement, index) => (
                    <motion.li
                        key={index}
                        className="dark:text-off-white text-gray-800 flex items-start text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                        <span>{achievement}</span>
                    </motion.li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tech, index) => (
                    <motion.span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-electric-blue/10 text-electric-blue rounded-full border border-electric-blue/20 hover:bg-electric-blue/20 hover:scale-110 transition-all"
                        whileHover={{ scale: 1.1 }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>

            <div className="flex gap-3 mt-auto">
                {githubUrl && (
                    <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-violet transition-colors duration-200 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        GitHub →
                    </motion.a>
                )}
                {demoUrl && (
                    <motion.a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-violet transition-colors duration-200 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                    >
                        Live Demo →
                    </motion.a>
                )}
            </div>
        </Card3D>
    );
};

const Projects = () => {
    const { ref, isInView } = useScrollAnimation();

    const projects = [
        {
            title: 'EcoSnap',
            date: 'Nov 2025',
            description: 'AI-Powered Sustainability Social App',
            achievements: [
                'AI-powered sustainability social app that gamifies environmental action through pollution reporting, plant identification, and community-driven challenges',
                'Transforms everyday observations into crowdsourced, research-ready environmental data',
                'Built with React Native, Expo, Node.js, Express, Firebase Firestore, Google Gemini 2.5 Pro, xAI, and Google Maps API'
            ],
            techStack: ['React Native', 'Expo', 'Node.js', 'Express', 'Firebase', 'Gemini 2.5 Pro', 'xAI', 'Google Maps API'],
            githubUrl: null,
            demoUrl: null
        },
        {
            title: 'StockStalker',
            date: 'Jan 2025 - Jun 2025',
            description: 'Stock Market Analysis Web App',
            achievements: [
                'Developed a full-stack trading platform using real-time APIs (Tiingo, Finnhub, TradingView)',
                'Implemented interactive charting and a personalized watchlist for dynamic stock tracking',
                'Built a paper trading simulator, supporting over 1,200 simulated trades in the first month',
                'Integrated financial news and live market insights to support smarter decision-making',
                'Enhanced UI/UX flow, increasing user retention by 25%'
            ],
            techStack: ['JavaScript', 'Tiingo', 'Finnhub', 'TradingView', 'HTML', 'CSS'],
            githubUrl: 'https://github.com/sohamdeshmukh-dev/StockStalker',
            demoUrl: null
        },
        {
            title: 'SwiftFillAI',
            date: 'Apr 2025',
            description: 'Dragon Hacks Chrome Extension',
            achievements: [
                'Built a Chrome extension using Gemini API to analyze webpages and autofill forms with data',
                'Implemented screen capture and context-aware Q&A to enhance real-time user interaction',
                'Automated data filling with AI, reducing user input time by 60% during testing',
                'Focused on accessibility and UX, improving task completion rates by 40%'
            ],
            techStack: ['JavaScript', 'Chrome Extension APIs', 'Gemini API'],
            githubUrl: 'https://github.com/sohamdeshmukh-dev/SwiftFillAI',
            demoUrl: null
        },
        {
            title: 'ASLearn',
            date: 'Mar 2025',
            description: 'Philly Codefest',
            achievements: [
                'Built an interactive ASL learning web app using React, OpenCV2, and YOLO for real-time sign recognition',
                'Implemented computer vision feedback, improving sign accuracy by 45% during testing',
                'Styled an intuitive UI to ensure accessibility, leading to a 35% increase in session duration',
                'Leveraged AI and computer vision to create an engaging, feedback-driven learning experience'
            ],
            techStack: ['React', 'OpenCV2', 'YOLO', 'Python'],
            githubUrl: 'https://github.com/ssd333',
            demoUrl: null
        }
    ];

    return (
        <section id="projects" className="py-20 px-6 relative">
            <div ref={ref} className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Projects"
                    subtitle="Engineering-focused applications with measurable impact"
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} delay={index * 0.2} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;

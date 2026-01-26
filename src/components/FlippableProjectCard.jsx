import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card3D from './Card3D';

const FlippableProjectCard = ({ title, date, description, achievements, techStack, githubUrl, demoUrl, delay = 0, logo, glowColor = 'blue' }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="relative h-[600px] cursor-pointer perspective-1000 flex flex-col"
            onClick={handleFlip}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-full h-full flex-1"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            >
                {/* Front Side - Project Details */}
                <div
                    className="absolute w-full h-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    <Card3D className="glass-effect-strong rounded-lg p-6 h-[600px] flex flex-col" glowColor="blue">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-2xl font-bold dark:text-off-white text-gray-900">{title}</h3>
                            <span className="dark:text-cool-gray text-gray-600 text-sm whitespace-nowrap ml-4">{date}</span>
                        </div>

                        <p className="dark:text-cool-gray text-gray-700 mb-4">{description}</p>

                        <div className="flex-1 overflow-hidden mb-4">
                            <ul className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-thin">
                                {achievements.map((achievement, index) => (
                                    <motion.li
                                        key={index}
                                        className="dark:text-off-white text-gray-800 flex items-start text-sm leading-relaxed"
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
                        </div>

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
                                    onClick={(e) => e.stopPropagation()}
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
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Live Demo →
                                </motion.a>
                            )}
                        </div>

                        {/* Flip Hint */}
                        <div className="mt-4 text-center">
                            <span className="text-xs text-cool-gray/60">Click to flip</span>
                        </div>
                    </Card3D>
                </div>

                {/* Back Side - Project Logo */}
                <div
                    className="absolute w-full h-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <Card3D className="glass-effect-strong rounded-lg p-6 h-full flex flex-col items-center justify-center" glowColor={glowColor}>
                        <div className="w-full h-full flex items-center justify-center p-4">
                            <img
                                src={logo}
                                alt={`${title} Logo`}
                                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                                style={{
                                    maxWidth: '450px',
                                    maxHeight: '450px'
                                }}
                            />
                        </div>

                        {/* Flip Hint */}
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <span className="text-xs text-cool-gray/60">Click to flip back</span>
                        </div>
                    </Card3D>
                </div>
            </motion.div>
        </div>
    );
};

export default FlippableProjectCard;

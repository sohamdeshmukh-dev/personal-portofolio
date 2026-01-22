import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedTimeline = ({ experiences }) => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center']
    });

    const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        const unsubscribe = timelineProgress.on('change', (latest) => {
            const newIndex = Math.floor((latest / 100) * experiences.length);
            setActiveIndex(Math.min(newIndex, experiences.length - 1));
        });

        return () => unsubscribe();
    }, [timelineProgress, experiences.length]);

    return (
        <div ref={containerRef} className="relative py-20">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 dark:bg-white/10 bg-gray-300">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-violet to-teal"
                    style={{
                        height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                    }}
                />
            </div>

            {/* Traveling Glowing Dot */}
            <motion.div
                className="absolute left-1/4 w-4 h-4 -ml-2 rounded-full bg-electric-blue glow-blue z-10"
                style={{
                    top: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                }}
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Timeline Entries */}
            <div className="space-y-24">
                {experiences.map((exp, index) => (
                    <TimelineEntry
                        key={index}
                        experience={exp}
                        isActive={index <= activeIndex}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

const TimelineEntry = ({ experience, isActive, index }) => {
    return (
        <motion.div
            className="relative flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
        >
            {/* Date - Left Side */}
            <div className="md:w-1/4 flex-shrink-0 text-right pr-12">
                <motion.p
                    className="text-electric-blue font-semibold text-lg"
                    animate={{
                        scale: isActive ? 1.1 : 1,
                        color: isActive ? '#00d4ff' : '#9ca3af'
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {experience.date}
                </motion.p>
            </div>

            {/* Spacer for timeline */}
            <div className="hidden md:block w-12 flex-shrink-0" />

            {/* Content - Right Side */}
            <motion.div
                className="flex-1 glass-effect-strong rounded-lg p-6"
                animate={{
                    scale: isActive ? 1 : 0.95,
                    borderColor: isActive ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'
                }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
                }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-2xl font-bold dark:text-off-white text-gray-900 mb-1">{experience.title}</h3>
                <p className="text-violet font-medium mb-2">{experience.company} • {experience.location}</p>
                <p className="dark:text-cool-gray text-gray-600 mb-4 italic">{experience.description}</p>
                <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                        <motion.li
                            key={idx}
                            className="dark:text-off-white text-gray-800 flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: isActive ? 1 : 0.5,
                                x: isActive ? 0 : -20
                            }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                        >
                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                            <span>{achievement}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default AnimatedTimeline;

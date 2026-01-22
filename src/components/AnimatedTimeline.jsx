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
            {/* Animated Timeline Line - Centered */}
            <div className="absolute left-1/2 -ml-0.5 top-0 bottom-0 w-0.5 dark:bg-white/10 bg-gray-300 hidden md:block">
                <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-violet to-teal"
                    style={{
                        height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                    }}
                />
            </div>

            {/* Traveling Glowing Dot - Centered */}
            <motion.div
                className="absolute left-1/2 w-4 h-4 -ml-2 rounded-full bg-electric-blue glow-blue z-10 hidden md:block"
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

            {/* Timeline Entries - Alternating Layout */}
            <div className="space-y-16 md:space-y-24">
                {experiences.map((exp, index) => (
                    <TimelineEntry
                        key={index}
                        experience={exp}
                        isActive={index <= activeIndex}
                        index={index}
                        isLeft={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
};

const TimelineEntry = ({ experience, isActive, index, isLeft }) => {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
        >
            {/* Desktop Layout - Alternating */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                {isLeft ? (
                    <>
                        {/* Content on Left */}
                        <div className="pr-12">
                            <ContentCard experience={experience} isActive={isActive} />
                        </div>
                        {/* Logo on Right */}
                        <div className="pl-12">
                            <LogoContainer logo={experience.logo} company={experience.company} isActive={isActive} />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Logo on Left */}
                        <div className="pr-12">
                            <LogoContainer logo={experience.logo} company={experience.company} isActive={isActive} />
                        </div>
                        {/* Content on Right */}
                        <div className="pl-12">
                            <ContentCard experience={experience} isActive={isActive} />
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="md:hidden space-y-4">
                <LogoContainer logo={experience.logo} company={experience.company} isActive={isActive} />
                <ContentCard experience={experience} isActive={isActive} />
            </div>
        </motion.div>
    );
};

const LogoContainer = ({ logo, company, isActive }) => {
    const isLockheed = company.includes('Lockheed');

    return (
        <motion.div
            className="glass-effect rounded-lg p-8 h-48 flex items-center justify-center group"
            animate={{
                scale: isActive ? 1 : 0.95,
                borderColor: isActive ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)'
            }}
            transition={{ duration: 0.3 }}
        >
            <motion.img
                src={logo}
                alt={`${company} logo`}
                className={`max-h-full max-w-full object-contain transition-all duration-300 ${isLockheed ? 'dark:invert dark:brightness-[1.2] dark:contrast-[1.1]' : ''
                    }`}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                    opacity: isActive ? 1 : 0.6,
                    x: 0
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
            />
        </motion.div>
    );
};

const ContentCard = ({ experience, isActive }) => {
    return (
        <div className="space-y-3">
            {/* Date Badge */}
            <motion.div
                className="inline-block"
                animate={{
                    scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                <span className={`text-sm md:text-base font-semibold px-4 py-2 rounded-full ${isActive
                    ? 'text-electric-blue bg-electric-blue/10 border border-electric-blue/30'
                    : 'text-gray-400 bg-gray-400/5 border border-gray-400/20'
                    }`}>
                    {experience.date}
                </span>
            </motion.div>

            {/* Content Card */}
            <motion.div
                className="glass-effect-strong rounded-lg p-6"
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
                <h3 className="text-xl md:text-2xl font-bold dark:text-off-white text-gray-900 mb-1">
                    {experience.title}
                </h3>
                <p className="text-violet font-medium mb-2">
                    {experience.company} • {experience.location}
                </p>
                <p className="dark:text-cool-gray text-gray-600 mb-4 italic">
                    {experience.description}
                </p>
                <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                        <motion.li
                            key={idx}
                            className="dark:text-off-white text-gray-800 flex items-start text-sm md:text-base"
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
        </div>
    );
};

export default AnimatedTimeline;

import React from 'react';
import { motion } from 'framer-motion';
import OrbitalSkillsCluster from './OrbitalSkillsCluster';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const OrbitalSkillsGrid = ({ skillCategories }) => {
    const { ref, isInView } = useScrollAnimation();

    // Color scheme for each cluster
    const clusterConfigs = [
        {
            category: 'Languages',
            skills: skillCategories['Languages'],
            color: '#4cc9f0', // Electric blue
            rotationSpeed: 18
        },
        {
            category: 'Frameworks & Tools',
            skills: skillCategories['Frameworks & Tools'],
            color: '#9b5de5', // Soft purple
            rotationSpeed: 20
        },
        {
            category: 'AI & Data Analytics',
            skills: skillCategories['AI & Data Analytics'],
            color: '#00d4ff', // Cyan
            rotationSpeed: 16
        },
        {
            category: 'Other Technical Skills',
            skills: skillCategories['Other Technical Skills'],
            color: '#8b5cf6', // Violet
            rotationSpeed: 22
        }
    ];

    return (
        <div ref={ref} className="relative w-full overflow-visible">
            {/* Section Title */}
            <motion.h3
                className="text-4xl md:text-5xl font-bold dark:text-off-white text-gray-900 mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                Technical Skills
            </motion.h3>

            {/* 4-Quadrant Grid - overflow-visible to allow orbital elements to extend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-[1800px] mx-auto px-4 py-8 overflow-visible">
                {clusterConfigs.map((config, index) => (
                    <motion.div
                        key={config.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="flex justify-center overflow-visible"
                    >
                        <OrbitalSkillsCluster
                            skills={config.skills}
                            category={config.category}
                            color={config.color}
                            rotationSpeed={config.rotationSpeed}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrbitalSkillsGrid;

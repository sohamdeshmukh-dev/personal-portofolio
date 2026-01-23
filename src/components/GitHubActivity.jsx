import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubActivity = () => {
    return (
        <motion.section
            id="activity"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="rounded-2xl glass-effect-strong p-6 md:p-8 mt-12"
        >
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold dark:text-off-white text-gray-900 tracking-tight">
                    Engineering Activity
                </h3>
                <p className="text-sm md:text-base dark:text-cool-gray text-gray-600 mt-2">
                    Consistent development across personal projects, coursework, and production systems.
                </p>
            </div>

            <div className="overflow-x-auto github-activity pb-2">
                <GitHubCalendar
                    username="sohamdeshmukh-dev"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    colorScheme="dark"
                    theme={{
                        dark: [
                            '#0a0a0a',  // empty - matches dark background
                            '#0f2a44',  // low activity
                            '#155e75',  // medium activity
                            '#22c55e',  // high activity
                            '#16a34a',  // very high activity
                        ],
                        light: [
                            '#f8fafc',  // empty - matches light background
                            '#bfdbfe',  // low activity
                            '#60a5fa',  // medium activity
                            '#3b82f6',  // high activity
                            '#1d4ed8',  // very high activity
                        ]
                    }}
                    style={{
                        color: 'var(--text-secondary)',
                    }}
                />
            </div>
        </motion.section>
    );
};

export default GitHubActivity;

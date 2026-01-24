import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

const GitHubActivity = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

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
                    GitHub Activity:
                </h3>
                <p className="text-sm md:text-base dark:text-cool-gray text-gray-600 mt-2">
                    Development from personal projects and coursework.
                </p>
            </div>

            <div className="overflow-x-auto github-activity pb-2">
                <GitHubCalendar
                    username="sohamdeshmukh-dev"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    colorScheme={isDark ? 'dark' : 'light'}
                    theme={{
                        dark: [
                            '#0a0a0a',  // empty - matches dark background
                            '#0f2a44',  // low activity
                            '#155e75',  // medium activity
                            '#22c55e',  // high activity
                            '#16a34a',  // very high activity
                        ],
                        light: [
                            '#ebedf0',  // empty - light gray
                            '#9be9a8',  // low activity - light green
                            '#40c463',  // medium activity - medium green
                            '#30a14e',  // high activity - darker green
                            '#216e39',  // very high activity - darkest green
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

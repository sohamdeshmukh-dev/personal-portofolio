import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-14 rounded-full glass-effect-strong flex items-center justify-center group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    background: isDark
                        ? 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)'
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Sun Icon */}
            <motion.svg
                className="absolute w-6 h-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    rotate: isDark ? 90 : 0,
                    opacity: isDark ? 0 : 1
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </motion.svg>

            {/* Moon Icon */}
            <motion.svg
                className="absolute w-6 h-6 text-electric-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    rotate: isDark ? 0 : -90,
                    opacity: isDark ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>

            {/* Hover ring effect */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-electric-blue opacity-0 group-hover:opacity-50"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.button>
    );
};

export default ThemeToggle;

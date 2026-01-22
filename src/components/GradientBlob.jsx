import React from 'react';
import { motion } from 'framer-motion';

const GradientBlob = ({ color, size = 400, top, left, delay = 0 }) => {
    const colors = {
        blue: 'rgba(0, 212, 255, 0.15)',
        violet: 'rgba(139, 92, 246, 0.15)',
        teal: 'rgba(20, 184, 166, 0.15)',
        magenta: 'rgba(236, 72, 153, 0.15)',
    };

    return (
        <motion.div
            className="absolute rounded-full blur-3xl"
            style={{
                width: size,
                height: size,
                top,
                left,
                background: colors[color] || colors.blue,
            }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -30, 0],
            }}
            transition={{
                duration: 8,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
};

export default GradientBlob;

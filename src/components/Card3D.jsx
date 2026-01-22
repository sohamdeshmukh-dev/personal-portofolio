import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Card3D = ({ children, className = '', glowColor = 'blue' }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const glowColors = {
        blue: '0 0 40px rgba(0, 212, 255, 0.4)',
        violet: '0 0 40px rgba(139, 92, 246, 0.4)',
        teal: '0 0 40px rgba(20, 184, 166, 0.4)',
    };

    return (
        <div className="perspective-1000">
            <motion.div
                className={`${className} transition-all duration-300`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX,
                    rotateY,
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: glowColors[glowColor] || glowColors.blue,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Card3D;

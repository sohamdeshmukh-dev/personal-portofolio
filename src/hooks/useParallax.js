import { useEffect, useState } from 'react';
import { useTransform, useScroll } from 'framer-motion';

export const useParallax = (distance = 100) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, distance]);
    return y;
};

export const useParallaxOffset = (offset = 50) => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return offsetY * offset / 1000;
};

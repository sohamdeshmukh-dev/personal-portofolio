import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.3,
        ...options
    });

    return { ref, isInView };
};

export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = scrollPx / winHeightPx;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress();

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return scrollProgress;
};

import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently in viewport
 * Uses IntersectionObserver for performance
 * @param {Array<string>} sectionIds - Array of section IDs to observe
 * @param {number} offset - Offset from top in pixels (for fixed navbar)
 * @returns {string} - Currently active section ID
 */
export const useScrollSpy = (sectionIds, offset = 100) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observers = [];
        const observerOptions = {
            root: null,
            rootMargin: `-${offset}px 0px -50% 0px`,
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        // Create observers for each section
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(handleIntersect, observerOptions);
                observer.observe(element);
                observers.push(observer);
            }
        });

        // Cleanup
        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [sectionIds, offset]);

    return activeSection;
};

import React, { useEffect, useRef, useState } from 'react';

const TimelineItem = ({ date, title, company, location, description, achievements }) => {
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={itemRef}
            className={`relative flex flex-col md:flex-row gap-8 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
        >
            {/* Date - Left Side */}
            <div className="md:w-1/4 flex-shrink-0">
                <p className="text-electric-blue font-semibold text-lg">{date}</p>
            </div>

            {/* Timeline Line */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-electric-blue ring-4 ring-electric-blue/20"></div>
                <div className="w-0.5 h-full bg-gradient-to-b from-electric-blue/50 to-transparent"></div>
            </div>

            {/* Content - Right Side */}
            <div className="flex-1 glass-effect rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-off-white mb-1">{title}</h3>
                <p className="text-soft-purple font-medium mb-2">{company} • {location}</p>
                <p className="text-cool-gray mb-4 italic">{description}</p>
                <ul className="space-y-2">
                    {achievements.map((achievement, index) => (
                        <li key={index} className="text-off-white flex items-start">
                            <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                            <span>{achievement}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TimelineItem;

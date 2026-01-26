import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="relative mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="dark:text-cool-gray text-gray-600 text-lg md:text-xl leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;

import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                {title}
            </h2>
            {subtitle && (
                <p className="text-cool-gray text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;

import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="relative mb-12 animate-fade-in text-center">
            <p className="font-display font-semibold text-[13px] tracking-[.18em] uppercase text-electric-blue mb-4">
                {title}
            </p>
            {subtitle && (
                <h2 className="font-display font-bold text-4xl md:text-5xl text-off-white leading-tight">
                    {subtitle}
                </h2>
            )}
        </div>
    );
};

export default SectionHeader;

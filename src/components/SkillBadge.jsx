import React from 'react';

const SkillBadge = ({ skill }) => {
    return (
        <span className="px-4 py-2 bg-white/5 hover:bg-electric-blue/10 border border-white/10 hover:border-electric-blue/30 rounded-lg text-off-white text-sm font-medium transition-all duration-200 hover:scale-105">
            {skill}
        </span>
    );
};

export default SkillBadge;

import React from 'react';

// Monopoly-style title deed card. Rarity = classic Monopoly color groups.
const RARITIES = {
    'dark-blue': { color: '#2A4B9B', text: '#FFFFFF', label: 'RAREST' },
    'green': { color: '#1FB25A', text: '#FFFFFF', label: 'ULTRA RARE' },
    'red': { color: '#ED1B24', text: '#FFFFFF', label: 'RARE' },
    'orange': { color: '#F7941D', text: '#1A1A1A', label: 'UNCOMMON' },
    'light-blue': { color: '#AAE0FA', text: '#1A1A1A', label: 'COMMON' },
};

const DeedCard = ({ title, date, description, achievements, techStack, githubUrl, demoUrl, rarity }) => {
    const { color, text, label } = RARITIES[rarity];

    return (
        <div className="w-[290px] h-[480px] flex flex-col bg-[#FBF6E9] text-[#1A1A1A] rounded-md border-2 border-[#1A1A1A] p-2 shadow-xl shadow-black/50">
            {/* Color band */}
            <div
                className="shrink-0 rounded-sm border border-black/25 px-3 py-2.5 text-center"
                style={{ background: color, color: text }}
            >
                <p className="font-display text-[9px] font-semibold tracking-[.28em] opacity-80">
                    TITLE DEED — {label}
                </p>
                <h3 className="font-display font-bold text-lg leading-tight uppercase mt-0.5">
                    {title}
                </h3>
            </div>

            {/* Deed body */}
            <div className="flex-1 min-h-0 flex flex-col px-1.5 pt-3 pb-1.5">
                <p className="shrink-0 text-center text-[11px] font-semibold uppercase tracking-[.06em]">
                    {description}
                </p>
                <p className="shrink-0 text-center text-[10px] text-black/50 mt-1">{date}</p>

                {/* Rent-table rows */}
                <ul className="flex-1 min-h-0 overflow-y-auto scrollbar-thin mt-3 border-t-2 border-black/40">
                    {achievements.map((achievement, idx) => (
                        <li key={idx} className="py-1.5 border-b border-black/15 text-[10px] leading-snug">
                            {achievement}
                        </li>
                    ))}
                </ul>

                <p className="shrink-0 mt-2.5 text-center text-[9px] leading-relaxed text-black/55 tracking-wide">
                    {techStack.join(' · ')}
                </p>

                {(githubUrl || demoUrl) && (
                    <div className="shrink-0 mt-2 flex justify-center gap-4">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold uppercase tracking-[.1em] underline underline-offset-2 hover:opacity-60"
                            >
                                GitHub
                            </a>
                        )}
                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold uppercase tracking-[.1em] underline underline-offset-2 hover:opacity-60"
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeedCard;

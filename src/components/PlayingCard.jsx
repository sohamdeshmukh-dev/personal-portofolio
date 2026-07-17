import React, { useState, useEffect } from 'react';

// Hover-to-flip playing card (tap toggles on touch devices).
// Front: card-back artwork. Back: role details.
// interactive=false renders the front face only — used while the deck is stacked.
// canFlip=false blocks hover/click flipping — used while the card is still gliding into place.
const PlayingCard = ({ image, company, title, subtitle, achievements, interactive = true, canFlip = true }) => {
    const [flipped, setFlipped] = useState(false);

    // Always face down while stacked or mid-draw — clears stale flip state from a previous draw.
    useEffect(() => { if (!canFlip) setFlipped(false); }, [canFlip]);

    const front = (
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-xl shadow-black/50 border border-white/10">
            <img
                src={image}
                alt={`${company} playing card`}
                className="w-full h-full object-cover"
                draggable={false}
            />
        </div>
    );

    if (!interactive) {
        return (
            <div className="relative w-[300px] h-[460px] md:w-[340px] md:h-[520px]">
                {front}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className={`group [perspective:1800px] ${canFlip ? 'cursor-pointer' : ''}`}
                onClick={() => canFlip && setFlipped(f => !f)}
            >
                <div
                    className={`relative w-[300px] h-[460px] md:w-[340px] md:h-[520px] transition-transform duration-700 ease-[cubic-bezier(.2,.9,.3,1)] [transform-style:preserve-3d] ${canFlip ? 'group-hover:[transform:rotateY(180deg)]' : ''}`}
                    style={flipped ? { transform: 'rotateY(180deg)' } : undefined}
                >
                    {front}

                    {/* Back: role details */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-midnight-blue border border-card-navy p-6 md:p-7 flex flex-col gap-3">
                        <h3 className="font-display font-bold text-lg md:text-xl leading-tight text-off-white">
                            {title}
                        </h3>
                        <p className="text-sm text-off-white/60">{subtitle}</p>
                        <ul className="mt-1 space-y-2 text-xs md:text-[13px] leading-snug text-off-white/85">
                            {achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <p className="font-display text-[11px] tracking-[.14em] uppercase">
                <span className="text-electric-blue">{company}</span>
                <span className="text-off-white/40"> — hover to flip</span>
            </p>
        </div>
    );
};

export default PlayingCard;

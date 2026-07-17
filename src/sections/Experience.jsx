import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import PlayingCard from '../components/PlayingCard';

// Ordered most-current first — index 0 sits on top of the deck and lands on the left.
const experiences = [
    {
        company: 'SAP',
        date: 'MAR 2026 — PRESENT',
        title: 'Software Developer Intern',
        subtitle: 'SAP America — MCC Backoffice Team · Newtown Square, PA',
        image: '/SAP-card.png',
        tilt: -4,
        achievements: [
            'Developed 3+ features in the MCC Assistant using JavaScript in SAP Business Application Studio',
            'Enhanced backoffice tooling with SAPUI5 and SAP Fiori, reducing de-escalation handling time by 20%',
            'Integrated RESTful APIs to automate handover email generation, saving 5+ hours/week of manual work',
            'Maintained SAP HANA database integrity across 10,000+ escalation records via SQL diagnostics',
            'Built SAP Analytics Cloud dashboards tracking 15+ KPIs for 3 regional leadership teams'
        ]
    },
    {
        company: 'Lockheed Martin',
        date: 'JUL — AUG 2023',
        title: 'IT Intern',
        subtitle: 'Lockheed Martin — Enterprise Operations · King of Prussia, PA',
        image: '/lockheed-card.png',
        tilt: 4,
        achievements: [
            'Led a 4+ member team to build a Unity-based virtual tour app for a helicopter plant in Stratford, CT',
            'Designed and developed a co-op portal for Drexel University, increasing operational efficiency by 25%',
            'Engineered real-time 3D interactive environments in Unity for scalable virtual demonstrations',
            'Deployed and managed content via WordPress and Drupal CMS to drive user engagement'
        ]
    }
];

const Experience = () => {
    const [expanded, setExpanded] = useState(false);
    // Indices of cards whose draw animation has finished — only these may flip.
    const [settledCards, setSettledCards] = useState(() => new Set());

    return (
        <section id="experience" className="py-12 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Experience"
                />

                <div
                    className={expanded
                        ? 'mt-16 flex flex-wrap gap-12 justify-center items-start'
                        : 'mt-16 relative h-[490px] md:h-[550px] cursor-pointer'}
                    onClick={expanded ? undefined : () => setExpanded(true)}
                >
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            layout
                            initial={false}
                            className={expanded
                                ? 'flex flex-col items-center gap-5'
                                // Fixed width matching the card (not a % transform) so it stays
                                // truly centered — % transforms drift once combined with `layout`.
                                : 'absolute inset-x-0 top-0 mx-auto w-[300px] md:w-[340px]'}
                            style={{ zIndex: experiences.length - i }}
                            animate={expanded
                                ? {
                                    // Phase 1: lift straight up out of the stack, then glide into the hand.
                                    y: [i * 10, i * 10 - 30, 0],
                                    rotate: [exp.tilt, exp.tilt, 0]
                                }
                                : { y: i * 10, rotate: exp.tilt }}
                            transition={expanded
                                ? {
                                    duration: 1,
                                    // Lift holds ~35% of the time; the horizontal glide gets the rest.
                                    times: [0, 0.35, 1],
                                    ease: ['easeOut', 'easeInOut'],
                                    delay: i * 0.35
                                }
                                : { duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                            onAnimationComplete={() => {
                                if (expanded) setSettledCards(prev => new Set(prev).add(i));
                            }}
                        >
                            {expanded && (
                                <span className="font-display text-xs font-semibold tracking-[.14em] px-4 py-2 rounded-full text-electric-blue bg-electric-blue/10 border border-electric-blue/30">
                                    {exp.date}
                                </span>
                            )}
                            <PlayingCard {...exp} interactive={expanded} canFlip={settledCards.has(i)} />
                        </motion.div>
                    ))}
                </div>

                {expanded ? (
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => { setExpanded(false); setSettledCards(new Set()); }}
                            className="font-display text-xs font-semibold tracking-[.14em] uppercase px-5 py-2.5 rounded-full text-off-white/60 border border-white/15 hover:text-electric-blue hover:border-electric-blue/40 transition-colors"
                        >
                            Re-deck the cards
                        </button>
                    </div>
                ) : (
                    <p className="mt-6 text-center font-display text-[11px] tracking-[.14em] text-off-white/40 uppercase">
                        Click the deck to draw
                    </p>
                )}
            </div>
        </section>
    );
};

export default Experience;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import DeedCard from '../components/DeedCard';

const FLIP_DURATION = 0.9;
const REGATHER_SPRING = 1.1;

// Ordered common → rarest, index 0 sits on top of the deck and lands on the left.
const projects = [
    {
        title: 'SwiftFillAI',
        rarity: 'light-blue',
        tilt: -6,
        date: 'Apr 2025',
        description: 'Dragon Hacks Chrome Extension',
        achievements: [
            'Built a Chrome extension using Gemini API to analyze webpages and autofill forms with data',
            'Implemented screen capture and context-aware Q&A to enhance real-time user interaction',
            'Automated data filling with AI, reducing user input time by 60% during testing',
            'Focused on accessibility and UX, improving task completion rates by 40%'
        ],
        techStack: ['JavaScript', 'Chrome Extension APIs', 'Gemini API'],
        githubUrl: 'https://github.com/sohamdeshmukh-dev/SwiftFillAI',
        demoUrl: null
    },
    {
        title: 'StockStalker',
        rarity: 'orange',
        tilt: -3,
        date: 'Jan 2025 - Jun 2025',
        description: 'Stock Market Analysis Web App',
        achievements: [
            'Developed a full-stack trading platform using real-time APIs (Tiingo, Finnhub, TradingView)',
            'Implemented interactive charting and a personalized watchlist for dynamic stock tracking',
            'Built a paper trading simulator, supporting over 1,200 simulated trades in the first month',
            'Integrated financial news and live market insights to support smarter decision-making',
            'Enhanced UI/UX flow, increasing user retention by 25%'
        ],
        techStack: ['JavaScript', 'Tiingo', 'Finnhub', 'TradingView', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/sohamdeshmukh-dev/StockStalker',
        demoUrl: null
    },
    {
        title: 'EcoSnap',
        rarity: 'red',
        tilt: 0,
        date: 'Nov 2025',
        description: 'AI-Powered Sustainability Social App',
        achievements: [
            'AI-powered sustainability social app that gamifies environmental action through pollution reporting, plant identification, and community-driven challenges',
            'Transforms everyday observations into crowdsourced, research-ready environmental data',
            'Built with React Native, Expo, Node.js, Express, Firebase Firestore, Google Gemini 2.5 Pro, xAI, and Google Maps API'
        ],
        techStack: ['React Native', 'Expo', 'Node.js', 'Express', 'Firebase', 'Gemini 2.5 Pro', 'xAI', 'Google Maps API'],
        githubUrl: null,
        demoUrl: null
    },
    {
        title: 'Aura Atlas',
        rarity: 'green',
        tilt: 3,
        date: 'Mar 2026',
        description: 'Geospatial Wellness Agentic Network',
        achievements: [
            'Architected Mapbox 3D routing with facial biometrics to navigate users through low-stress zones',
            'Built a React/Next.js navigation HUD with an emotional weather system, cutting decisions by 60%',
            'Engineered a 2-step proximity search and AR pipeline via GPT-4o, achieving 95% landmark accuracy',
            'Implemented Deloitte, Capital One, and CanvasIQ integrations via Next.js and Stripe'
        ],
        techStack: ['React', 'Next.js', 'Mapbox', 'Supabase', 'GPT-4o', 'Presage SDK', 'Stripe'],
        githubUrl: null,
        demoUrl: null
    },
    {
        title: 'PULSE',
        rarity: 'dark-blue',
        tilt: 6,
        date: 'Feb 2026',
        description: 'Cancer Research | Deloitte & Lebow Datathon',
        achievements: [
            'Presented research and ROI framework to Deloitte industry judges, won 1st place at the Deloitte Datathon',
            'Built a lung cancer ROI engine in Python with 50k+ records, projects 8.4× return in underserved communities',
            'Designed an interactive dashboard enabling neighborhood-level decision support for targeted screening',
            'Analyzed cross-city data lung cancer screening impact, estimating lives saved from a 57% survival improvement'
        ],
        techStack: ['Python', 'Pandas', 'Plotly', 'React', 'Vite', 'Data Analytics'],
        githubUrl: 'https://github.com/Himasai10/datathon-lung-cancer',
        demoUrl: 'https://datathon-lung-cancer.vercel.app/'
    }
];

// Longest re-deck path: last card's flip cue + its flip + its glide back to the stack.
const REDECK_MS = ((projects.length - 1) * 0.14 + FLIP_DURATION + REGATHER_SPRING) * 1000;

const Projects = () => {
    const [expanded, setExpanded] = useState(false);
    // The collapsed deck is only 560px tall, so letting the container snap to that
    // immediately drops the still-animating cards onto the next section. Pin the
    // expanded height until the cards are home, then ease it back down.
    const [heldHeight, setHeldHeight] = useState(null);
    const deckRef = useRef(null);

    const reDeck = () => {
        setHeldHeight(deckRef.current?.offsetHeight ?? null);
        setExpanded(false);
        setTimeout(() => setHeldHeight(null), REDECK_MS);
    };

    return (
        <section id="projects" className="relative py-12 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader title="Projects" />

                {/* Desktop: draw-from-deck fan */}
                <div
                    ref={deckRef}
                    className={`hidden md:flex mt-16 transition-[height] duration-500 ${expanded
                        ? 'flex-wrap gap-x-6 gap-y-10 justify-center items-start max-w-[950px] mx-auto'
                        : 'relative h-[560px] cursor-pointer'}`}
                    style={heldHeight ? { height: heldHeight } : undefined}
                    onClick={expanded ? undefined : () => setExpanded(true)}
                >
                    {projects.map((project, i) => {
                        // Draw: cascade left-to-right (top card first), each card gliding out then flipping face-up.
                        // Re-deck: reverse cascade — the last-drawn card flips face-down first, then the stack regathers.
                        const cue = expanded ? i * 0.18 : (projects.length - 1 - i) * 0.14;
                        const flipDelay = expanded ? cue + 0.3 : cue;
                        const slideDelay = expanded ? cue : cue + FLIP_DURATION;

                        return (
                            <motion.div
                                key={project.title}
                                layout="position"
                                initial={false}
                                className={expanded
                                    ? 'shrink-0 w-[290px]'
                                    : 'absolute inset-x-0 mx-auto w-[290px]'}
                                style={{ zIndex: expanded ? i : projects.length - i, top: expanded ? undefined : i * 8 }}
                                animate={{ rotate: expanded ? 0 : project.tilt }}
                                transition={{
                                    layout: expanded
                                        ? { type: 'spring', duration: 1.4, bounce: 0.2, delay: slideDelay }
                                        : { type: 'spring', duration: REGATHER_SPRING, bounce: 0.15, delay: slideDelay },
                                    rotate: expanded
                                        ? { duration: 0.8, delay: slideDelay, ease: 'easeOut' }
                                        : { duration: 0.6, delay: slideDelay, ease: 'easeIn' }
                                }}
                            >
                                <div className="[perspective:1800px] w-[290px] h-[480px]">
                                    <motion.div
                                        className="relative w-full h-full [transform-style:preserve-3d]"
                                        initial={false}
                                        animate={{ rotateY: expanded ? 180 : 0 }}
                                        transition={{ duration: FLIP_DURATION, delay: flipDelay, ease: [.2, .9, .3, 1] }}
                                    >
                                        {/* Face down: property-card back */}
                                        <div className="absolute inset-0 [backface-visibility:hidden] rounded-md overflow-hidden border-2 border-[#1A1A1A] shadow-xl shadow-black/50 bg-white">
                                            <img
                                                src="/Property.png"
                                                alt=""
                                                // scale crops the source's own border hairlines out of frame
                                                className="w-full h-full object-cover scale-110"
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Face up: the deed */}
                                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                            <DeedCard {...project} />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {expanded ? (
                    <div className="hidden md:block mt-10 text-center">
                        <button
                            onClick={reDeck}
                            className="font-display text-xs font-semibold tracking-[.14em] uppercase px-5 py-2.5 rounded-full text-off-white/60 border border-white/15 hover:text-electric-blue hover:border-electric-blue/40 transition-colors"
                        >
                            Re-deck the cards
                        </button>
                    </div>
                ) : (
                    <p className="hidden md:block mt-6 text-center font-display text-[11px] tracking-[.14em] text-off-white/40 uppercase">
                        Click the deck to draw
                    </p>
                )}

                {/* Mobile: simple stack */}
                <div className="md:hidden mt-12 flex flex-col items-center gap-8">
                    {projects.map((project) => (
                        <DeedCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

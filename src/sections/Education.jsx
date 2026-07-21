import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

// Track colors (inline styles so Tailwind's purge can't drop dynamic classes).
const TRACKS = {
    coursework: { label: 'Coursework', color: '#5B8DD6' },
    focus: { label: 'Focus Area', color: '#ec4899' },
    honors: { label: 'Honors & Awards', color: '#fbbf24' },
    extracurricular: { label: 'Extracurriculars', color: '#14b8a6' },
};

// Board "spaces" in play order, laid out clockwise around the central hub.
// Coords are in the SVG viewBox (0 0 1000 560); the path is drawn through them.
const STOPS = [
    { track: 'coursework', text: 'Data Structures & Algorithms', x: 85, y: 430 },
    { track: 'coursework', text: 'Systems Programming', x: 85, y: 320 },
    { track: 'coursework', text: 'Software Engineering', x: 95, y: 210 },
    { track: 'coursework', text: 'Advanced Programming Tools & Techniques', x: 150, y: 115 },
    { track: 'coursework', text: 'Linear Algebra', x: 270, y: 72 },
    { track: 'coursework', text: 'Calculus I–IV', x: 400, y: 60 },
    { track: 'coursework', text: 'Probability & Statistics', x: 530, y: 58 },
    { track: 'coursework', text: 'Discrete Mathematics', x: 655, y: 62 },
    { track: 'coursework', text: 'Cryptography', x: 775, y: 80 },
    { track: 'focus', label: 'Concentrations', text: 'Algorithms and Theory & Artificial Intelligence', x: 875, y: 150 },
    { track: 'focus', label: 'Minor', text: 'Econometrics and Data Analytics', x: 918, y: 265 },
    { track: 'honors', text: '1st place Deloitte x Lebow Datathon', x: 905, y: 380 },
    { track: 'honors', text: 'A.J. Drexel Scholarship', x: 835, y: 465 },
    { track: 'honors', text: "Dean's List", x: 700, y: 498 },
    { track: 'extracurricular', text: 'CS Theory Reading Group', x: 560, y: 505 },
    { track: 'extracurricular', text: 'The Drexel Society of Artificial Intelligence', x: 410, y: 502 },
    { track: 'extracurricular', text: 'Business Analytics Club', x: 255, y: 480 },
].map((s, i) => ({ ...s, id: i, n: i + 1 }));

// Smooth closed Catmull-Rom spline through the stop points → SVG path `d`.
const boardPath = (pts) => {
    const n = pts.length;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];
        d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6},`
            + ` ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6},`
            + ` ${p2.x} ${p2.y}`;
    }
    return d + ' Z';
};

const PATH_D = boardPath(STOPS);

const education = {
    school: 'Drexel University',
    honors: 'Pennoni Honors College',
    degree: 'B.S. Computer Science',
    graduation: '2028',
    location: 'Philadelphia, PA',
};

const Education = () => {
    const [hovered, setHovered] = useState(null);   // board tooltip
    const [selectedId, setSelectedId] = useState(null); // opens the side panel

    const selected = selectedId != null ? STOPS[selectedId] : null;
    const panelTrack = selected ? TRACKS[selected.track] : null;
    const panelItems = selected ? STOPS.filter((s) => s.track === selected.track) : [];

    return (
        <section id="education" className="py-12 px-6 relative">
            <div className="max-w-5xl mx-auto">
                <SectionHeader title="Education" />

                <motion.div
                    className="mt-12 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                >
                    {/* ---------- BOARD ---------- (click empty area closes the panel) */}
                    <div
                        className="relative w-full lg:flex-1 aspect-[25/14]"
                        onClick={() => setSelectedId(null)}
                    >
                        <svg viewBox="0 0 1000 560" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                            <path d={PATH_D} className="fill-none stroke-gray-200 dark:stroke-white/10" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
                            <path d={PATH_D} className="fill-none stroke-gray-400/60 dark:stroke-white/20" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="2 16" />
                        </svg>

                        {/* Center hub */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] min-w-[200px]">
                            <div className="glass-effect-strong rounded-2xl px-4 py-4 text-center flex flex-col items-center gap-1.5 ring-1 ring-electric-blue/20">
                                <h3 className="text-base md:text-xl font-display font-bold dark:text-off-white text-gray-900 leading-tight">
                                    {education.school}
                                </h3>
                                <p className="text-[11px] md:text-sm text-violet font-semibold -mt-0.5">
                                    {education.honors}
                                </p>
                                <p className="text-[10px] md:text-xs dark:text-cool-gray text-gray-600">
                                    {education.degree}
                                </p>
                                <p className="text-[9px] md:text-[11px] dark:text-off-white/70 text-gray-500 flex flex-wrap justify-center gap-x-2">
                                    <span>🎓 {education.graduation}</span>
                                    <span>📍 {education.location}</span>
                                </p>
                            </div>
                        </div>

                        {/* START marker */}
                        <span className="absolute font-display text-[10px] md:text-xs font-bold tracking-widest text-electric-blue/70"
                            style={{ left: '4%', top: '84%' }}>
                            START
                        </span>

                        {/* Spaces */}
                        {STOPS.map((s) => {
                            const track = TRACKS[s.track];
                            const emphasized = hovered === s.id || selectedId === s.id;
                            const below = s.y < 280;
                            const tx = s.x < 200 ? '-15%' : s.x > 800 ? '-85%' : '-50%';
                            return (
                                <div
                                    key={s.id}
                                    className="absolute"
                                    style={{ left: `${s.x / 10}%`, top: `${s.y / 5.6}%`, transform: 'translate(-50%,-50%)', zIndex: emphasized ? 30 : 10 }}
                                >
                                    <motion.button
                                        type="button"
                                        aria-label={`${s.label || track.label}: ${s.text}`}
                                        className="grid place-items-center rounded-full text-white font-display font-bold text-[10px] md:text-xs shadow-md ring-2 ring-white/70 dark:ring-white/20 focus:outline-none"
                                        style={{ backgroundColor: track.color, width: 'clamp(20px, 3.4vw, 34px)', height: 'clamp(20px, 3.4vw, 34px)' }}
                                        animate={{
                                            scale: emphasized ? 1.35 : 1,
                                            boxShadow: selectedId === s.id ? `0 0 0 5px ${track.color}55` : '0 0 0 0px rgba(0,0,0,0)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                        onHoverStart={() => setHovered(s.id)}
                                        onHoverEnd={() => setHovered(null)}
                                        onFocus={() => setHovered(s.id)}
                                        onBlur={() => setHovered(null)}
                                        onClick={(e) => { e.stopPropagation(); setSelectedId((p) => (p === s.id ? null : s.id)); }}
                                    >
                                        {s.n}
                                    </motion.button>

                                    {/* Hover peek */}
                                    <AnimatePresence>
                                        {hovered === s.id && selectedId == null && (
                                            <motion.div
                                                className="absolute glass-effect-strong rounded-lg px-3 py-2 shadow-xl pointer-events-none"
                                                style={{
                                                    left: tx === '-50%' ? '50%' : tx === '-15%' ? '0%' : '100%',
                                                    transform: `translateX(${tx})`,
                                                    [below ? 'top' : 'bottom']: 'calc(100% + 10px)',
                                                    width: 'max-content',
                                                    maxWidth: '200px',
                                                }}
                                                initial={{ opacity: 0, y: below ? -6 : 6, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: below ? -6 : 6, scale: 0.9 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <span className="block text-[9px] font-bold uppercase tracking-wider mb-0.5" style={{ color: track.color }}>
                                                    {s.label || track.label}
                                                </span>
                                                <span className="block text-xs dark:text-off-white text-gray-900 leading-snug">
                                                    {s.text}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* ---------- TRACK PANEL ---------- */}
                    <AnimatePresence>
                        {selected && (
                            <motion.div
                                key="panel"
                                className="glass-effect-strong rounded-xl py-5 w-[320px] lg:flex-shrink-0 overflow-hidden"
                                style={{ maxWidth: '100%' }}
                                initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                                animate={{
                                    opacity: 1, width: 320, paddingLeft: 20, paddingRight: 20,
                                    transition: {
                                        width: { duration: 0.4, ease: 'easeInOut' },
                                        paddingLeft: { duration: 0.4 }, paddingRight: { duration: 0.4 },
                                        opacity: { duration: 0.35, ease: 'easeOut', delay: 0.35 },
                                    },
                                }}
                                exit={{
                                    opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0,
                                    transition: {
                                        opacity: { duration: 0.35, ease: 'easeOut' },
                                        width: { duration: 0.4, ease: 'easeInOut', delay: 0.35 },
                                        paddingLeft: { duration: 0.4, delay: 0.35 },
                                        paddingRight: { duration: 0.4, delay: 0.35 },
                                    },
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: panelTrack.color }} />
                                        <h4 className="text-base font-display font-semibold dark:text-off-white text-gray-900">
                                            {panelTrack.label}
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        className="text-lg leading-none dark:text-off-white/50 text-gray-400 hover:opacity-70"
                                        onClick={() => setSelectedId(null)}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <ul className="space-y-1">
                                    {panelItems.map((s) => {
                                        const isOn = s.id === selectedId;
                                        return (
                                            <li
                                                key={s.id}
                                                onClick={() => setSelectedId(s.id)}
                                                className="flex items-start gap-2.5 rounded-md px-2 py-1.5 cursor-pointer transition-colors duration-150"
                                                style={{ backgroundColor: isOn ? `${panelTrack.color}22` : 'transparent' }}
                                            >
                                                <span className="grid place-items-center w-5 h-5 mt-px rounded-full text-white text-[10px] font-bold flex-shrink-0"
                                                    style={{ backgroundColor: panelTrack.color }}>
                                                    {s.n}
                                                </span>
                                                <span className="text-sm dark:text-off-white/90 text-gray-800 leading-snug">
                                                    {s.label && <span className="font-semibold dark:text-off-white text-gray-900">{s.label}: </span>}
                                                    {s.text}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {Object.values(TRACKS).map((t) => (
                        <span key={t.label} className="flex items-center gap-2 text-xs dark:text-off-white/80 text-gray-700">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                            {t.label}
                        </span>
                    ))}
                </div>
                <p className="mt-2 text-center text-[11px] dark:text-off-white/40 text-gray-400">
                    Click a space to open its track — click the board to close.
                </p>
            </div>
        </section>
    );
};

export default Education;

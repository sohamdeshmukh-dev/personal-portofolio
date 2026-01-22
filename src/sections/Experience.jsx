import React from 'react';
import SectionHeader from '../components/SectionHeader';
import AnimatedTimeline from '../components/AnimatedTimeline';
import sapLogo from '../assets/sap-logo.png';
import lockheedLogo from '../assets/lockheed-logo.png';
import lockheedLogoDark from '../assets/lockheed-logo-dark.png';

const Experience = () => {
    const experiences = [
        {
            date: 'Mar 2026 - Sep 2026',
            title: 'Software Developer Intern - MCC Backoffice Team',
            company: 'SAP America Inc.',
            location: 'Newton Square, PA',
            description: 'Incoming SAP STAR Program Intern',
            logo: sapLogo,
            achievements: [
                'Incoming SAP STAR Program Intern supporting the MCC Backoffice team in enterprise systems and internal tooling',
                'Will contribute to enterprise applications using SAP technologies including SAPUI5, JavaScript, and SQL'
            ]
        },
        {
            date: 'Jul 2023 - Aug 2023',
            title: 'Information Technology Intern - Rotary & Missions Systems',
            company: 'Lockheed Martin Global Inc.',
            location: 'King of Prussia, PA',
            description: 'Extended Operations & Rotary Missions Systems',
            logo: lockheedLogo,
            logoDark: lockheedLogoDark,
            achievements: [
                'Collaborated with 4+ team members to build a Unity-based virtual tour app for a helicopter plant in Stratford, CT',
                'Designed and developed a co-op portal for Drexel University, increasing operational efficiency by 25%',
                'Built immersive and interactive learning experiences using Unity for real-time virtual applications',
                'Supported project delivery using WordPress and Drupal CMS to manage content and user engagement',
                'Tracked team progress and sprint goals with Jira, accelerating delivery timelines by 2 weeks'
            ]
        }
    ];

    return (
        <section id="experience" className="py-20 px-6 bg-white/[0.01] relative">
            <div className="max-w-5xl mx-auto">
                <SectionHeader
                    title="Work Experience"
                    subtitle="Building production software at leading tech companies"
                />

                <AnimatedTimeline experiences={experiences} />
            </div>
        </section>
    );
};

export default Experience;

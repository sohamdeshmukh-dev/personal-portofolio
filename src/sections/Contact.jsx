import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';

const Contact = () => {
    const contactInfo = [
        {
            label: 'Email',
            value: 'ssd333@drexel.edu',
            href: 'mailto:ssd333@drexel.edu',
            icon: '✉️'
        },
        {
            label: 'Phone',
            value: '(484) 500-5972',
            href: 'tel:+14845005972',
            icon: '📱'
        },
        {
            label: 'LinkedIn',
            value: 'linkedin.com/in/sohamsdeshmukh',
            href: 'https://www.linkedin.com/in/sohamsdeshmukh/',
            icon: '💼'
        },
        {
            label: 'GitHub',
            value: 'github.com/sohamdeshmukh-dev',
            href: 'https://github.com/sohamdeshmukh-dev',
            icon: '💻'
        },
        {
            label: 'HackerRank',
            value: 'hackerrank.com/profile/soham_deshmukh_1',
            href: 'https://www.hackerrank.com/profile/soham_deshmukh_1',
            icon: '🏆'
        }
    ];

    return (
        <section id="contact" className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
                <SectionHeader
                    title="Get In Touch"
                    subtitle="Let's build something great together"
                />

                <motion.div
                    className="glass-effect-strong rounded-lg p-8 mt-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="dark:text-off-white text-gray-800 text-lg mb-8 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        I'm currently seeking opportunities in software engineering, AI/ML, and quantitative development.
                        Feel free to reach out!
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactInfo.map((contact, index) => (
                            <motion.a
                                key={index}
                                href={contact.href}
                                target={contact.href.startsWith('http') ? '_blank' : undefined}
                                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-4 p-4 dark:bg-white/5 bg-gray-100 border dark:border-white/10 border-gray-300 rounded-lg transition-all duration-200 hover:shadow-lg"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                                    borderColor: 'rgba(0, 212, 255, 0.3)',
                                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                                }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-3xl">{contact.icon}</span>
                                <div>
                                    <p className="dark:text-cool-gray text-gray-600 text-sm">{contact.label}</p>
                                    <p className="dark:text-off-white text-gray-900 font-medium">{contact.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="dark:text-cool-gray text-gray-600">
                        Based in Philadelphia, PA & Chester Springs, PA
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;

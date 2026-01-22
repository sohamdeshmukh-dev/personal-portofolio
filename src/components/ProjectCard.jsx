import React from 'react';

const ProjectCard = ({ title, date, description, achievements, techStack, githubUrl, demoUrl }) => {
    return (
        <div className="glass-effect rounded-lg p-6 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-off-white">{title}</h3>
                <span className="text-cool-gray text-sm whitespace-nowrap ml-4">{date}</span>
            </div>

            <p className="text-cool-gray mb-4">{description}</p>

            <ul className="space-y-2 mb-4 flex-1">
                {achievements.map((achievement, index) => (
                    <li key={index} className="text-off-white flex items-start text-sm">
                        <span className="text-electric-blue mr-2 flex-shrink-0">◦</span>
                        <span>{achievement}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-4">
                {techStack.map((tech, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium bg-electric-blue/10 text-electric-blue rounded-full border border-electric-blue/20"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex gap-3 mt-auto">
                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-soft-purple transition-colors duration-200 text-sm font-medium"
                    >
                        GitHub →
                    </a>
                )}
                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-soft-purple transition-colors duration-200 text-sm font-medium"
                    >
                        Live Demo →
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;

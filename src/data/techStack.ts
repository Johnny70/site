// Tech stack configuration
export interface TechItem {
    src: string;
    alt: string;
    title: string;
}

export interface TechCategory {
    title: string;
    items: TechItem[];
}

export const techStack: TechCategory[] = [
    {
        title: 'Språk och teknologier',
        items: [
            { src: '/images/tech/ts.png', alt: 'TypeScript', title: 'TypeScript' },
            { src: '/images/tech/js.png', alt: 'JavaScript', title: 'JavaScript' },
            { src: '/images/tech/html.png', alt: 'HTML', title: 'HTML' },
            { src: '/images/tech/css.png', alt: 'CSS', title: 'CSS' },
            { src: '/images/tech/json.png', alt: 'JSON', title: 'JSON' },
            { src: '/images/tech/sass.png', alt: 'SASS', title: 'SASS' },
            { src: '/images/tech/less.png', alt: 'LESS', title: 'LESS' },
            { src: '/images/tech/bash.png', alt: 'Bash', title: 'Bash' },
            { src: '/images/tech/sql.png', alt: 'SQL', title: 'SQL' },
            { src: '/images/tech/python.png', alt: 'Python', title: 'Python' },
            { src: '/images/tech/php.png', alt: 'PHP', title: 'PHP' },
        ],
    },
    {
        title: 'Verktyg och ramverk',
        items: [
            { src: '/images/tech/react.png', alt: 'React', title: 'React' },
            { src: '/images/tech/vite.png', alt: 'Vite', title: 'Vite' },
            { src: '/images/tech/apache.jpeg', alt: 'Apache', title: 'Apache' },
            { src: '/images/tech/git.png', alt: 'Git', title: 'Git' },
            { src: '/images/tech/cicd.png', alt: 'CI/CD', title: 'CI/CD' },
            { src: '/images/tech/open_ai.png', alt: 'OpenAI', title: 'OpenAI' },
            { src: '/images/tech/githubcopilot.png', alt: 'GitHub Copilot', title: 'GitHub Copilot' },
            { src: '/images/tech/claudeCode.png', alt: 'Claude Code', title: 'Claude Code' },
            { src: '/images/tech/bootstrap.png', alt: 'Bootstrap', title: 'Bootstrap' },
            { src: '/images/tech/vsc.jpeg', alt: 'VS Code', title: 'VS Code' },
            { src: '/images/tech/material.png', alt: 'Material UI', title: 'Material UI' },
            { src: '/images/tech/gulp.png', alt: 'Gulp', title: 'Gulp' },
            { src: '/images/tech/grunt.png', alt: 'Grunt', title: 'Grunt' },
            { src: '/images/tech/jenkins.png', alt: 'Jenkins', title: 'Jenkins' },
            { src: '/images/tech/sitevision.png', alt: 'Sitevision', title: 'Sitevision' },
            { src: '/images/tech/wordpress.png', alt: 'WordPress', title: 'WordPress' },
        ],
    },
    {
        title: 'Metodik och processer',
        items: [
            { src: '/images/tech/scrum.png', alt: 'Scrum', title: 'Scrum' },
            { src: '/images/tech/wcag.png', alt: 'WCAG', title: 'WCAG' },
            { src: '/images/tech/jira.png', alt: 'Jira', title: 'Jira' },
            { src: '/images/tech/trello.png', alt: 'Trello', title: 'Trello' },
        ],
    },
    {
        title: 'Operativsystem',
        items: [
            { src: '/images/tech/windows.png', alt: 'Windows', title: 'Windows' },
            { src: '/images/tech/osx.png', alt: 'OSX', title: 'OSX' },
            { src: '/images/tech/ubuntu.png', alt: 'Ubuntu', title: 'Ubuntu' },
        ],
    },
    {
        title: 'Design och prototyper',
        items: [
            { src: '/images/tech/figma.png', alt: 'Figma', title: 'Figma' },
            { src: '/images/tech/zeplin.png', alt: 'Zeplin', title: 'Zeplin' },
        ],
    },
];

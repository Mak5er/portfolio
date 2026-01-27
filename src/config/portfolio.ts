// Portfolio Configuration
export const portfolioConfig = {
  // Personal Information
  name: "",
  title: "",
  subtitle: "",
  bio: "",
  
  // Contact & Social
  contact: {
    email: "",
    github: "",
    telegram: "",
    twitter: "",
    instagram: "",
  },

  // Skills & Technologies | example: { name: "JavaScript", category: "frontend" }
  skills: [
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Figma", category: "tools" },
  ],

  // Projects Portfolio
  projects: [
    {
      id: 1,
      title: "Example Project",
      description: "Short summary of what this project does and why it matters.",
      technologies: ["React", "TypeScript", "Vite"],
      status: "Active",
      github: "https://github.com/username/project",
      demo: "https://example.com",
      image: "https://via.placeholder.com/1200x800.png?text=Project+Preview",
      featured: false,
    },
  ],

  // GitHub Stats
  githubStats: {
    enabled: false,
    user: "username",
    repo: "username/repo",
    title: "GitHub Stats",
    useTotalStars: false,
  },
  contributionsTechStack: {
    enabled: false,
    title: "Tech Stack",
    source: "github",
    user: "username",
    limit: 8,
    items: [],
  },

  // Contributor Roles & Organizations
  contributionsSection: {
    enabled: false,
    contributorsEnabled: false,
    contributorsTitle: "Contributors",
    contributors: [
      { github: "https://github.com/username", role: "Developer" },
    ],
  },
  contributions: [
    {
      id: 1,
      organization: "Example Org",
      position: "Contributor",
      summary: "Brief description of your role and impact in the organization.",
      projects: [
        { name: "Project One", link: "https://github.com/org/project-one", status: "Active" },
        { name: "Project Two", link: "https://github.com/org/project-two", status: "In Development" },
      ],
    },
  ],

  // Experience Timeline
  experience: [
    {
      year: "2024 - Present",
      title: "Frontend Developer",
      company: "Freelance",
      description: "Building responsive web apps and design systems for clients.",
    },
    {
      year: "2022 - 2024",
      title: "Junior Developer",
      company: "Startup Name",
      description: "Worked on UI features, performance, and accessibility improvements.",
    },
  ],
};

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';

const Projects = () => {
  const statusClassMap: Record<string, string> = {
    active: 'text-green-400',
    'in development': 'text-orange-400',
    developing: 'text-orange-400',
    paused: 'text-yellow-400',
    'on hold': 'text-yellow-400',
    archived: 'text-gray-400',
  };

  const getStatusClass = (status?: string) => {
    if (!status) return 'text-text-secondary/70';
    const key = status.toLowerCase();
    return statusClassMap[key] ?? 'text-text-secondary/70';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent-blue font-mono text-lg md:text-xl">02.</span>{' '}
            <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              Things I've Built
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {portfolioConfig.projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="bg-secondary border border-border rounded-lg overflow-hidden group hover:border-accent-blue flex flex-col"
            >
              <div className="relative overflow-hidden h-52 sm:h-64">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                {project.featured && (
                  <span className="inline-block px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs font-mono rounded-full mb-3">
                    FEATURED
                  </span>
                )}

                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wide ${getStatusClass(
                        project.status,
                      )}`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto w-full">
                  <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((tech: string) => (
                      <li
                        key={tech}
                        className="px-3 py-1 bg-background text-text-secondary text-sm font-mono rounded border border-border"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                    >
                      <Github size={20} />
                      <span className="text-sm font-mono">Code</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors duration-300"
                      >
                        <ExternalLink size={20} />
                        <span className="text-sm font-mono">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

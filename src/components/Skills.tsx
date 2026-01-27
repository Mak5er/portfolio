import { motion } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio';
import { useInView } from '@/hooks/useInView';

const Skills = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const categories = [
    { name: 'Frontend', key: 'frontend' as const, color: 'accent-blue' },
    { name: 'Backend', key: 'backend' as const, color: 'accent-purple' },
    { name: 'Database', key: 'database' as const, color: 'accent-green' },
    { name: 'Tools', key: 'tools' as const, color: 'accent-blue' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent-blue font-mono text-lg md:text-xl">01.</span>{' '}
            <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => {
            const skills = portfolioConfig.skills.filter(
              (skill) => skill && skill.category === category.key
            );

            return (
              <motion.div
                key={category.key}
                variants={itemVariants}
                className="bg-secondary border border-border rounded-lg p-6 hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10"
              >
                <h3 className="text-xl font-bold mb-6 text-accent-blue font-mono">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill) => skill && (
                    <motion.div
                      key={skill.name}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-accent-blue rounded-full" />
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

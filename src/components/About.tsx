import { motion } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio';
import { useInView } from '@/hooks/useInView';

const About = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-accent-blue font-mono text-lg md:text-xl">04.</span>{' '}
            <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-green" />

          <div className="space-y-12">
            {portfolioConfig.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1" />

                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent-blue rounded-full border-4 border-background transform -translate-x-1.5 md:-translate-x-2 z-10" />

                <div className="flex-1 ml-8 md:ml-0">
                  <div className="bg-secondary border border-border rounded-lg p-6 hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/10">
                    <span className="text-accent-blue font-mono text-sm">
                      {exp.year}
                    </span>
                    <h3 className="text-2xl font-bold mt-2 mb-1 text-text-primary">
                      {exp.title}
                    </h3>
                    <h4 className="text-lg text-accent-purple mb-4 font-medium">
                      {exp.company}
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

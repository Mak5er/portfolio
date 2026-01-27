import { motion } from 'framer-motion';
import { Github, Send, Twitter, Instagram } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';
import { useViewport } from '@/hooks/useViewport';

const Hero = () => {
  const { isMobile } = useViewport();
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Статичні соцмережі
  const socialLinks = [
    { icon: Github, href: portfolioConfig.contact.github, label: 'GitHub' },
    { icon: Send, href: portfolioConfig.contact.telegram, label: 'Telegram' },
    { icon: Twitter, href: portfolioConfig.contact.twitter, label: 'Twitter' },
    { icon: Instagram, href: portfolioConfig.contact.instagram, label: 'Instagram' },
  ];

  return (
    <section className="min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center px-6 py-20 relative">
      <motion.div
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-accent-blue font-mono text-sm md:text-base">
            Hi, my name is
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-text-primary via-accent-blue to-accent-purple bg-clip-text text-transparent"
        >
          {portfolioConfig.name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-text-secondary mb-6"
        >
          {portfolioConfig.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-text-secondary mb-4 max-w-2xl"
        >
          {portfolioConfig.subtitle}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-text-secondary mb-12 max-w-2xl leading-relaxed"
        >
          {portfolioConfig.bio}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-12"
        >
          <a
            href="#projects"
            onClick={(e) => handleAnchorClick(e, '#projects')}
            className="w-full sm:w-auto text-center px-8 py-3 bg-accent-blue text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/50"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="w-full sm:w-auto text-center px-8 py-3 border-2 border-accent-blue text-accent-blue font-medium rounded-lg hover:bg-accent-blue hover:text-white transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </motion.div>
        {/* Статичний список мов програмування */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-blue transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label={social.label}
            >
              <social.icon size={28} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {!isMobile && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <div className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-text-secondary rounded-full" />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;

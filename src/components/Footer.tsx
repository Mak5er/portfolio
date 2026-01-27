import { Github, Send, Twitter, Heart } from 'lucide-react';
import { portfolioConfig } from '@/config/portfolio';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: portfolioConfig.contact.github, label: 'GitHub' },
    { icon: Send, href: portfolioConfig.contact.telegram, label: 'Telegram' },
    { icon: Twitter, href: portfolioConfig.contact.twitter, label: 'Twitter' },
  ];

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-blue transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-text-secondary text-sm font-mono flex items-center gap-2 justify-center">
              Built with <Heart size={16} className="text-accent-blue fill-accent-blue" /> by{' merybist '}
              <span className="text-accent-blue">{portfolioConfig.name}</span>
            </p>
            <p className="text-text-secondary text-xs mt-2">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

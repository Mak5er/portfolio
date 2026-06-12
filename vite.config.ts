import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';
import { seoPlugin } from './plugins/seo-plugin';
import { profile, contact, projects, skills, github as ghCfg } from './src/data/content';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://www.mak5er.com').replace(/\/+$/, '');
  const locale = env.VITE_SITE_LOCALE || 'en';
  const ogRaw = env.VITE_OG_IMAGE || '/og.svg';
  const ogImage = ogRaw.startsWith('http')
    ? ogRaw
    : `${siteUrl}${ogRaw.startsWith('/') ? '' : '/'}${ogRaw}`;

  const sections = ['about', 'skills', 'projects', 'experience', 'contributions', 'rig', 'contact'];

  const title = `${profile.handle} — ${profile.title.toLowerCase()}`;
  const description =
    `${profile.handle} — ${profile.title.toLowerCase()}. ${profile.tagline} ${profile.bio}`
      .replace(/\s+/g, ' ')
      .trim();
  const keywords = [
    'mak5er',
    'n1xt0',
    'maks reva',
    'full-stack developer',
    'react developer',
    'typescript developer',
    'python developer',
    'telegram bot developer',
    'aiogram',
    'docker',
    'fastapi',
    'portfolio',
    'ukraine developer',
    ...skills.map((s) => s.name.toLowerCase()),
  ];

  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const orgId = `${siteUrl}/#z0team`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl + '/',
        name: profile.handle,
        description,
        inLanguage: locale,
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profile`,
        url: siteUrl + '/',
        name: `${profile.handle} portfolio`,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        inLanguage: locale,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        alternateName: [profile.handle, profile.altHandle],
        url: siteUrl + '/',
        image: ogImage,
        jobTitle: profile.title,
        description: profile.bio,
        email: `mailto:${contact.email}`,
        sameAs: [
          contact.github,
          contact.telegram,
          contact.twitter,
          contact.instagram,
          contact.linkedin,
        ].filter(Boolean),
        knowsAbout: skills.map((s) => s.name),
        knowsLanguage: ['Ukrainian', 'English'],
        address: { '@type': 'PostalAddress', addressCountry: profile.location },
        memberOf: { '@id': orgId },
      },
      {
        '@type': 'Organization',
        '@id': orgId,
        name: 'z0team',
        url: 'https://github.com/z0team',
        member: { '@id': personId },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: siteUrl + '/#projects' },
          { '@type': 'ListItem', position: 3, name: 'Contact', item: siteUrl + '/#contact' },
        ],
      },
      ...projects.map((p) => ({
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#project-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: p.title,
        description: p.description,
        url: p.demo || p.github || siteUrl + '/#projects',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Cross-platform',
        author: { '@id': personId },
        keywords: p.technologies.join(', '),
        codeRepository: p.github,
      })),
    ],
  };

  // touch ghCfg so unused-import doesn't trip if config grows later
  void ghCfg;

  return {
    plugins: [
      react(),
      seoPlugin({
        siteUrl,
        locale,
        sections,
        description,
        title,
        ogImage,
        themeColor: '#0a0a0a',
        twitter: '@mak5er',
        keywords,
        jsonLd,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.svg', 'robots.txt', 'og.svg'],
        manifest: {
          name: profile.handle,
          short_name: profile.handle,
          description: description,
          theme_color: '#0a0a0a',
          background_color: '#0a0a0a',
          icons: [
            {
              src: 'favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      allowedHosts: true,
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});

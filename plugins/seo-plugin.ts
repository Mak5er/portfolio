import type { Plugin } from 'vite';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type Options = {
  siteUrl: string;
  locale: string;
  sections: string[];
  description: string;
  title: string;
  ogImage: string;
  themeColor: string;
  twitter: string;
  jsonLd: unknown;
  keywords: string[];
};

export function seoPlugin(opts: Options): Plugin {
  const {
    siteUrl,
    locale,
    sections,
    description,
    title,
    ogImage,
    themeColor,
    twitter,
    jsonLd,
    keywords,
  } = opts;

  return {
    name: 'site-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
        const replacements: Record<string, string> = {
          '%SITE_URL%': siteUrl,
          '%SITE_LOCALE%': locale,
          '%SITE_DESCRIPTION%': description,
          '%SITE_TITLE%': title,
          '%OG_IMAGE%': ogImage,
          '%THEME_COLOR%': themeColor,
          '%TWITTER%': twitter,
          '%KEYWORDS%': keywords.join(', '),
          '%JSON_LD%': json,
        };
        let out = html;
        for (const [k, v] of Object.entries(replacements)) {
          out = out.split(k).join(v);
        }
        out = out.replace('<html lang="en">', `<html lang="${locale}">`);
        return out;
      },
    },
    async closeBundle() {
      const outDir = resolve(process.cwd(), 'dist');
      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = [
        { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
        ...sections.map((id) => ({
          loc: `${siteUrl}/#${id}`,
          priority: '0.7',
          changefreq: 'monthly',
        })),
      ];
      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        urls
          .map(
            (u) =>
              `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
          )
          .join('\n') +
        '\n</urlset>\n';

      const robots = [
        'User-agent: *',
        'Allow: /',
        '',
        '# Avoid wasting crawl budget on api responses',
        'Disallow: /api/',
        '',
        `Sitemap: ${siteUrl}/sitemap.xml`,
        '',
      ].join('\n');

      await writeFile(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');
      await writeFile(resolve(outDir, 'robots.txt'), robots, 'utf8');
    },
  };
}

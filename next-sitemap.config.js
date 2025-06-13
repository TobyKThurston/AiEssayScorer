/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,   // uses your env var
    generateRobotsTxt: true,                     // creates robots.txt
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
  };
  
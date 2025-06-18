/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // uses env-var if present, otherwise defaults to prod domain
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://getivyadmit.com',
  
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
  };
  
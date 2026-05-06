// generate-sitemap.js
// Run with:  npm run sitemap
// Reads review IDs from data.jsx and writes sitemap.xml automatically.

const fs   = require('fs');
const path = require('path');

const BASE_URL = 'https://junioralcineu.github.io/dantsbook';

// ── Read review IDs directly from data.jsx ────────────────────────
// Every time you add a new review to the REVIEWS array in data.jsx,
// this script picks it up automatically — no manual editing needed.
function getReviewIds() {
  const src = fs.readFileSync(path.join(__dirname, 'data.jsx'), 'utf8');

  // Isolate only the REVIEWS block to avoid false matches
  const start = src.indexOf('const REVIEWS = [');
  if (start === -1) {
    console.warn('⚠  REVIEWS array not found in data.jsx');
    return [];
  }
  const block = src.slice(start, src.indexOf('];', start) + 2);

  // Extract every  id: "..."  value inside that block
  const ids  = [];
  const re   = /\bid:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(block)) !== null) ids.push(m[1]);
  return ids;
}

// ── Static pages ──────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: '/',              changefreq: 'weekly',  priority: '1.0' },
  { loc: '/Articles.html', changefreq: 'weekly',  priority: '0.7' },
  { loc: '/Opinions.html', changefreq: 'monthly', priority: '0.6' },
  { loc: '/Preview.html',  changefreq: 'monthly', priority: '0.6' },
  { loc: '/Reading.html',  changefreq: 'monthly', priority: '0.5' },
];

// ── Review pages (generated from data.jsx) ────────────────────────
const reviewPages = getReviewIds().map(id => ({
  loc:        `/Review.html#${id}`,
  changefreq: 'monthly',
  priority:   '0.8',
}));

const allPages = [...staticPages, ...reviewPages];

// ── Build XML ─────────────────────────────────────────────────────
const urlTags = allPages
  .map(p => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`)
  .join('\n');

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>
`;

// ── Write file ────────────────────────────────────────────────────
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');

console.log(`\n✓  sitemap.xml generated — ${allPages.length} URLs\n`);
allPages.forEach(p =>
  console.log(`   [${p.priority}]  ${BASE_URL}${p.loc}`)
);
console.log('');

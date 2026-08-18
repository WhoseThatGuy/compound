#!/usr/bin/env node
// Injects partials/nav.html and partials/footer.html into every page's
// <!-- NAV --> ... <!-- /NAV --> and <!-- FOOTER --> ... <!-- /FOOTER --> markers,
// marking the current page's nav link with aria-current="page".
//
// Run after editing partials/nav.html or partials/footer.html:
//   node build.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const navTemplate = fs.readFileSync(path.join(ROOT, 'partials/nav.html'), 'utf8').trim();
const footerTemplate = fs.readFileSync(path.join(ROOT, 'partials/footer.html'), 'utf8').trim();

function navFor(slug) {
  const re = new RegExp(`(<a\\s+href="[^"]*"\\s+data-page="${slug}")>`);
  return navTemplate.replace(re, `$1 aria-current="page">`);
}

const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

let changed = 0;
for (const file of pages) {
  const slug = file.replace(/\.html$/, '');
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const before = content;
  content = content.replace(
    /<!-- NAV -->[\s\S]*?<!-- \/NAV -->/,
    `<!-- NAV -->\n${navFor(slug)}\n<!-- /NAV -->`
  );
  content = content.replace(
    /<!-- FOOTER -->[\s\S]*?<!-- \/FOOTER -->/,
    `<!-- FOOTER -->\n${footerTemplate}\n<!-- /FOOTER -->`
  );

  if (content !== before) {
    fs.writeFileSync(filePath, content);
    changed++;
    console.log('updated', file);
  }
}

console.log(`Done. ${changed}/${pages.length} page(s) updated.`);

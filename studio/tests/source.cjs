const fs = require('node:fs'), path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const source = [...html.matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/gi)]
  .map(m => fs.readFileSync(path.join(__dirname, '..', m[1]), 'utf8')).join('\n');
module.exports = { html, source };

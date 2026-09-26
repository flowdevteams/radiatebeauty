const fs = require('fs');

const page = fs.readFileSync('app/page.tsx', 'utf8');
const lines = page.split('\n');

console.log('=== SECTIONS IN PAGE.TSX ===');
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('<footer') || l.includes('id="')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});

const fs = require('fs');

const page = fs.readFileSync('app/page.tsx', 'utf8');

const sections = [
  { name: 'HERO', start: 532, end: 724 },
  { name: 'SHOP (SERIES)', start: 725, end: 757 },
  { name: 'STORY', start: 758, end: 809 },
  { name: 'GUIDE', start: 810, end: 858 },
  { name: 'JOURNAL', start: 859, end: 886 },
  { name: 'REVIEWS', start: 887, end: 921 },
  { name: 'FAQ', start: 922, end: 968 },
  { name: 'FOOTER', start: 969, end: 1045 },
  { name: 'MODALS', start: 1046, end: 1250 }
];

const lines = page.split('\n');

sections.forEach(s => {
  console.log(`\n=================== ${s.name} (Lines ${s.start}-${s.end}) ===================`);
  for (let i = s.start - 1; i < s.end && i < lines.length; i++) {
    const l = lines[i];
    if (l.includes('className=') || l.includes('<h') || l.includes('<button') || l.includes('<div') || l.includes('<p') || l.includes('<section')) {
      console.log(`${i+1}: ${l.trim().slice(0, 100)}`);
    }
  }
});

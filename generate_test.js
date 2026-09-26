const path = require('path');
const sharp = require(path.join(__dirname, 'node_modules/sharp'));

const testSvg = `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="#241b12" rx="12"/>
  <text x="200" y="105" fill="#f5f0e7" font-family="Arial, sans-serif" font-size="20" text-anchor="middle" font-weight="bold">Radiate Beauty Flowchart Test</text>
</svg>`;

sharp(Buffer.from(testSvg))
  .png()
  .toFile(path.join(__dirname, 'test_flowchart.png'))
  .then((info) => {
    console.log('PNG generated successfully:', info);
  })
  .catch((err) => {
    console.error('Error generating PNG:', err);
  });

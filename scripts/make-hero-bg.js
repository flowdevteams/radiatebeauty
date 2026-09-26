const sharp = require('sharp');
const path = require('path');

async function createBrandedBg() {
  const logoResized = await sharp(path.join(__dirname, '../public/logo-radiate-beauty.png'))
    .resize(76)
    .toBuffer();

  const svgText = Buffer.from(`
    <svg width="1376" height="768" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <style>
        .gold-text {
          fill: #f5edd8;
          fill-opacity: 0.95;
          font-family: Georgia, 'Times New Roman', serif;
          text-anchor: middle;
          letter-spacing: 2px;
          filter: url(#glow);
        }
        .cleaner {
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 2.2px;
        }
        .sub {
          font-size: 6.5px;
          letter-spacing: 1.5px;
          font-weight: 500;
          opacity: 0.85;
        }
        .vol {
          font-size: 6.5px;
          letter-spacing: 1.2px;
          font-weight: 500;
          opacity: 0.8;
        }
      </style>
      <text x="968" y="556" class="gold-text cleaner">GENTLE CLEANSER</text>
      <text x="968" y="574" class="gold-text sub">FOR ALL SKIN TYPE</text>
      <text x="968" y="644" class="gold-text vol">100 ml</text>
    </svg>
  `);

  await sharp(path.join(__dirname, '../public/hero-original.jpg'))
    .composite([
      { input: logoResized, left: 930, top: 410 },
      { input: svgText, left: 0, top: 0 }
    ])
    .jpeg({ quality: 96 })
    .toFile(path.join(__dirname, '../public/hero-bg-luxury.jpg'));

  console.log('Successfully created hero-bg-luxury.jpg');
}

createBrandedBg().catch(console.error);

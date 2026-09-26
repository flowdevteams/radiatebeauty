const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// Design the authentic Radiate Beauty emblem
// Features: Luxury obsidian rounded container, inner gold rim, 
// authentic high-contrast serif monogram "R" + radiant 4-point star (✦)
const svgContent = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c140c" />
      <stop offset="50%" stop-color="#140e08" />
      <stop offset="100%" stop-color="#0a0603" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff6db" />
      <stop offset="30%" stop-color="#eed69f" />
      <stop offset="70%" stop-color="#d4af62" />
      <stop offset="100%" stop-color="#a47d33" />
    </linearGradient>
    <radialGradient id="centerAura" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#eed69f" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#eed69f" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#eed69f" stop-opacity="0" />
    </radialGradient>
    <filter id="goldShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Luxury Obsidian Rounded Squircle Container -->
  <rect width="180" height="180" rx="42" fill="url(#bgGrad)" />
  <rect width="180" height="180" rx="42" fill="url(#centerAura)" />
  <rect x="3" y="3" width="174" height="174" rx="39" stroke="url(#goldGrad)" stroke-opacity="0.45" stroke-width="1.5" />

  <!-- Iconic Monogram "R" (Radiate Beauty) -->
  <g fill="url(#goldGrad)" filter="url(#goldShadow)">
    <!-- Vertical Spine / Stem -->
    <path d="M 52 42 L 86 42 L 86 51 L 73 51 L 73 129 L 88 129 L 88 138 L 50 138 L 50 129 L 65 129 L 65 51 L 52 51 Z" />

    <!-- Upper Serif Bowl -->
    <path fill-rule="evenodd" clip-rule="evenodd" d="M 73 42 C 98 42 120 46 120 74 C 120 98 100 106 78 106 L 73 106 Z M 73 51 L 79 51 C 94 51 110 54 110 74 C 110 93 94 97 79 97 L 73 97 Z" />

    <!-- Tapering & Sweeping Tail -->
    <path d="M 83 98 L 112 138 L 132 138 C 126 132 122 125 116 117 L 95 91 C 103 89 110 84 113 78 L 101 77 C 95 87 88 94 83 98 Z" />
  </g>

  <!-- Luminous 4-Point Radiance Diamond Star (✦) -->
  <g filter="url(#goldShadow)">
    <path d="M 134 38 Q 134 53 149 53 Q 134 53 134 68 Q 134 53 119 53 Q 134 53 134 38 Z" fill="#fffdf5" />
    <circle cx="134" cy="53" r="2.2" fill="#eed69f" />
  </g>

  <!-- Subtle Micro Star at Lower Left Corner -->
  <path d="M 44 142 Q 44 148 50 148 Q 44 148 44 154 Q 44 148 38 148 Q 44 148 44 142 Z" fill="#eed69f" opacity="0.65" />
</svg>`;

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'app');

  // 1. Write public/icon.svg and app/icon.svg
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  console.log('Saved icon.svg in public and app');

  const svgBuf = Buffer.from(svgContent);

  // 2. Generate icon-light-32x32.png (32x32)
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(publicDir, 'icon-light-32x32.png'));
  console.log('Saved icon-light-32x32.png');

  // 3. Generate icon-dark-32x32.png (32x32)
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(publicDir, 'icon-dark-32x32.png'));
  console.log('Saved icon-dark-32x32.png');

  // 4. Generate apple-icon.png (180x180)
  await sharp(svgBuf).resize(180, 180).png().toFile(path.join(publicDir, 'apple-icon.png'));
  await sharp(svgBuf).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));
  console.log('Saved apple-icon.png');

  // 5. Generate favicon.ico (32x32 standard ico container/png)
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(appDir, 'favicon.ico'));
  await sharp(svgBuf).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Saved favicon.ico');

  // 6. Generate high-res preview
  await sharp(svgBuf).resize(360, 360).png().toFile(path.join(publicDir, 'radiate-beauty-icon-preview.png'));
  console.log('Saved radiate-beauty-icon-preview.png');
}

main().catch(console.error);

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// SVG favicon design: manga speech bubble + magnifying glass on dark purple gradient
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2d1b69"/>
      <stop offset="100%" style="stop-color:#1a1a2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a78bfa"/>
      <stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>

  <!-- Manga speech bubble -->
  <path d="M120 140 C120 110, 150 80, 180 80 L332 80 C362 80, 392 110, 392 140 L392 260 C392 290, 362 320, 332 320 L260 320 L220 370 L210 320 L180 320 C150 320, 120 290, 120 260 Z"
        fill="none" stroke="url(#accent)" stroke-width="20" stroke-linejoin="round"/>

  <!-- Magnifying glass inside bubble -->
  <circle cx="240" cy="190" r="55" fill="none" stroke="#e2e8f0" stroke-width="16"/>
  <line x1="278" y1="228" x2="320" y2="275" stroke="#e2e8f0" stroke-width="16" stroke-linecap="round"/>

  <!-- Small sparkle/star effect (insight) -->
  <circle cx="340" cy="120" r="6" fill="#fbbf24"/>
  <circle cx="365" cy="145" r="4" fill="#fbbf24" opacity="0.7"/>
  <circle cx="355" cy="105" r="3" fill="#fbbf24" opacity="0.5"/>

  <!-- Bottom text: 考察 -->
  <text x="256" y="440" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="72" fill="#a78bfa">考察</text>
</svg>
`;

// Generate various sizes
async function generate() {
  const svgBuffer = Buffer.from(svgIcon);

  // favicon.ico (32x32)
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  // favicon-16x16.png
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  // favicon-32x32.png
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  // apple-touch-icon.png (180x180)
  const apple = await sharp(svgBuffer).resize(180, 180).png().toBuffer();

  // android-chrome (192x192 and 512x512)
  const android192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const android512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Save SVG
  writeFileSync(join(ROOT, 'public', 'favicon.svg'), svgIcon.trim());

  // Save PNGs
  writeFileSync(join(ROOT, 'public', 'favicon-16x16.png'), png16);
  writeFileSync(join(ROOT, 'public', 'favicon-32x32.png'), png32);
  writeFileSync(join(ROOT, 'public', 'apple-touch-icon.png'), apple);
  writeFileSync(join(ROOT, 'public', 'android-chrome-192x192.png'), android192);
  writeFileSync(join(ROOT, 'public', 'android-chrome-512x512.png'), android512);

  // For favicon.ico, use sharp to create a 32x32 PNG and rename
  // (browsers accept PNG data in .ico containers, but for true ICO we use ImageMagick)
  writeFileSync(join(ROOT, 'public', 'favicon.ico'), png32);

  // Also overwrite the one in src/app/ (Next.js default location)
  writeFileSync(join(ROOT, 'src', 'app', 'favicon.ico'), png32);

  console.log('✅ Favicon files generated:');
  console.log('  - public/favicon.svg');
  console.log('  - public/favicon.ico');
  console.log('  - public/favicon-16x16.png');
  console.log('  - public/favicon-32x32.png');
  console.log('  - public/apple-touch-icon.png');
  console.log('  - public/android-chrome-192x192.png');
  console.log('  - public/android-chrome-512x512.png');
  console.log('  - src/app/favicon.ico');
}

generate().catch(console.error);

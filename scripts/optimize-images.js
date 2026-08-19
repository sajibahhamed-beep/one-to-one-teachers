const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  
  const filesToProcess = [
    {
      src: path.join(publicDir, 'hero', 'hero-teacher.png'),
      webp: path.join(publicDir, 'hero', 'hero-teacher.webp'),
      pngOpt: path.join(publicDir, 'hero', 'hero-teacher.png'),
      maxWidth: 1600,
      quality: 90,
    },
    {
      src: path.join(publicDir, 'hero', 'hero-student-boy.png'),
      webp: path.join(publicDir, 'hero', 'hero-student-boy.webp'),
      pngOpt: path.join(publicDir, 'hero', 'hero-student-boy.png'),
      maxWidth: 1600,
      quality: 90,
    },
    {
      src: path.join(publicDir, 'hero', 'hero-student-girl.png'),
      webp: path.join(publicDir, 'hero', 'hero-student-girl.webp'),
      pngOpt: path.join(publicDir, 'hero', 'hero-student-girl.png'),
      maxWidth: 1600,
      quality: 90,
    },
    {
      src: path.join(publicDir, 'images', 'online-teaching-meeting.png'),
      webp: path.join(publicDir, 'images', 'online-teaching-meeting.webp'),
      pngOpt: path.join(publicDir, 'images', 'online-teaching-meeting.png'),
      maxWidth: 1600,
      quality: 90,
    },
    {
      src: path.join(publicDir, 'logo.png'),
      webp: path.join(publicDir, 'logo.webp'),
      pngOpt: path.join(publicDir, 'logo.png'),
      maxWidth: 800,
      quality: 92,
    },
  ];

  console.log('--- Starting Image Optimization with Sharp ---');

  for (const item of filesToProcess) {
    if (!fs.existsSync(item.src)) {
      console.log(`File not found: ${item.src}`);
      continue;
    }

    const originalStats = fs.statSync(item.src);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`\nProcessing: ${path.basename(item.src)} (Original: ${originalSizeMB} MB)`);

    const image = sharp(item.src);
    const metadata = await image.metadata();
    console.log(`  Dimensions: ${metadata.width}x${metadata.height}, Format: ${metadata.format}`);

    // Generate WebP buffer
    let webpPipeline = sharp(item.src);
    if (metadata.width && metadata.width > item.maxWidth) {
      webpPipeline = webpPipeline.resize({ width: item.maxWidth, withoutEnlargement: true });
    }
    const webpBuffer = await webpPipeline
      .webp({ quality: item.quality, effort: 6 })
      .toBuffer();

    fs.writeFileSync(item.webp, webpBuffer);
    const webpSizeKB = (webpBuffer.length / 1024).toFixed(1);
    console.log(`  -> Saved WebP: ${path.basename(item.webp)} (${webpSizeKB} KB)`);

    // Generate optimized PNG buffer to replace heavy original PNG
    let pngPipeline = sharp(item.src);
    if (metadata.width && metadata.width > item.maxWidth) {
      pngPipeline = pngPipeline.resize({ width: item.maxWidth, withoutEnlargement: true });
    }
    const pngBuffer = await pngPipeline
      .png({ compressionLevel: 9, effort: 7 })
      .toBuffer();

    fs.writeFileSync(item.pngOpt, pngBuffer);
    const pngSizeKB = (pngBuffer.length / 1024).toFixed(1);
    console.log(`  -> Overwrote PNG: ${path.basename(item.pngOpt)} (${pngSizeKB} KB)`);
  }

  console.log('\n--- Image Optimization Complete ---');
}

optimizeImages().catch(err => {
  console.error('Optimization error:', err);
  process.exit(1);
});

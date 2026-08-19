const https = require('https');
const fs = require('fs');
const path = require('path');

const token = process.env.FIGMA_TOKEN || '';
const fileKey = process.env.FIGMA_FILE_KEY || 'ktmQisyFGCMNAYuaWMSPco';
const ids = '62:2,62:3,62:4';

const destDir = path.resolve(__dirname, '..', 'public', 'hero');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Fetching images from Figma...');
  const res = await fetchJson(
    `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=png&scale=2`,
    { 'X-Figma-Token': token }
  );

  console.log('Figma Response:', res);
  if (!res.images) {
    console.error('No images returned:', res);
    return;
  }

  const mapping = {
    '62:2': 'hero-teacher.png',
    '62:3': 'hero-student-boy.png',
    '62:4': 'hero-student-girl.png'
  };

  for (const [id, url] of Object.entries(res.images)) {
    if (url) {
      const filename = mapping[id] || `hero-${id.replace(':', '_')}.png`;
      const targetPath = path.join(destDir, filename);
      console.log(`Downloading ${filename} from ${url}...`);
      await downloadFile(url, targetPath);
    }
  }

  console.log('All hero images successfully downloaded!');
}

main().catch(console.error);

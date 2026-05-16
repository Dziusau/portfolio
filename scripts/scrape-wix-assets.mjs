import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapping = JSON.parse(
  await fs.readFile(path.join(__dirname, 'wix-assets.json'), 'utf8')
);
const publicDir = path.join(__dirname, '..', 'public');

let ok = 0;
let skip = 0;

for (const [destRel, url] of Object.entries(mapping)) {
  const destAbs = path.join(publicDir, destRel);
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`SKIP ${destRel} — ${res.status}`);
      skip++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(destAbs, buf);
    console.log(`OK   ${destRel} (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (err) {
    console.warn(`FAIL ${destRel} — ${err.message}`);
    skip++;
  }
}

console.log(`\nDone. ${ok} downloaded, ${skip} skipped.`);

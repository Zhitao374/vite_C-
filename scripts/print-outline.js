import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src/data');

const args = process.argv.slice(2);
const lessonFile = args[0] || 'lesson-02.js';

async function main() {
  const fullPath = path.join(DATA_DIR, lessonFile);
  const url = pathToFileURL(fullPath).href;
  const mod = await import(url);
  const lesson = mod.default;

  console.log(`\n=== ${lesson.title} (${lesson.slides.length} 页) ===\n`);
  
  lesson.slides.forEach(s => {
    let extraInfo = '';
    if (s.type === 'transition' && s.data?.note) extraInfo = ` [note: ${s.data.note.slice(0, 15)}...]`;
    
    console.log(`第 ${String(s.id).padStart(2, '0')} 页 | ${s.type.padEnd(12)} | ${s.title} ${extraInfo}`);
  });
  console.log('');
}

main();
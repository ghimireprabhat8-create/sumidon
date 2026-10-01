// Copy only public website assets for static hosting.
const fs = require('node:fs');
const path = require('node:path');
const dest = path.join(__dirname, 'dist');
fs.mkdirSync(dest, { recursive: true });
for (const file of ['index.html', 'styles.css', 'config.js', 'script.js']) {
  fs.copyFileSync(path.join(__dirname, file), path.join(dest, file));
}
fs.cpSync(path.join(__dirname, 'assets'), path.join(dest, 'assets'), { recursive: true });
console.log('Website ready in dist/');

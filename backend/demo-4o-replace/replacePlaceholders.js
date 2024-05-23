const fs = require('fs');
const path = require('path');

const appName = process.argv[2];

if (!appName) {
  console.error('Please provide an app name as a command line argument.');
  process.exit(1);
}

const files = ['menu.html', 'upload.html', 'download.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, 'public', file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/{{app_name}}/g, appName);
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Placeholders replaced successfully');

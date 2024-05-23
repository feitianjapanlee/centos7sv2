const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const appName = 'your_app_name'; // Replace with your desired app name

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.get(`/${appName}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/menu.html'));
});

app.get(`/${appName}/upload`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'));
});

app.get(`/${appName}/download`, (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    let fileLinks = files.map(file => `<a href="/uploads/${file}" download>${file}</a>`).join('<br>');
    res.send(`<h2>Download Files</h2>${fileLinks}`);
  });
});

app.post(`/${appName}/upload`, upload.single('file'), (req, res) => {
  res.redirect(`/${appName}/download`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/${appName}/menu`);
});

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const appName = 'myapp'; // Replace with your desired app name
const appName1 = 'online'; 
const appName2 = 'upload';
const appName3 = 'online2';
const appName4 = 'upload2';

const upload = multer({ dest: 'uploads/' });
const myLogger = function(req, res, next) {
  console.log(`[${new Date()}] ${req.method} ${req.url} Cookie:[${req.headers.cookie}]`);
  next();
};

app.use(myLogger);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get(`/${appName}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/menu.html'));
});
app.get(`/${appName1}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, `public/menu_${appName1}.html`));
});
app.get(`/${appName2}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, `public/menu_${appName2}.html`));
});
app.get(`/${appName3}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, `public/menu_${appName3}.html`));
});
app.get(`/${appName4}/menu`, (req, res) => {
  res.sendFile(path.join(__dirname, `public/menu_${appName4}.html`));
});

app.get(`/${appName}/upload`, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'));
});

app.get(`/${appName}/download`, (req, res) => {
  fs.readdir(path.join(__dirname, 'uploads'), (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files');
    }
    let fileLinks = files.map(file => `<a href="/uploads/${file}" download="${file}">${file}</a>`).join('<br>');
    res.send(`<h2>Download Files</h2>${fileLinks}`);
  });
});

app.post(`/${appName}/upload`, upload.single('file'), (req, res) => {
  const tempName = req.file.path.replace(/\\/g, "/");
  if (tempName) {
      const dest = "uploads/" + req.file.originalname;
      fs.renameSync(tempName, dest);  // 長い一時ファイル名を元のファイル名にリネームする。
      // res.render('upload', {message: `${dest} にアップロードされました。`});
  }
  else {
      // res.render('upload', {message: "エラー：アップロードできませんでした。"});
  }
  res.redirect(`/${appName}/download`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/${appName}/menu`);
});

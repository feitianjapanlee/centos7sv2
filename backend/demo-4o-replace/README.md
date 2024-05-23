To make the `app_name` variable dynamic based on a command line parameter, you can use Node.js's `process.argv` to read the argument passed when starting the application. Here's how you can modify the `app.js` file to achieve that:

1. **Modify `app.js` to accept a command line parameter:**

   ```javascript
   const express = require('express');
   const multer = require('multer');
   const path = require('path');
   const fs = require('fs');

   const app = express();
   const PORT = process.env.PORT || 3000;
   const appName = process.argv[2]; // Get the app name from the command line argument

   if (!appName) {
     console.error('Please provide an app name as a command line argument.');
     process.exit(1);
   }

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
   ```

2. **Update HTML files to use a placeholder for the app name:**

   **menu.html**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Menu</title>
   </head>
   <body>
     <h2>Menu</h2>
     <ul>
       <li><a href="/{{app_name}}/menu">Menu</a></li>
       <li><a href="/{{app_name}}/upload">Upload</a></li>
       <li><a href="/{{app_name}}/download">Download</a></li>
     </ul>
   </body>
   </html>
   ```

   **upload.html**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Upload</title>
   </head>
   <body>
     <h2>Upload a File</h2>
     <form action="/{{app_name}}/upload" method="post" enctype="multipart/form-data">
       <input type="file" name="file">
       <button type="submit">Upload</button>
     </form>
   </body>
   </html>
   ```

   **download.html**

   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Download</title>
   </head>
   <body>
     <h2>Download Files</h2>
     <!-- Links to uploaded files will be displayed here by the server -->
   </body>
   </html>
   ```

3. **Create a simple script to replace the placeholder in HTML files:**

   Create a file called `replacePlaceholders.js`:

   ```javascript
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
   ```

4. **Run the script before starting the server:**

   Modify your `package.json` to include a script for starting the application:

   ```json
   {
     "name": "your_app_name",
     "version": "1.0.0",
     "main": "app.js",
     "scripts": {
       "start": "node replacePlaceholders.js && node app.js"
     },
     "dependencies": {
       "express": "^4.17.1",
       "multer": "^1.4.2"
     }
   }
   ```

5. **Start the application with the app name as an argument:**

   ```sh
   npm start your_app_name
   ```

This setup ensures that the `app_name` is dynamically set via command line argument, and the HTML files will reflect this name appropriately.

Creating a simple web application in JavaScript to meet your requirements involves using a framework like Express.js for the backend and a bit of HTML for the frontend. Below is a sample web application:

1. **Install Dependencies**
   First, make sure you have Node.js installed. Then, create a new directory for your application and run the following commands to initialize a new Node.js project and install Express.js:

   ```sh
   mkdir your_app_name
   cd your_app_name
   npm init -y
   npm install express multer
   ```

2. **Create the Directory Structure**
   Create the following directory structure:

   ```
   your_app_name/
   ├── public/
   │   ├── download.html
   │   ├── menu.html
   │   └── upload.html
   ├── uploads/
   ├── app.js
   └── package.json
   ```

3. **app.js**
   This is the main file for your Express application:

   ```javascript
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
   ```

4. **HTML Files**

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
       <li><a href="/your_app_name/menu">Menu</a></li>
       <li><a href="/your_app_name/upload">Upload</a></li>
       <li><a href="/your_app_name/download">Download</a></li>
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
     <form action="/your_app_name/upload" method="post" enctype="multipart/form-data">
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

5. **Run the Application**
   Start your server by running:

   ```sh
   node app.js
   ```

   Your application will be accessible at `http://localhost:3000/your_app_name/menu`.

This is a basic example to get you started. For production use, you may want to add more features like file validation, error handling, and security improvements.

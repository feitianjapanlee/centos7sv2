Please give me a sample web application written in javascript. This web application will accept a startup string parameter, which will be the name of the root directory of the web application, or call it “app_name”. The web application has three pages, “/app_name/menu” (menu), “/app_name/upload” (upload) and “/app_name/download” (download). The menu page displays three links, the first one to itself, i.e. menu, the second one to upload, and the third one to download.The Upload page is for uploading a specific file. The download page will show links to all the uploaded files, which can be downloaded by clicking on them.


Here's a simple example of a Node.js web application using the Express framework that fulfills your requirements:

const express = require('express');
const path = require('path');
const app = express();

// Set the root directory of the web application
const app_name = process.argv[2] || 'myapp';

// Middleware to serve static files
app.use(express.static(path.join(__dirname, app_name)));

// Define the routes
app.get(`/${app_name}/menu`, (req, res) => {
    res.sendFile(path.join(__dirname, app_name, 'menu.html'));
});

app.get(`/${app_name}/upload`, (req, res) => {
    res.sendFile(path.join(__dirname, app_name, 'upload.html'));
});

app.get(`/${app_name}/download`, (req, res) => {
    // Simulate fetching uploaded files from a database
    const uploadedFiles = ['file1.txt', 'file2.jpg', 'file3.pdf'];
    res.render(path.join(__dirname, app_name, 'download.ejs'), { files: uploadedFiles });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started. Your web application is available at http://localhost:${port}/${app_name}/menu`);
});
In this example, the web application is structured as follows:

myapp/
  menu.html
  upload.html
  download.ejs
menu.html contains the menu with links to itself, upload, and download pages.
upload.html contains a form to upload a file.
download.ejs is an EJS template that lists the uploaded files as links.
Here's what each part of the code does:

We require the necessary modules, including express for creating the web application and path for handling file paths.
We set the root directory of the web application based on the command-line argument or default to 'myapp'.
We use the express.static middleware to serve static files from the root directory.
We define the routes for the menu, upload, and download pages. The menu and upload pages simply serve their respective HTML files. The download page uses an EJS template to render the list of uploaded files.
We start the server on port 3000 and log a message to the console with the URL of the web application.
Please note that this is a basic example, and you would need to implement the actual file upload and download functionalities, as well as handle errors and security concerns in a real-world application. Additionally, you would need to create the HTML and EJS files mentioned in the code.

please also give me the source code of menu.html, upload.html, download.ejs.

Here's the source code for menu.html, upload.html, and download.ejs:

<!-- menu.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
</head>
<body>
    <h1>Menu</h1>
    <ul>
        <li><a href="/app_name/menu">Menu</a></li>
        <li><a href="/app_name/upload">Upload</a></li>
        <li><a href="/app_name/download">Download</a></li>
    </ul>
</body>
</html>
<!-- upload.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload</title>
</head>
<body>
    <h1>Upload a File</h1>
    <form action="/app_name/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <button type="submit">Upload</button>
    </form>
</body>
</html>
<!-- download.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download</title>
</head>
<body>
    <h1>Download Files</h1>
    <ul>
        <% files.forEach(file => { %>
            <li><a href="/app_name/download/<%= file %>"><%= file %></a></li>
        <% }) %>
    </ul>
</body>
</html>
Please replace /app_name in the URLs with your actual app name. These HTML and EJS files provide a basic structure for the menu, upload, and download pages, respectively. You can further customize them according to your design and requirements.

Make sure to place these files in the appropriate directories within your web application structure. For example, menu.html and upload.html should be placed in the root directory, and download.ejs should be placed in the views directory if you're using EJS templates.
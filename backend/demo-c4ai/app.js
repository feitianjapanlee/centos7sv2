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
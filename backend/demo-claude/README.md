Please give me a sample web application written in javascript. This web application will accept a startup string parameter, which will be the name of the root directory of the web application, or call it “app_name”. The web application has three pages, “/app_name/menu” (menu), “/app_name/upload” (upload) and “/app_name/download” (download). The menu page displays three links, the first one to itself, i.e. menu, the second one to upload, and the third one to download.The Upload page is for uploading a specific file. The download page will show links to all the uploaded files, which can be downloaded by clicking on them.

Sure, here's a sample web application written in JavaScript that meets your requirements:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Web Application</title>
    <script src="app.js"></script>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

```javascript
// app.js
const appName = window.location.pathname.split('/')[1];

const routes = {
    '/menu': menu,
    '/upload': upload,
    '/download': download
};

function renderPage(content) {
    const app = document.getElementById('app');
    app.innerHTML = content;
}

function menu() {
    const menuContent = `
        <h1>Menu</h1>
        <ul>
            <li><a href="/${appName}/menu">Menu</a></li>
            <li><a href="/${appName}/upload">Upload</a></li>
            <li><a href="/${appName}/download">Download</a></li>
        </ul>
    `;
    renderPage(menuContent);
}

function upload() {
    const uploadContent = `
        <h1>Upload</h1>
        <input type="file" id="fileInput">
        <button onclick="uploadFile()">Upload</button>
    `;
    renderPage(uploadContent);
}

function download() {
    const downloadContent = `
        <h1>Download</h1>
        <ul id="fileList"></ul>
    `;
    renderPage(downloadContent);
    displayFiles();
}

const uploadedFiles = [];

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    uploadedFiles.push(file);
    alert('File uploaded successfully!');
    fileInput.value = '';
}

function displayFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = `file_${index}.${file.name.split('.').pop()}`;
        link.textContent = file.name;
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        fileList.appendChild(listItem);
    });
}

const currentRoute = window.location.pathname.replace(`/${appName}`, '');
const renderRoute = routes[currentRoute] || menu;
renderRoute();
```

This web application uses JavaScript to handle routing and rendering different pages based on the URL. The `appName` variable is extracted from the URL path, and it is used to construct the links for the menu page.

The `routes` object maps URL paths to their corresponding functions (`menu`, `upload`, and `download`). The `renderPage` function is responsible for updating the content of the `app` div with the rendered content.

The `menu` function generates the HTML for the menu page with links to the other pages. The `upload` function renders the upload page with an input field for selecting a file and a button to upload the file. The `download` function displays a list of links for downloading the uploaded files.

The `uploadedFiles` array stores the uploaded files. The `uploadFile` function is called when the "Upload" button is clicked, and it adds the selected file to the `uploadedFiles` array. The `displayFiles` function generates links for downloading the uploaded files and appends them to the file list on the download page.

When the page loads, the current route is determined from the URL, and the corresponding function is executed to render the initial content.

Note that this example uses the `URL.createObjectURL` method to create temporary URLs for downloading the uploaded files. In a real-world application, you would likely store the uploaded files on a server and provide URLs to those files for downloading.
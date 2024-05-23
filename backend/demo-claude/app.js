// app.js
const appName = window.location.pathname.split('/')[1];
alert(appName);

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
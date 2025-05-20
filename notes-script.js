const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', async () => {
  const formData = new FormData();
  formData.append('document', fileInput.files[0]);

  await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  fileInput.value = ''; // reset input
  loadFiles();
});

function triggerUpload() {
  document.getElementById('fileInput').click();
}

async function loadFiles() {
  const res = await fetch('/files');
  const files = await res.json();
  const list = document.getElementById('fileList');
  list.innerHTML = '';

  files.forEach(file => {
    const div = document.createElement('div');
    div.className = 'file-item';

    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'file-name';
    nameSpan.textContent = file.name.replace(/^\d+-/, '');

    const dateSpan = document.createElement('span');
    dateSpan.className = 'file-date';
    dateSpan.textContent = new Date(file.time).toLocaleString();

    fileInfo.appendChild(nameSpan);
    fileInfo.appendChild(dateSpan);

    div.appendChild(fileInfo);
    div.onclick = () => loadContent(file.name);
    list.appendChild(div);
  });
}

function loadContent(fileName) {
  const url = `/file?name=${encodeURIComponent(fileName)}`;
  window.open(url, '_blank');
}

loadFiles();
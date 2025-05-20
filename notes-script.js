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
    const displayName = file.name.replace(/^\d+-/, ''); // strips the timestamp prefix
    div.textContent = `${displayName} (Uploaded: ${new Date(file.time).toLocaleString()})`;
    div.onclick = () => loadContent(file.name);
    list.appendChild(div);
  });
}

function loadContent(fileName) {
  const url = `/file?name=${encodeURIComponent(fileName)}`;
  window.open(url, '_blank');
}

loadFiles();
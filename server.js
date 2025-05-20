const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const originalName = path.basename(file.originalname);
    const safeName = Date.now() + '-' + originalName; // Add timestamp to avoid name clashes
    cb(null, safeName);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'shared-notes.html'));
});

app.post('/upload', upload.single('document'), (req, res) => {
  res.sendStatus(200);
});

app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error reading files');
    const details = files.map(name => ({
      name,
      time: fs.statSync(`uploads/${name}`).mtime
    }));
    res.json(details);
  });
});

app.get('/file', (req, res) => {
  const name = req.query.name;
  const filePath = path.join(__dirname, 'uploads', name);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="' + name + '"');

  res.sendFile(filePath);
});

app.delete('/file', (req, res) => {
  const fileName = req.query.name;
  const filePath = path.join(__dirname, 'uploads', fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send('Error deleting file');
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
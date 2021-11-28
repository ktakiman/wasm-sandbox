const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8085;

app.use('/', express.static('bin'));

app.get('/api/pages', (req, res) => {
  fs.readdir('./bin', (err, items) => {
    res.send(items.filter(file => 
      file !== 'index.html' && path.extname(file) === '.html'));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
